import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { parseError, isValidationError } from '@utils/errorUtils';
import { ROUTES } from '@router/routes';
import type { UpdateBook } from '@types';

interface UpdateBookParams {
  bookId: string;
  book: UpdateBook;
}

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
    onError: (error: unknown) => {
      const apiError = parseError(error, 'Failed to update book');

      if (isValidationError(apiError)) {
        addNotification('Please check the form and fix any errors', 'warning');
        return;
      }

      addNotification(apiError.message, 'error');
    },
  });
};
