import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@services/api/ordersApi';

/**
 * Hook to fetch current user's orders with pagination
 */
export const useMyOrders = (page: number = 0, size: number = 20) => {
  return useQuery({
    queryKey: ['orders', 'my-orders', page, size],
    queryFn: () => ordersApi.getMyOrders(page, size),
  });
};
