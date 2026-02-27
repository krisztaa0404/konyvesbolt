import { useQuery } from '@tanstack/react-query';
import { genresApi } from '@services/api/genresApi';

interface UseGenresParams {
  search?: string;
  page?: number;
  size?: number;
}

/**
 * React Query hook for fetching genres with optional search and pagination
 */
export const useGenres = (params?: UseGenresParams) => {
  return useQuery({
    queryKey: ['genres', params?.search || '', params?.page || 0, params?.size || 20],
    queryFn: () =>
      genresApi.getGenres({
        name: params?.search,
        page: params?.page || 0,
        size: params?.size || 20,
      }),
    staleTime: 1000 * 60 * 60, // 1 hour - genres rarely change
    enabled: true,
  });
};
