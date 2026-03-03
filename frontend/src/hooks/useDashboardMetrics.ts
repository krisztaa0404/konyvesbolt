/**
 * React Query hook for fetching dashboard metrics
 */
import { useQuery } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';

export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: () => managerApi.getDashboardMetrics(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
