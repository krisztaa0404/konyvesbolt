import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import type { UpdateGenre } from '@types';

interface UpdateGenreParams {
  genreId: string;
  genre: UpdateGenre;
}

/**
 * React Query hook for updating an existing genre
 */
export const useUpdateGenre = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: ({ genreId, genre }: UpdateGenreParams) => managerApi.updateGenre(genreId, genre),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });

      addNotification(`Genre "${data.name}" updated successfully`, 'success');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to update genre';
      addNotification(errorMessage, 'error');
    },
  });
};
