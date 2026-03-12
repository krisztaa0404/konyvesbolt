import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { parseError, isValidationError } from '@utils/errorUtils';
import type { CreateGenre } from '@types';

export const useCreateGenre = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (genre: CreateGenre) => managerApi.createGenre(genre),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });

      addNotification(`Genre "${data.name}" created successfully`, 'success');
    },
    onError: (error: unknown) => {
      const apiError = parseError(error, 'Failed to create genre');

      if (isValidationError(apiError)) {
        addNotification('Please check the form and fix any errors', 'warning');
        return;
      }

      addNotification(apiError.message, 'error');
    },
  });
};
