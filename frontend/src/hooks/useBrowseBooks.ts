import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';
import { booksApi } from '@services/api/booksApi';
import { useFilterStore } from '@store/filterStore';
import type { BrowseBooksParams } from '@types';

interface UseBrowseBooksParams {
  page: number;
  size: number;
  sort: string;
}

export const useBrowseBooks = ({ page, size, sort }: UseBrowseBooksParams) => {
  const { filters, searchTerm } = useFilterStore(
    useShallow(state => ({
      filters: state.filters,
      searchTerm: state.searchTerm,
    }))
  );

  const [debouncedFilters] = useDebounce(filters, 300);

  const params: BrowseBooksParams = useMemo(
    () => ({
      ...debouncedFilters,
      search: searchTerm || undefined,
      page,
      size,
      sort,
    }),
    [debouncedFilters, searchTerm, page, size, sort]
  );

  const cleanParams = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== null && value !== undefined)
      ) as BrowseBooksParams,
    [params]
  );

  return useQuery({
    queryKey: ['books', 'browse', cleanParams],
    queryFn: () => booksApi.getBooksWithFilters(cleanParams),
    placeholderData: previousData => previousData,
  });
};
