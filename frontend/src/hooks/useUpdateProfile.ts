import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@services/api/authApi';
import { useAuthStore } from '@store/authStore';
import { useNotificationStore } from '@store/notificationStore';
import { getErrorMessage } from '@utils/errorUtils';
import type { UpdateUser } from '@types';

/**
 * Hook to update user profile
 */
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (data: UpdateUser) => authApi.updateProfile(data),
    onSuccess: updatedUser => {
      // Update React Query cache
      queryClient.setQueryData(['users', 'me'], updatedUser);

      // Update Zustand store
      useAuthStore.getState().setUser(updatedUser);

      // Show success notification
      addNotification('Profile updated successfully', 'success');
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, 'Failed to update profile');
      addNotification(errorMessage, 'error');
    },
  });
};
