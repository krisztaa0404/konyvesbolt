import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  AttachMoney,
  ShoppingCart,
  MonetizationOn,
  Notifications,
  Warning,
} from '@mui/icons-material';
import { useDashboardMetrics } from '@hooks/useDashboardMetrics';
import { useRecentOrders } from '@hooks/useRecentOrders';
import { useOrderFilterStore, useBookFilterStore } from '@store/manager/managerFilterStore';
import { MetricCard, MetricCardSkeleton } from '@components/manager/common/MetricCard';
import { AlertCard } from '@components/manager/common/AlertCard';
import { QuickActions } from '@components/manager/dashboard/QuickActions';
import { RecentOrdersTable } from '@components/manager/dashboard/RecentOrdersTable';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { formatCurrency } from '@utils/formatters';
import { ROUTES } from '@router/routes';
import { PageContainer, PageHeader, MetricsGrid, SectionTitle } from './ManagerDashboardPage.sc';

export const ManagerDashboardPage = () => {
  const navigate = useNavigate();
  const updateOrderStatusFilter = useOrderFilterStore(state => state.updateStatusFilter);
  const updateBookStatusFilter = useBookFilterStore(state => state.updateStatusFilter);

  const {
    data: metrics,
    isLoading: metricsLoading,
    isError: metricsError,
    error: metricsErrorObj,
    refetch: refetchMetrics,
  } = useDashboardMetrics();

  const { data: ordersData, isLoading: ordersLoading, isError: ordersError } = useRecentOrders(5);

  if (metricsError && !metricsLoading) {
    return (
      <PageContainer>
        <PageHeader>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
        </PageHeader>
        <ErrorMessage
          message={metricsErrorObj?.message || 'Failed to load dashboard metrics'}
          severity="error"
        />
        <Button variant="contained" onClick={() => refetchMetrics()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of business metrics and recent activity
        </Typography>
      </PageHeader>

      <MetricsGrid>
        {metricsLoading ? (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <MetricCardSkeleton key={index} />
            ))}
          </>
        ) : (
          <>
            <MetricCard
              title="Orders Today"
              value={metrics?.ordersToday ?? 0}
              icon={<TrendingUp />}
              color="primary"
            />
            <MetricCard
              title="Revenue Today"
              value={formatCurrency(metrics?.revenueToday)}
              icon={<AttachMoney />}
              color="success"
            />
            <MetricCard
              title="Orders This Week"
              value={metrics?.ordersWeek ?? 0}
              icon={<ShoppingCart />}
              color="primary"
            />
            <MetricCard
              title="Revenue This Week"
              value={formatCurrency(metrics?.revenueWeek)}
              icon={<MonetizationOn />}
              color="success"
            />
            <MetricCard
              title="Orders This Month"
              value={metrics?.ordersMonth ?? 0}
              icon={<ShoppingCart />}
              color="primary"
            />
            <MetricCard
              title="Revenue This Month"
              value={formatCurrency(metrics?.revenueMonth)}
              icon={<MonetizationOn />}
              color="success"
            />
            <AlertCard
              title="Pending Orders"
              count={metrics?.pendingOrders ?? 0}
              severity="warning"
              icon={<Notifications />}
              onClick={() => {
                updateOrderStatusFilter('PENDING');
                navigate(ROUTES.MANAGER_ORDERS);
              }}
            />
            <AlertCard
              title="Low Stock Books"
              count={metrics?.lowStockBooks ?? 0}
              severity="error"
              icon={<Warning />}
              onClick={() => {
                updateBookStatusFilter('LOW_STOCK');
                navigate(ROUTES.MANAGER_BOOKS);
              }}
            />
          </>
        )}
      </MetricsGrid>

      <QuickActions />

      <SectionTitle variant="h5">Recent Orders</SectionTitle>
      {ordersError && (
        <ErrorMessage message="Failed to load recent orders" severity="warning" sx={{ mb: 2 }} />
      )}
      <RecentOrdersTable orders={ordersData?.content || []} isLoading={ordersLoading} />
    </PageContainer>
  );
};
