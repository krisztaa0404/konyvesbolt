import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';
import { managerApi, type GetAllDiscountsParams } from '@services/api/managerApi';
import { useDiscountFilterStore } from '@store/manager/managerFilterStore';

interface UseAllDiscountsParams {
  page: number;
  size: number;
  sort: string;
}

export const useAllDiscounts = ({ page, size, sort }: UseAllDiscountsParams) => {
  const { searchTerm, statusFilter } = useDiscountFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
      statusFilter: state.statusFilter,
    }))
  );

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const isActive = useMemo(() => {
    if (statusFilter === 'ACTIVE') return true;
    if (statusFilter === 'INACTIVE') return false;
    return undefined;
  }, [statusFilter]);

  const params: GetAllDiscountsParams = useMemo(
    () => ({
      filter: {
        name: debouncedSearchTerm || undefined,
        isActive,
      },
      pageable: {
        page,
        size,
        sort: [sort],
      },
    }),
    [debouncedSearchTerm, isActive, page, size, sort]
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
    queryKey: ['discounts', 'all', cleanParams],
    queryFn: ({ signal }) => managerApi.getAllDiscounts(params, signal),
    placeholderData: previousData => previousData,
  });
};
