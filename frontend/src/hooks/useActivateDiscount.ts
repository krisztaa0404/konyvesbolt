import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { parseError } from '@utils/errorUtils';

export const useActivateDiscount = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (discountId: string) => managerApi.activateDiscount(discountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      addNotification('Discount activated successfully', 'success');
    },
    onError: (error: unknown) => {
      const apiError = parseError(error, 'Failed to activate discount');
      addNotification(apiError.message, 'error');
    },
  });
};
