import { useMutation } from '@tanstack/react-query';
import { authApi } from '@services/api/authApi';
import { useNotificationStore } from '@store/notificationStore';
import { getErrorMessage } from '@utils/errorUtils';

/**
 * Hook to change user password
 */
export const useChangePassword = () => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (data: { currentPassword: string; newPassword: string }) =>
      authApi.changePassword(data),
    onSuccess: () => {
      addNotification('Password changed successfully', 'success');
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, 'Failed to change password');
      addNotification(errorMessage, 'error');
    },
  });
};
