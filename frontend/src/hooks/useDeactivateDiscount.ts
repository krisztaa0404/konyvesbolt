import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { parseError } from '@utils/errorUtils';

export const useDeactivateDiscount = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (discountId: string) => managerApi.deactivateDiscount(discountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      addNotification('Discount deactivated successfully', 'success');
    },
    onError: (error: unknown) => {
      const apiError = parseError(error, 'Failed to deactivate discount');
      addNotification(apiError.message, 'error');
    },
  });
};
