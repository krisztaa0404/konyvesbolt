import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';

/**
 * React Query hook for deleting a genre
 */
export const useDeleteGenre = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (genreId: string) => managerApi.deleteGenre(genreId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });

      addNotification('Genre deleted successfully', 'success');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to delete genre';
      addNotification(errorMessage, 'error');
    },
  });
};
