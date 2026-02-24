/**
 * React Query hook for fetching genre statistics
 */
import { useQuery } from '@tanstack/react-query';
import { genresApi } from '@services/api/genresApi';

export const useGenreStatistics = () => {
  return useQuery({
    queryKey: ['genres', 'statistics'],
    queryFn: () => genresApi.getGenreStatistics(),
  });
};
