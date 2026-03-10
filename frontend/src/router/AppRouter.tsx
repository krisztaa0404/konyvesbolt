import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CustomerLayout } from '@layout/customer/CustomerLayout';
import { ManagerLayout } from '@layout/manager/ManagerLayout';
import { ScrollToTop } from '@layout/common/ScrollToTop';
import { ProtectedRoute } from './ProtectedRoute';
import { ManagerRoute } from './ManagerRoute';
import { ROUTES } from './routes';
import { useAuthStore, selectIsManager } from '@store/authStore';

import { HomePage } from '@pages/customer/HomePage';
import { BrowseBooksPage } from '@pages/customer/BrowseBooksPage';
import { BookDetailPage } from '@pages/customer/BookDetailPage';
import { BestsellersPage } from '@pages/customer/BestsellersPage';
import { CartPage } from '@pages/customer/CartPage';
import { CheckoutPage } from '@pages/customer/CheckoutPage';
import { ProfilePage } from '@pages/customer/ProfilePage';
import { OrderConfirmationPage } from '@pages/customer/OrderConfirmationPage';

import { LoginPage } from '@pages/auth/LoginPage';
import { RegisterPage } from '@pages/auth/RegisterPage';

import { ProfileInfoTab } from '@components/customer/profile/ProfileInfoTab';
import { OrderHistoryTab } from '@components/customer/profile/OrderHistoryTab';
import { ChangePasswordTab } from '@components/customer/profile/ChangePasswordTab';
import { PreferencesTab } from '@components/customer/profile/PreferencesTab';
import { DeleteAccountTab } from '@components/customer/profile/DeleteAccountTab';

import { ManagerDashboardPage } from '@pages/manager/ManagerDashboardPage';
import { AllOrdersPage } from '@pages/manager/AllOrdersPage';
import { OrderDetailPage } from '@pages/manager/OrderDetailPage';
import { ManageBooksPage } from '@pages/manager/ManageBooksPage';
import { AddEditBookPage } from '@pages/manager/AddEditBookPage';
import { ManageGenresPage } from '@pages/manager/ManageGenresPage';
import { ManageDiscountsPage } from '@pages/manager/ManageDiscountsPage';
import { UsersManagementPage } from '@pages/manager/UsersManagementPage';

const RoleBasedHome = () => {
  const isManager = useAuthStore(selectIsManager);
  return isManager ? <Navigate to={ROUTES.MANAGER_DASHBOARD} replace /> : <HomePage />;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
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
    </BrowserRouter>
  );
};
