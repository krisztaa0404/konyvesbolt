/**
 * React Query hook for fetching recent orders
 */
import { useQuery } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';

export const useRecentOrders = (size: number = 5) => {
  return useQuery({
    queryKey: ['orders', 'recent', size],
    queryFn: () => managerApi.getAllOrders(0, size),
  });
};
