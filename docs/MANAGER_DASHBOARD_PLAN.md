# Manager Dashboard Implementation Plan

## Context

The bookstore application has 8 fully functional customer-facing pages (Home, Browse Books, Book Detail, Bestsellers, Cart, Checkout, Profile, Order Confirmation) but all 6 manager pages are currently placeholder stubs. This plan implements the **Manager Dashboard** (`/manager` route), which serves as the landing page for managers and admins, providing an overview of key business metrics and quick access to management functions.

The dashboard will display:
- **Metrics cards**: Orders and revenue for today/week/month (6 cards)
- **Alert cards**: Pending orders count and low stock books count (2 cards)
- **Quick actions**: Buttons to navigate to Orders, Books, and Users management
- **Recent orders table**: 5 most recent orders with status and details

This establishes reusable patterns (MetricCard, AlertCard, table components) that will benefit all future manager pages.

## Critical Files

### Files to Create
1. **`frontend/src/services/api/managerApi.ts`**
   - New API service for manager endpoints
   - Function: `getDashboardMetrics()` → GET `/api/manager/dashboard/metrics`
   - Returns: `DashboardMetrics` type (already defined in models.ts line 50)

2. **`frontend/src/hooks/useDashboardMetrics.ts`**
   - React Query hook for dashboard metrics
   - Query key: `['dashboard', 'metrics']`
   - 5-minute stale time (metrics don't change rapidly)

3. **`frontend/src/hooks/useRecentOrders.ts`**
   - React Query hook for recent orders
   - Query key: `['orders', 'recent', 5]`
   - Calls existing `ordersApi.getOrders({ page: 0, size: 5 })`

4. **`frontend/src/components/manager/common/MetricCard/`**
   - `MetricCard.tsx` - Reusable metric display card
   - `MetricCard.sc.ts` - Styled components with hover effects
   - `MetricCardSkeleton.tsx` - Loading skeleton
   - `index.ts` - Exports

5. **`frontend/src/components/manager/common/AlertCard/`**
   - `AlertCard.tsx` - Alert card with badge and click handler
   - `AlertCard.sc.ts` - Styled with color-coded severity
   - `index.ts` - Exports

6. **`frontend/src/components/manager/dashboard/QuickActions/`**
   - `QuickActions.tsx` - Grid of action buttons
   - `QuickActions.sc.ts` - Responsive button grid
   - `index.ts` - Exports

7. **`frontend/src/components/manager/dashboard/RecentOrdersTable/`**
   - `RecentOrdersTable.tsx` - Compact orders table
   - `RecentOrdersTable.sc.ts` - Table styles
   - `index.ts` - Exports

### Files to Modify
8. **`frontend/src/pages/manager/ManagerDashboardPage/ManagerDashboardPage.tsx`**
   - Replace placeholder with full implementation
   - Integrate all hooks and sub-components
   - Handle loading/error states

9. **`frontend/src/pages/manager/ManagerDashboardPage/ManagerDashboardPage.sc.ts`**
   - Create styled components for page layout
   - 4-column responsive grid for metrics
   - Spacing and container styles

10. **`frontend/src/services/api/ordersApi.ts`**
    - Verify `getOrders()` function exists and accepts pagination params
    - Should already exist based on exploration

## Implementation Steps

### Phase 1: API Layer (30 minutes)

**1.1 Create Manager API Service**
- File: `frontend/src/services/api/managerApi.ts`
- Import `apiClient` from `./apiClient`
- Import `DashboardMetrics` from `@types`
- Create `getDashboardMetrics()` function:
  ```typescript
  export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
    const response = await apiClient.get('/manager/dashboard/metrics');
    return response.data;
  };
  ```

**1.2 Create Dashboard Metrics Hook**
- File: `frontend/src/hooks/useDashboardMetrics.ts`
- Use `useQuery` from `@tanstack/react-query`
- Query key: `['dashboard', 'metrics']`
- Set `staleTime: 5 * 60 * 1000` (5 minutes)
- Set `refetchOnWindowFocus: true`
- Call `managerApi.getDashboardMetrics()`

**1.3 Create Recent Orders Hook**
- File: `frontend/src/hooks/useRecentOrders.ts`
- Use `useQuery` from `@tanstack/react-query`
- Query key: `['orders', 'recent', 5]`
- Call `ordersApi.getOrders({ page: 0, size: 5 })`
- Return type: `UseQueryResult<PageOrder>`

### Phase 2: Reusable Card Components (60 minutes)

**2.1 Create MetricCard Component**
- File: `frontend/src/components/manager/common/MetricCard/MetricCard.tsx`
- Props interface:
  ```typescript
  interface MetricCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  }
  ```
- Use Material UI `Card`, `CardContent`, `Typography`
- Display icon at top, large value in center, label below
- Reference pattern from `GenreStatisticsCard.tsx`

**2.2 Create MetricCard Styled Components**
- File: `frontend/src/components/manager/common/MetricCard/MetricCard.sc.ts`
- `StyledCard`: Styled Card with hover effects (transform translateY(-4px), shadow elevation 8)
- `IconContainer`: Circular background with theme color
- `ValueText`: Large font (h3), bold weight (700)
- Copy hover pattern from `GenreStatisticsCard.sc.ts`

**2.3 Create MetricCardSkeleton**
- File: `frontend/src/components/manager/common/MetricCard/MetricCardSkeleton.tsx`
- Use MUI `Skeleton` component
- Match MetricCard dimensions
- Skeleton for icon (circle), value (text), label (text)

**2.4 Create AlertCard Component**
- File: `frontend/src/components/manager/common/AlertCard/AlertCard.tsx`
- Props interface:
  ```typescript
  interface AlertCardProps {
    title: string;
    count: number;
    severity: 'warning' | 'error';
    icon: React.ReactNode;
    onClick: () => void;
  }
  ```
- Clickable card with badge showing count
- Color-coded: warning (orange), error (red)
- Use `Badge` component with count

**2.5 Create AlertCard Styled Components**
- File: `frontend/src/components/manager/common/AlertCard/AlertCard.sc.ts`
- `AlertStyledCard`: Styled Card with cursor pointer and hover
- Dynamic background color based on severity prop
- Use transient props: `$severity` to avoid passing to DOM

### Phase 3: Action and Table Components (45 minutes)

**3.1 Create QuickActions Component**
- File: `frontend/src/components/manager/dashboard/QuickActions/QuickActions.tsx`
- Three buttons: "View All Orders", "Manage Books", "Manage Users"
- Icons from `@mui/icons-material`: `ListAlt`, `MenuBook`, `People`
- Use `useNavigate` to navigate to routes
- Import routes from `@router/routes`

**3.2 Create QuickActions Styled Components**
- File: `frontend/src/components/manager/dashboard/QuickActions/QuickActions.sc.ts`
- `ActionsContainer`: Flexbox row with gap
- `ActionButton`: Styled MUI Button (variant="contained", size="large")
- Responsive: Stack vertically on mobile (theme.breakpoints.down('sm'))

**3.3 Create RecentOrdersTable Component**
- File: `frontend/src/components/manager/dashboard/RecentOrdersTable/RecentOrdersTable.tsx`
- Props: `orders: Order[]`, `isLoading: boolean`
- Columns: Order ID, Customer, Date, Status, Total, Actions
- Use MUI `Table`, `TableHead`, `TableBody`, `TableRow`, `TableCell`
- Status chip: Copy pattern from `OrderHistoryTab` (use StatusChip)
- "View Details" button per row → navigate to `/manager/orders/:id`
- Empty state: Show message "No recent orders"
- Loading state: Show 5 skeleton rows

**3.4 Create RecentOrdersTable Styled Components**
- File: `frontend/src/components/manager/dashboard/RecentOrdersTable/RecentOrdersTable.sc.ts`
- `TableContainer`: Styled Paper with border radius
- `StyledTableCell`: Styled TableCell with padding
- `StatusChip`: Reuse from OrderHistoryTab or create similar with color mapping
- Status colors: PENDING=warning, PROCESSING=info, SHIPPED=primary, DELIVERED=success, CANCELLED=error

### Phase 4: Main Page Assembly (45 minutes)

**4.1 Update ManagerDashboardPage Component**
- File: `frontend/src/pages/manager/ManagerDashboardPage/ManagerDashboardPage.tsx`
- Import both hooks: `useDashboardMetrics`, `useRecentOrders`
- Import all sub-components: MetricCard, AlertCard, QuickActions, RecentOrdersTable
- Import icons from `@mui/icons-material`:
  - `TrendingUp` (orders today)
  - `AttachMoney` (revenue today)
  - `ShoppingCart` (orders week/month)
  - `MonetizationOn` (revenue week/month)
  - `Notifications` (pending orders)
  - `Warning` (low stock)
- Destructure hook results: `{ data: metrics, isLoading: metricsLoading, isError: metricsError, error: metricsErrorObj, refetch: refetchMetrics }`
- Destructure orders: `{ data: ordersData, isLoading: ordersLoading, isError: ordersError }`

**4.2 Implement Loading States**
- Show `LoadingSpinner` with `fullPage={true}` if both hooks are loading initially
- Show `MetricCardSkeleton` (6 instances) in grid while metrics loading
- Show table skeleton while orders loading
- Independent loading: Metrics and orders can load separately

**4.3 Implement Error Handling**
- If `metricsError`: Show `ErrorMessage` component with retry button
- Retry button calls `refetchMetrics()`
- If `ordersError`: Show inline error in table section only
- Partial failure: Show what works, error for failed section

**4.4 Build Page Layout**
Structure:
```tsx
<PageContainer>
  <PageHeader>
    <Typography variant="h4">Dashboard</Typography>
    <Typography variant="body1" color="text.secondary">
      Overview of business metrics and recent activity
    </Typography>
  </PageHeader>

  {/* Metrics Grid - 8 cards in 4x2 grid */}
  <MetricsGrid>
    {metricsLoading ? (
      Array(8).fill(null).map((_, i) => <MetricCardSkeleton key={i} />)
    ) : (
      <>
        <MetricCard title="Orders Today" value={metrics.ordersToday} icon={<TrendingUp />} />
        <MetricCard title="Revenue Today" value={formatCurrency(metrics.revenueToday)} icon={<AttachMoney />} color="secondary" />
        <MetricCard title="Orders This Week" value={metrics.ordersWeek} icon={<ShoppingCart />} />
        <MetricCard title="Revenue This Week" value={formatCurrency(metrics.revenueWeek)} icon={<MonetizationOn />} color="secondary" />
        <MetricCard title="Orders This Month" value={metrics.ordersMonth} icon={<ShoppingCart />} />
        <MetricCard title="Revenue This Month" value={formatCurrency(metrics.revenueMonth)} icon={<MonetizationOn />} color="secondary" />
        <AlertCard
          title="Pending Orders"
          count={metrics.pendingOrders}
          severity="warning"
          icon={<Notifications />}
          onClick={() => navigate('/manager/orders?status=PENDING')}
        />
        <AlertCard
          title="Low Stock Books"
          count={metrics.lowStockBooks}
          severity="error"
          icon={<Warning />}
          onClick={() => navigate('/manager/books?lowStock=true')}
        />
      </>
    )}
  </MetricsGrid>

  {/* Quick Actions */}
  <QuickActions />

  {/* Recent Orders Table */}
  <SectionTitle variant="h5">Recent Orders</SectionTitle>
  <RecentOrdersTable
    orders={ordersData?.content || []}
    isLoading={ordersLoading}
  />
</PageContainer>
```

**4.5 Create Page Styled Components**
- File: `frontend/src/pages/manager/ManagerDashboardPage/ManagerDashboardPage.sc.ts`
- `PageContainer`: Box with padding (theme.spacing(3))
- `PageHeader`: Box with margin bottom (theme.spacing(4))
- `MetricsGrid`: Grid layout
  ```typescript
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  }
  ```
- `SectionTitle`: Typography with margin (theme.spacing(3, 0, 2))

### Phase 5: Navigation & Interactions (15 minutes)

**5.1 Implement Alert Card Clicks**
- Pending Orders click → Navigate to `/manager/orders?status=PENDING`
- Low Stock Books click → Navigate to `/manager/books?lowStock=true`
- Use `useNavigate()` hook and `ROUTES` constants

**5.2 Implement Quick Action Clicks**
- "View All Orders" → `navigate(ROUTES.MANAGER_ORDERS)`
- "Manage Books" → `navigate(ROUTES.MANAGER_BOOKS)`
- "Manage Users" → `navigate(ROUTES.MANAGER_USERS)`

**5.3 Implement Table Row Clicks**
- Each order row click → Navigate to `/manager/orders/${orderId}`
- Use `getManagerOrderDetailRoute(orderId)` helper if available in routes.ts
- Otherwise construct route manually

### Phase 6: Polish & Verification (30 minutes)

**6.1 Format Values**
- Import `formatCurrency` from `@utils/formatters`
- Format all revenue values: `formatCurrency(metrics.revenueToday)`
- Import `formatDate` from `@utils/formatters`
- Format order dates in table: `formatDate(order.orderDate)`

**6.2 Add Accessibility**
- Add `aria-label` to all clickable cards
- Add `role="button"` to clickable elements
- Ensure keyboard navigation works (Tab, Enter)
- Add focus indicators on interactive elements

**6.3 Test Responsive Layout**
- Desktop (>960px): 4-column grid
- Tablet (600-960px): 2-column grid
- Mobile (<600px): 1-column stack
- Test quick actions button layout on mobile
- Test table horizontal scroll on mobile if needed

**6.4 Verify Color Consistency**
- Status chips use consistent colors (OrderStatusColors enum)
- Alert cards: warning=orange, error=red
- Metric cards: Use theme palette colors
- Test in both light mode (default theme)

## Verification Steps

### Manual Testing Checklist
1. **Load Dashboard**
   - [ ] Navigate to `/manager` route
   - [ ] Page loads without console errors
   - [ ] All metric cards display correctly
   - [ ] Alert cards show with badge counts
   - [ ] Quick action buttons render
   - [ ] Recent orders table shows 5 orders

2. **Data Display**
   - [ ] Order counts display as integers
   - [ ] Revenue values display with currency format ($1,234.56)
   - [ ] Dates display in readable format
   - [ ] Status chips show correct colors
   - [ ] Badge counts are visible on alert cards

3. **Loading States**
   - [ ] Skeleton loaders display during initial load
   - [ ] LoadingSpinner shows while fetching data
   - [ ] Transition from loading to loaded is smooth
   - [ ] Independent loading for metrics and orders

4. **Error States**
   - [ ] Metrics error displays ErrorMessage with retry button
   - [ ] Retry button refetches data successfully
   - [ ] Orders error displays inline error message
   - [ ] Partial data displays when one section fails

5. **Navigation**
   - [ ] Click "Pending Orders" alert → navigates to filtered orders page
   - [ ] Click "Low Stock Books" alert → navigates to filtered books page
   - [ ] Click "View All Orders" button → navigates to all orders page
   - [ ] Click "Manage Books" button → navigates to books management page
   - [ ] Click "Manage Users" button → navigates to users page
   - [ ] Click order row → navigates to order detail page
   - [ ] All navigation uses correct routes

6. **Responsive Design**
   - [ ] Desktop: 4-column grid displays correctly
   - [ ] Tablet: 2-column grid displays correctly
   - [ ] Mobile: 1-column stack displays correctly
   - [ ] Quick actions buttons stack on mobile
   - [ ] Table scrolls horizontally on mobile if needed
   - [ ] No layout overflow or broken grids

7. **Visual Polish**
   - [ ] Card hover effects work (transform, shadow)
   - [ ] Colors match theme palette
   - [ ] Spacing is consistent (theme.spacing)
   - [ ] Typography hierarchy is correct (h4, h5, h6, body)
   - [ ] Icons display correctly
   - [ ] Status colors match OrderStatusColors

8. **Performance**
   - [ ] Page loads within 1-2 seconds
   - [ ] No unnecessary re-renders
   - [ ] Metrics refetch every 5 minutes in background
   - [ ] React Query DevTools shows correct cache behavior

### API Testing
1. **Dashboard Metrics Endpoint**
   - [ ] GET `/api/manager/dashboard/metrics` returns 200
   - [ ] Response matches `DashboardMetricsDto` shape
   - [ ] All numeric values are present (not null/undefined)
   - [ ] Authentication token is sent in request header

2. **Recent Orders Endpoint**
   - [ ] GET `/api/orders?page=0&size=5` returns 200
   - [ ] Response matches `PagedModelOrderDto` shape
   - [ ] Maximum 5 orders returned
   - [ ] Orders sorted by date descending (newest first)

### Code Quality
- [ ] No TypeScript errors (`npm run lint`)
- [ ] No console errors or warnings
- [ ] Proper error handling with try-catch or React Query
- [ ] All imports use path aliases (@components, @hooks, @types)
- [ ] Components follow established patterns from customer pages
- [ ] Styled components use transient props ($prop) for styling
- [ ] File organization matches project structure

## Future Enhancements (Post-MVP)

After successful implementation and testing:
1. Add refresh button to manually refetch all data
2. Add date range selector for metrics (custom date ranges)
3. Add trend indicators (up/down arrows with percentages)
4. Add charts/graphs for revenue trends (Chart.js or Recharts)
5. Add drill-down capability (click metric → detailed report)
6. Add comparison metrics (vs previous period)
7. Make metric cards clickable to navigate to filtered views
8. Add real-time updates (WebSocket for live order notifications)
9. Add export functionality (CSV/PDF reports)
10. Add customizable dashboard (drag-and-drop widgets)

## Notes for Implementation

- **Component Organization**:
  - Reusable components (MetricCard, AlertCard) → `frontend/src/components/manager/common/`
  - Dashboard-specific components (QuickActions, RecentOrdersTable) → `frontend/src/components/manager/dashboard/`
  - Page components → `frontend/src/pages/manager/ManagerDashboardPage/`
- **Reusable Components**: MetricCard and AlertCard should be generic enough to use on other manager pages
- **Consistent Patterns**: Follow patterns from HomePage.tsx (multiple hooks) and BrowseBooksPage.tsx (error handling)
- **Status Colors**: Reuse status chip colors from OrderHistoryTab component
- **API Client**: Authentication is already handled by apiClient interceptors
- **Type Safety**: All components should use proper TypeScript types from models.ts
- **Performance**: Use React.memo for MetricCard to prevent unnecessary re-renders
- **Accessibility**: Ensure all interactive elements have proper ARIA labels and keyboard support
