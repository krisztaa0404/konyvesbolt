import { useQuery } from '@tanstack/react-query';
import { genresApi } from '@services/api/genresApi';

/**
 * React Query hook for fetching all genres
 */
export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => genresApi.getGenres(),
    staleTime: 1000 * 60 * 60, // 1 hour - genres rarely change
  });
};
