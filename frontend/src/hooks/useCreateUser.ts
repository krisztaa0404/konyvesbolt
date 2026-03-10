import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import type { CreateUser } from '@types';

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (user: CreateUser) => managerApi.createUser(user),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      addNotification(`User "${data.firstName} ${data.lastName}" created successfully`, 'success');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to create user';
      addNotification(errorMessage, 'error');
    },
  });
};
