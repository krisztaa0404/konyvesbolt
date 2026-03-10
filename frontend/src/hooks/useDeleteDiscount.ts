import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';

export const useDeleteDiscount = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (discountId: string) => managerApi.deleteDiscount(discountId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      addNotification('Discount deleted successfully', 'success');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to delete discount';
      addNotification(errorMessage, 'error');
    },
  });
};
