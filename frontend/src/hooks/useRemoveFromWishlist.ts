import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistApi } from '@services/api/wishlistApi';
import { useNotificationStore } from '@store/notificationStore';
import { useWishlistStore } from '@store/customer/wishlistStore';
import { getErrorMessage } from '@utils/errorUtils';

export const useRemoveFromWishlist = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();
  const wishlistStore = useWishlistStore();

  return useMutation({
    mutationFn: (bookId: string) => wishlistApi.removeFromWishlist(bookId),
    onMutate: async (bookId: string) => {
      wishlistStore.removeItem(bookId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, 'Failed to remove from wishlist');
      addNotification(errorMessage, 'error');
    },
  });
};
