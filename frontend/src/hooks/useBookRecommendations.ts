/**
 * React Query hook for fetching book recommendations
 */
import { useQuery } from '@tanstack/react-query';
import { booksApi } from '@services/api/booksApi';

export const useBookRecommendations = (id: string, limit: number = 6) => {
  return useQuery({
    queryKey: ['books', id, 'recommendations', limit],
    queryFn: () => booksApi.getBookRecommendations(id, limit),
    enabled: !!id,
  });
};
