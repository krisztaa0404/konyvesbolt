/**
 * React Query hook for fetching all books with filtering and pagination
 */
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';
import { managerApi, type GetAllBooksParams } from '@services/api/managerApi';
import { useBookFilterStore } from '@store/manager/managerFilterStore';

interface UseAllBooksParams {
  page: number;
  size: number;
  sort: string;
}

export const useAllBooks = ({ page, size, sort }: UseAllBooksParams) => {
  const { searchTerm, statusFilter } = useBookFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
      statusFilter: state.statusFilter,
    }))
  );

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const params: GetAllBooksParams = useMemo(
    () => ({
      filter: {
        search: debouncedSearchTerm || undefined,
        stockStatus: statusFilter || undefined,
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
    queryKey: ['books', 'all', cleanParams],
    queryFn: () => managerApi.getAllBooks(params),
    placeholderData: previousData => previousData,
  });
};
