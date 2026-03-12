import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityName?: string;
  entityType?: string;
  isPending: boolean;
  warningMessage?: string;
  additionalInfo?: string;
  confirmButtonText?: string;
  title?: string;
  message?: string;
}

export const DeleteConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  entityName,
  entityType,
  isPending,
  warningMessage,
  additionalInfo,
  confirmButtonText = 'Delete',
  title,
  message,
}: DeleteConfirmDialogProps) => {
  const dialogTitle = title || (entityType ? `Delete ${entityType}` : 'Confirm Deletion');
  const dialogMessage =
    message ||
    (entityName && entityType
      ? `Are you sure you want to delete the ${entityType.toLowerCase()} "${entityName}"?`
      : 'Are you sure you want to proceed with this deletion?');

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{dialogTitle}</span>
          <IconButton aria-label="close" onClick={onClose} disabled={isPending} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          {dialogMessage}
        </Typography>
        {warningMessage && (
          <Typography variant="body2" color="warning.main" sx={{ mt: 2 }}>
            {warningMessage}
          </Typography>
        )}
        {additionalInfo && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {additionalInfo}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={isPending}>
          {confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
