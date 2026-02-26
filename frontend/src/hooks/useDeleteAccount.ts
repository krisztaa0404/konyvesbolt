import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@services/api/authApi';
import { useAuthStore } from '@store/authStore';
import { useNotificationStore } from '@store/notificationStore';
import { getErrorMessage } from '@utils/errorUtils';

/**
 * Hook to delete user account
 */
export const useDeleteAccount = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: () => authApi.deleteAccount(),
    onSuccess: () => {
      addNotification('Account deleted successfully', 'success');
      logout();
      navigate('/');
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, 'Failed to delete account');
      addNotification(errorMessage, 'error');
    },
  });
};
