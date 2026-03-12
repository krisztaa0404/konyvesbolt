/**
 * React Query hooks for fetching top books (weekly and monthly)
 */
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { booksApi } from '@services/api/booksApi';
import type { Book } from '@types';

type QueryOptions = Omit<UseQueryOptions<Book[]>, 'queryKey' | 'queryFn'>;

export const useTopWeeklyBooks = (limit: number = 10, options?: QueryOptions) => {
  return useQuery({
    queryKey: ['books', 'top-weekly', limit],
    queryFn: ({ signal }) => booksApi.getTopWeeklyBooks(limit, signal),
    ...options,
  });
};

export const useTopMonthlyBooks = (limit: number = 10, options?: QueryOptions) => {
  return useQuery({
    queryKey: ['books', 'top-monthly', limit],
    queryFn: ({ signal }) => booksApi.getTopMonthlyBooks(limit, signal),
    ...options,
  });
};
