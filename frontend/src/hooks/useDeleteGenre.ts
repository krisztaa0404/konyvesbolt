import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { parseError } from '@utils/errorUtils';

export const useDeleteGenre = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (genreId: string) => managerApi.deleteGenre(genreId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });

      addNotification('Genre deleted successfully', 'success');
    },
    onError: (error: unknown) => {
      const apiError = parseError(error, 'Failed to delete genre');
      addNotification(apiError.message, 'error');
    },
  });
};
