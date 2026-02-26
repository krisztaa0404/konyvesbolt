import { useQuery } from '@tanstack/react-query';
import { authApi } from '@services/api/authApi';

/**
 * Hook to fetch current user profile
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: () => authApi.getCurrentUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
