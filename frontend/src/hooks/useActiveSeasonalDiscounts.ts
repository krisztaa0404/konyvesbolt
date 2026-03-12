/**
 * React Query hook for fetching active seasonal discounts
 */
import { useQuery } from '@tanstack/react-query';
import { seasonalDiscountsApi } from '@services/api/seasonalDiscountsApi';

export const useActiveSeasonalDiscounts = () => {
  return useQuery({
    queryKey: ['seasonal-discounts', 'active'],
    queryFn: ({ signal }) => seasonalDiscountsApi.getActiveSeasonalDiscounts(signal),
    staleTime: 5 * 60 * 1000, // 5 minutes - promotions don't change frequently
  });
};
