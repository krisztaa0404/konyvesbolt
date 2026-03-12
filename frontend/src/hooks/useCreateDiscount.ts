import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { parseError, isValidationError } from '@utils/errorUtils';
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
    onError: (error: unknown) => {
      const apiError = parseError(error, 'Failed to create discount');

      if (isValidationError(apiError)) {
        addNotification('Please check the form and fix any errors', 'warning');
        return;
      }

      addNotification(apiError.message, 'error');
    },
  });
};
