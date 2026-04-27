import { useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistApi } from '@services/api/wishlistApi';
import { useNotificationStore } from '@store/notificationStore';
import { getErrorMessage } from '@utils/errorUtils';

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: (bookId: string) => wishlistApi.addToWishlist(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (error: unknown) => {
      const errorMessage = getErrorMessage(error, 'Failed to add to wishlist');
      addNotification(errorMessage, 'error');
    },
  });
};
