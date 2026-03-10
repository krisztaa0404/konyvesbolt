import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { getErrorMessage } from '@utils/errorUtils';
import type { OrderStatus } from '@types';

interface UpdateOrderStatusParams {
  orderId: string;
  status: OrderStatus;
}

/**
 * Hook to update order status (manager only)
 */
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: ({ orderId, status }: UpdateOrderStatusParams) =>
      managerApi.updateOrderStatus(orderId, status),
    onSuccess: (_updatedOrder, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['orders', 'manager', variables.orderId],
      });

      queryClient.invalidateQueries({
        queryKey: ['orders', 'all'],
      });

      queryClient.invalidateQueries({
        queryKey: ['dashboard', 'metrics'],
      });

      addNotification('Order status updated successfully', 'success');
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, 'Failed to update order status');
      addNotification(errorMessage, 'error');
    },
  });
};
