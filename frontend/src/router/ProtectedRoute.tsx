/**
 * Protected Route component
 * Requires authentication for customer routes
 * Redirects to login if not authenticated
 */
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import { ROUTES } from './routes';

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login, saving the attempted location
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
