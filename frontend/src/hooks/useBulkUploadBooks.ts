import { useMutation, useQueryClient } from '@tanstack/react-query';
import { managerApi } from '@services/api/managerApi';
import { useNotificationStore } from '@store/notificationStore';
import { parseError } from '@utils/errorUtils';
import type { BulkBookUploadResult } from '@types';

export const useBulkUploadBooks = () => {
  const queryClient = useQueryClient();
  const addNotification = useNotificationStore(state => state.addNotification);

  return useMutation({
    mutationFn: (file: File) => managerApi.bulkUploadBooks(file),
    onSuccess: (data: BulkBookUploadResult) => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'metrics'] });

      if (data.successCount === data.totalRows) {
        addNotification(`Successfully imported ${data.successCount} books!`, 'success');
      } else if (data.successCount > 0) {
        addNotification(
          `Imported ${data.successCount} books, ${data.skippedCount} rows skipped`,
          'warning'
        );
      } else {
        addNotification(`Upload failed: ${data.skippedCount} rows skipped`, 'error');
      }
    },
    onError: (error: unknown) => {
      const apiError = parseError(error, 'Failed to upload CSV file');
      addNotification(apiError.message, 'error');
    },
  });
};
