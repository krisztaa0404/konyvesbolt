import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ordersApi } from '@services/api/ordersApi';
import { useNotificationStore } from '@store/notificationStore';
import { useCartStore } from '@store/cartStore';
import { getErrorMessage } from '@utils/errorUtils';
import { getOrderConfirmationRoute } from '@router/routes';
import type { CreateOrder } from '@types';

/**
 * Hook to create a new order
 */
export const useCreateOrder = () => {
  const { addNotification } = useNotificationStore();
  const { clearCart } = useCartStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrder) => ordersApi.createOrder(data),
    onSuccess: data => {
      clearCart();
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      addNotification('Order placed successfully!', 'success');
      navigate(getOrderConfirmationRoute(data.id!));
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, 'Failed to place order');
      addNotification(errorMessage, 'error');
    },
  });
};
