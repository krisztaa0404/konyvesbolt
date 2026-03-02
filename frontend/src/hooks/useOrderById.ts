import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@services/api/ordersApi';

/**
 * Hook to fetch a single order by ID
 */
export const useOrderById = (orderId: string | undefined) => {
  return useQuery({
    queryKey: ['orders', 'my-orders', orderId],
    queryFn: () => ordersApi.getMyOrderById(orderId!),
    enabled: !!orderId,
    retry: 1,
  });
};
