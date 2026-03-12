import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { parseError, isValidationError } from '@utils/errorUtils';
import { ROUTES } from '@router/routes';
import type { CreateBook } from '@types';

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (book: CreateBook) => managerApi.createBook(book),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['books'] });

      queryClient.invalidateQueries({
        queryKey: ['dashboard', 'metrics'],
      });

      addNotification(`Book "${data.title}" created successfully`, 'success');

      navigate(ROUTES.MANAGER_BOOKS);
    },
    onError: (error: unknown) => {
      const apiError = parseError(error, 'Failed to create book');

      if (isValidationError(apiError)) {
        addNotification('Please check the form and fix any errors', 'warning');
        return;
      }

      addNotification(apiError.message, 'error');
    },
  });
};
