/**
 * Manager Route component
 * Requires authentication and MANAGER or ADMIN role
 * Redirects to login if not authenticated
 * Redirects to home if not authorized
 */
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore, selectIsManager } from '@store/authStore';
import { ROUTES } from './routes';

export const ManagerRoute = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isManager = useAuthStore(selectIsManager);

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!isManager) {
    // User is authenticated but not a manager
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};
