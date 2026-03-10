import { useQuery } from '@tanstack/react-query';
import { booksApi } from '@services/api/booksApi';

interface UseBooksParams {
  search?: string;
  page?: number;
  size?: number;
}

/**
 * React Query hook for fetching books with optional search and pagination
 * Useful for dropdowns, autocompletes, and simple lists
 */
export const useBooks = (params?: UseBooksParams) => {
  return useQuery({
    queryKey: ['books', params?.search || '', params?.page || 0, params?.size || 500],
    queryFn: () =>
      booksApi.getBooksWithFilters({
        search: params?.search,
        page: params?.page || 0,
        size: params?.size || 500,
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes - books change occasionally
    enabled: true,
  });
};
