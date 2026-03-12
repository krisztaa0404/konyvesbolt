/**
 * React Query hook for fetching a single discount's details
 */
import { useQuery } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';

export const useDiscountById = (id: string | undefined) => {
  return useQuery({
    queryKey: ['discounts', id],
    queryFn: ({ signal }) => managerApi.getDiscountById(id!, signal),
    enabled: !!id,
  });
};
