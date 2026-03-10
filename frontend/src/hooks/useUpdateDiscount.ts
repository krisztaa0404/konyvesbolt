import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import type { UpdateSeasonalDiscount } from '@types';

export const useUpdateDiscount = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: ({
      discountId,
      discount,
    }: {
      discountId: string;
      discount: UpdateSeasonalDiscount;
    }) => managerApi.updateDiscount(discountId, discount),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      addNotification(`Discount "${data.name}" updated successfully`, 'success');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to update discount';
      addNotification(errorMessage, 'error');
    },
  });
};
