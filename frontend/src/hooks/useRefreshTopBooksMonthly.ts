import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { getErrorMessage } from '@utils/errorUtils';

export const useRefreshTopBooksMonthly = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: () => managerApi.refreshTopBooksMonthly(),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['books', 'top', 'monthly'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'metrics'] });
      addNotification(
        `${data.message} (${data.durationMs}ms)`,
        'success'
      );
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, 'Failed to refresh top books monthly');
      addNotification(errorMessage, 'error');
    },
  });
};
