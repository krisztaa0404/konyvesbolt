import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';

export const useActivateDiscount = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (discountId: string) => managerApi.activateDiscount(discountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      addNotification('Discount activated successfully', 'success');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to activate discount';
      addNotification(errorMessage, 'error');
    },
  });
};
