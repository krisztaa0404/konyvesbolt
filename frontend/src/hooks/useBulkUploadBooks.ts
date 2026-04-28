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

      const successCount = data.successCount ?? 0;
      const totalRows = data.totalRows ?? 0;
      const skippedCount = data.skippedCount ?? 0;

      if (successCount === totalRows && successCount > 0) {
        addNotification(`Successfully imported ${successCount} books!`, 'success');
      } else if (successCount > 0) {
        addNotification(`Imported ${successCount} books, ${skippedCount} rows skipped`, 'warning');
      } else {
        addNotification(`Upload failed: ${skippedCount} rows skipped`, 'error');
      }
    },
    onError: (error: unknown) => {
      const apiError = parseError(error, 'Failed to upload CSV file');
      addNotification(apiError.message, 'error');
    },
  });
};
