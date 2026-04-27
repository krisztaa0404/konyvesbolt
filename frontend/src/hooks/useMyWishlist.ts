import { useQuery } from '@tanstack/react-query';
import { wishlistApi } from '@services/api/wishlistApi';

export const useMyWishlist = () => {
  return useQuery({
    queryKey: ['wishlist', 'my-wishlist'],
    queryFn: ({ signal }) => wishlistApi.getMyWishlist(signal),
    staleTime: 1000 * 60 * 5,
  });
};
