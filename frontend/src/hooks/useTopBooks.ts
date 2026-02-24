/**
 * React Query hooks for fetching top books (weekly and monthly)
 */
import { useQuery } from '@tanstack/react-query';
import { booksApi } from '@services/api/booksApi';

export const useTopWeeklyBooks = (limit: number = 10) => {
  return useQuery({
    queryKey: ['books', 'top-weekly', limit],
    queryFn: () => booksApi.getTopWeeklyBooks(limit),
  });
};

export const useTopMonthlyBooks = (limit: number = 10) => {
  return useQuery({
    queryKey: ['books', 'top-monthly', limit],
    queryFn: () => booksApi.getTopMonthlyBooks(limit),
  });
};
