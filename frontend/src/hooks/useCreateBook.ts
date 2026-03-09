import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { ROUTES } from '@router/routes';
import type { CreateBook } from '@types';

/**
 * React Query hook for creating a new book
 */
export const useCreateBook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (book: CreateBook) => managerApi.createBook(book),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['books'] });

      addNotification(`Book "${data.title}" created successfully`, 'success');

      navigate(ROUTES.MANAGER_BOOKS);
    },
    onError: (error: Error) => {
      const errorMessage = error.message || 'Failed to create book';
      addNotification(errorMessage, 'error');
    },
  });
};
