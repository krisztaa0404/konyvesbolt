import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { ROUTES } from '@router/routes';
import type { UpdateBook } from '@types';

interface UpdateBookParams {
  bookId: string;
  book: UpdateBook;
}

/**
 * React Query hook for updating an existing book
 */
export const useUpdateBook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: ({ bookId, book }: UpdateBookParams) => managerApi.updateBook(bookId, book),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['books', variables.bookId] });

      queryClient.invalidateQueries({
        queryKey: ['dashboard', 'metrics'],
      });

      addNotification(`Book "${data.title}" updated successfully`, 'success');

      navigate(ROUTES.MANAGER_BOOKS);
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to update book';
      addNotification(errorMessage, 'error');
    },
  });
};
