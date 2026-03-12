import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { parseError } from '@utils/errorUtils';
import { ROUTES } from '@router/routes';

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (bookId: string) => managerApi.deleteBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });

      addNotification('Book deleted successfully', 'success');

      navigate(ROUTES.MANAGER_BOOKS);
    },
    onError: (error: unknown) => {
      const apiError = parseError(error, 'Failed to delete book');
      addNotification(apiError.message, 'error');
    },
  });
};
