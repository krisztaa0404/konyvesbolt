/**
 * React Query hook for fetching newest books
 */
import { useQuery } from '@tanstack/react-query';
import { booksApi } from '@services/api/booksApi';

export const useNewestBooks = (size: number = 10) => {
  return useQuery({
    queryKey: ['books', 'newest', size],
    queryFn: () => booksApi.getNewestBooks(size),
  });
};
