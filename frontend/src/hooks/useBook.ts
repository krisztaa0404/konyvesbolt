/**
 * React Query hook for fetching a single book's details
 */
import { useQuery } from '@tanstack/react-query';
import { booksApi } from '@services/api/booksApi';

export const useBook = (id: string) => {
  return useQuery({
    queryKey: ['books', id],
    queryFn: () => booksApi.getBook(id),
    enabled: !!id,
  });
};
