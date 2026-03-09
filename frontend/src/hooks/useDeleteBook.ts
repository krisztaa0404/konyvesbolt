import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { ROUTES } from '@router/routes';

/**
 * React Query hook for deleting a book
 */
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
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to delete book';
      addNotification(errorMessage, 'error');
    },
  });
};
