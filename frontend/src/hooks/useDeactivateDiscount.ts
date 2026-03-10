import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';

export const useDeactivateDiscount = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (discountId: string) => managerApi.deactivateDiscount(discountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      addNotification('Discount deactivated successfully', 'success');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to deactivate discount';
      addNotification(errorMessage, 'error');
    },
  });
};
