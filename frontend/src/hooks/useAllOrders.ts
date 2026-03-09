/**
 * React Query hook for fetching all orders with filtering and pagination
 */
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';
import { managerApi, type GetAllOrdersParams } from '@services/api/managerApi';
import { useOrderFilterStore } from '@store/manager/managerFilterStore';
import { OrderStatus } from '@types';

interface UseAllOrdersParams {
  page: number;
  size: number;
  sort: string;
}

export const useAllOrders = ({ page, size, sort }: UseAllOrdersParams) => {
  const { searchTerm, statusFilter } = useOrderFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
      statusFilter: state.statusFilter,
    }))
  );

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const params: GetAllOrdersParams = useMemo(
    () => ({
      filter: {
        search: debouncedSearchTerm || undefined,
        statuses: statusFilter ? [statusFilter as OrderStatus] : undefined,
      },
      pageable: {
        page,
        size,
        sort: [sort],
      },
    }),
    [debouncedSearchTerm, statusFilter, page, size, sort]
  );

  const cleanParams = useMemo(
    () => ({
      filter: Object.fromEntries(
        Object.entries(params.filter || {}).filter(
          ([, value]) => value !== null && value !== undefined
        )
      ),
      pageable: params.pageable,
    }),
    [params]
  );

  return useQuery({
    queryKey: ['orders', 'all', cleanParams],
    queryFn: () => managerApi.getAllOrders(params),
    placeholderData: previousData => previousData,
  });
};
