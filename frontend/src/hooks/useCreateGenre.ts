import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import type { CreateGenre } from '@types';

/**
 * React Query hook for creating a new genre
 */
export const useCreateGenre = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (genre: CreateGenre) => managerApi.createGenre(genre),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });

      addNotification(`Genre "${data.name}" created successfully`, 'success');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to create genre';
      addNotification(errorMessage, 'error');
    },
  });
};
