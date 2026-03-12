import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { parseError, isValidationError } from '@utils/errorUtils';
import type { UpdateGenre } from '@types';

interface UpdateGenreParams {
  genreId: string;
  genre: UpdateGenre;
}

export const useUpdateGenre = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: ({ genreId, genre }: UpdateGenreParams) => managerApi.updateGenre(genreId, genre),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });

      addNotification(`Genre "${data.name}" updated successfully`, 'success');
    },
    onError: (error: unknown) => {
      const apiError = parseError(error, 'Failed to update genre');

      if (isValidationError(apiError)) {
        addNotification('Please check the form and fix any errors', 'warning');
        return;
      }

      addNotification(apiError.message, 'error');
    },
  });
};
