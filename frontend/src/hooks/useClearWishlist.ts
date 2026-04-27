import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistApi } from '@services/api/wishlistApi';
import { useNotificationStore } from '@store/notificationStore';
import { useWishlistStore } from '@store/customer/wishlistStore';
import { getErrorMessage } from '@utils/errorUtils';

export const useClearWishlist = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();
  const wishlistStore = useWishlistStore();

  return useMutation({
    mutationFn: () => wishlistApi.clearWishlist(),
    onSuccess: () => {
      wishlistStore.clearWishlist();
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      addNotification('Wishlist cleared', 'success');
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, 'Failed to clear wishlist');
      addNotification(errorMessage, 'error');
    },
  });
};
