import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CustomerLayout } from '@layout/customer/CustomerLayout';
import { ManagerLayout } from '@layout/manager/ManagerLayout';
import { ScrollToTop } from '@layout/common/ScrollToTop';
import { AuthEventHandler } from './AuthEventHandler';
import { ProtectedRoute } from './ProtectedRoute';
import { ManagerRoute } from './ManagerRoute';
import { ROUTES } from './routes';
import { useAuthStore, selectIsManager } from '@store/authStore';
import { RouteErrorBoundary } from '@components/common/RouteErrorBoundary';
import { LoadingSpinner } from '@components/common/LoadingSpinner/LoadingSpinner';

import { HomePage } from '@pages/customer/HomePage';
import { LoginPage } from '@pages/auth/LoginPage';

const BrowseBooksPage = lazy(() =>
  import('@pages/customer/BrowseBooksPage').then(m => ({ default: m.BrowseBooksPage }))
);
const BookDetailPage = lazy(() =>
  import('@pages/customer/BookDetailPage').then(m => ({ default: m.BookDetailPage }))
);
const BestsellersPage = lazy(() =>
  import('@pages/customer/BestsellersPage').then(m => ({ default: m.BestsellersPage }))
);
const CartPage = lazy(() =>
  import('@pages/customer/CartPage').then(m => ({ default: m.CartPage }))
);
const CheckoutPage = lazy(() =>
  import('@pages/customer/CheckoutPage').then(m => ({ default: m.CheckoutPage }))
);
const ProfilePage = lazy(() =>
  import('@pages/customer/ProfilePage').then(m => ({ default: m.ProfilePage }))
);
const OrderConfirmationPage = lazy(() =>
  import('@pages/customer/OrderConfirmationPage').then(m => ({ default: m.OrderConfirmationPage }))
);
const RegisterPage = lazy(() =>
  import('@pages/auth/RegisterPage').then(m => ({ default: m.RegisterPage }))
);

const ProfileInfoTab = lazy(() =>
  import('@components/customer/profile/ProfileInfoTab').then(m => ({ default: m.ProfileInfoTab }))
);
const OrderHistoryTab = lazy(() =>
  import('@components/customer/profile/OrderHistoryTab').then(m => ({
    default: m.OrderHistoryTab,
  }))
);
const ChangePasswordTab = lazy(() =>
  import('@components/customer/profile/ChangePasswordTab').then(m => ({
    default: m.ChangePasswordTab,
  }))
);
const PreferencesTab = lazy(() =>
  import('@components/customer/profile/PreferencesTab').then(m => ({ default: m.PreferencesTab }))
);
const DeleteAccountTab = lazy(() =>
  import('@components/customer/profile/DeleteAccountTab').then(m => ({
    default: m.DeleteAccountTab,
  }))
);

const ManagerDashboardPage = lazy(() =>
  import('@pages/manager/ManagerDashboardPage').then(m => ({ default: m.ManagerDashboardPage }))
);
const AllOrdersPage = lazy(() =>
  import('@pages/manager/AllOrdersPage').then(m => ({ default: m.AllOrdersPage }))
);
const OrderDetailPage = lazy(() =>
  import('@pages/manager/OrderDetailPage').then(m => ({ default: m.OrderDetailPage }))
);
const ManageBooksPage = lazy(() =>
  import('@pages/manager/ManageBooksPage').then(m => ({ default: m.ManageBooksPage }))
);
const AddEditBookPage = lazy(() =>
  import('@pages/manager/AddEditBookPage').then(m => ({ default: m.AddEditBookPage }))
);
const ManageGenresPage = lazy(() =>
  import('@pages/manager/ManageGenresPage').then(m => ({ default: m.ManageGenresPage }))
);
const ManageDiscountsPage = lazy(() =>
  import('@pages/manager/ManageDiscountsPage').then(m => ({ default: m.ManageDiscountsPage }))
);
const UsersManagementPage = lazy(() =>
  import('@pages/manager/UsersManagementPage').then(m => ({ default: m.UsersManagementPage }))
);

const RoleBasedHome = () => {
  const isManager = useAuthStore(selectIsManager);
  return isManager ? <Navigate to={ROUTES.MANAGER_DASHBOARD} replace /> : <HomePage />;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthEventHandler />
      <RouteErrorBoundary>
        <Suspense fallback={<LoadingSpinner fullPage />}>
          <Routes>
            <Route element={<CustomerLayout />}>
              <Route path={ROUTES.HOME} element={<RoleBasedHome />} />
              <Route path={ROUTES.BROWSE_BOOKS} element={<BrowseBooksPage />} />
              <Route path={ROUTES.BOOK_DETAIL} element={<BookDetailPage />} />
              <Route path={ROUTES.BESTSELLERS} element={<BestsellersPage />} />
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
              <Route path={ROUTES.CART} element={<CartPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
                <Route path={ROUTES.PROFILE} element={<ProfilePage />}>
                  <Route index element={<Navigate to="info" replace />} />
                  <Route path="info" element={<ProfileInfoTab />} />
                  <Route path="orders" element={<OrderHistoryTab />} />
                  <Route path="password" element={<ChangePasswordTab />} />
                  <Route path="preferences" element={<PreferencesTab />} />
                  <Route path="delete" element={<DeleteAccountTab />} />
                </Route>
                <Route path={ROUTES.ORDER_CONFIRMATION} element={<OrderConfirmationPage />} />
              </Route>
            </Route>

            <Route element={<ManagerRoute />}>
              <Route element={<ManagerLayout />}>
                <Route path={ROUTES.MANAGER_DASHBOARD} element={<ManagerDashboardPage />} />
                <Route path={ROUTES.MANAGER_ORDERS} element={<AllOrdersPage />} />
                <Route path={ROUTES.MANAGER_ORDER_DETAIL} element={<OrderDetailPage />} />
                <Route path={ROUTES.MANAGER_BOOKS} element={<ManageBooksPage />} />
                <Route path={ROUTES.MANAGER_ADD_BOOK} element={<AddEditBookPage />} />
                <Route path={ROUTES.MANAGER_EDIT_BOOK} element={<AddEditBookPage />} />
                <Route path={ROUTES.MANAGER_GENRES} element={<ManageGenresPage />} />
                <Route path={ROUTES.MANAGER_DISCOUNTS} element={<ManageDiscountsPage />} />
                <Route path={ROUTES.MANAGER_USERS} element={<UsersManagementPage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Routes>
        </Suspense>
      </RouteErrorBoundary>
    </BrowserRouter>
  );
};
