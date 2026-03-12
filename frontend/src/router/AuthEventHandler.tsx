/**
 * Auth event handler
 * Listens for auth:logout events and handles navigation
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from './routes';

export const AuthEventHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      navigate(ROUTES.LOGIN, { replace: true });
    };

    window.addEventListener('auth:logout', handleLogout);

    return () => {
      window.removeEventListener('auth:logout', handleLogout);
    };
  }, [navigate]);

  return null;
};