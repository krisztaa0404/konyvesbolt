import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { parseError } from '@utils/errorUtils';
import type { UpdateUserRole } from '@types';

interface UpdateUserRoleParams {
  userId: string;
  role: UpdateUserRole;
}

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: ({ userId, role }: UpdateUserRoleParams) => managerApi.updateUserRole(userId, role),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      addNotification(`User role updated to ${data.role} successfully`, 'success');
    },
    onError: (error: unknown) => {
      const apiError = parseError(error, 'Failed to update user role');
      addNotification(apiError.message, 'error');
    },
  });
};
