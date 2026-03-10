import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import type { UpdateLoyalty } from '@types';

interface UpdateUserLoyaltyParams {
  userId: string;
  loyalty: UpdateLoyalty;
}

export const useUpdateUserLoyalty = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: ({ userId, loyalty }: UpdateUserLoyaltyParams) =>
      managerApi.updateUserLoyalty(userId, loyalty),
    onSuccess: data => {
      const statusText = data.isLoyaltyMember
        ? `Loyalty enabled (${data.loyaltyDiscountPercent}% discount)`
        : 'Loyalty disabled';
      queryClient.invalidateQueries({ queryKey: ['users'] });
      addNotification(`User loyalty updated: ${statusText}`, 'success');
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to update user loyalty';
      addNotification(errorMessage, 'error');
    },
  });
};
