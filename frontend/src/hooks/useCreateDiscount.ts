import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import type { CreateSeasonalDiscount } from '@types';

export const useCreateDiscount = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (discount: CreateSeasonalDiscount) => managerApi.createDiscount(discount),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
      addNotification(`Discount "${data.name}" created successfully`, 'success');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to create discount';
      addNotification(errorMessage, 'error');
    },
  });
};
