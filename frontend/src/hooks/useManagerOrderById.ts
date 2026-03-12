import { useQuery } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';

/**
 * Hook to fetch a single order by ID (manager view)
 */
export const useManagerOrderById = (orderId: string | undefined) => {
  return useQuery({
    queryKey: ['orders', 'manager', orderId],
    queryFn: ({ signal }) => managerApi.getOrderById(orderId!, signal),
    enabled: !!orderId,
    retry: 1,
  });
};
