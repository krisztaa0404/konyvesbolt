/**
 * React Query hook for fetching all genres with filtering and pagination
 */
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';
import { managerApi, type GetAllGenresParams } from '@services/api/managerApi';
import { useGenreFilterStore } from '@store/manager/managerFilterStore';

interface UseAllGenresParams {
  page: number;
  size: number;
  sort: string;
}

export const useAllGenres = ({ page, size, sort }: UseAllGenresParams) => {
  const { searchTerm } = useGenreFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
    }))
  );

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const params: GetAllGenresParams = useMemo(
    () => ({
      filter: {
        name: debouncedSearchTerm || undefined,
      },
      pageable: {
        page,
        size,
        sort: [sort],
      },
    }),
    [debouncedSearchTerm, page, size, sort]
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
    queryKey: ['genres', 'all', cleanParams],
    queryFn: ({ signal }) => managerApi.getAllGenres(params, signal),
    placeholderData: previousData => previousData,
  });
};
