import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  entityName: string;
  entityType: string;
  isPending: boolean;
  warningMessage?: string;
  additionalInfo?: string;
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
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete {entityType}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete the {entityType.toLowerCase()}{' '}
          <strong>"{entityName}"</strong>?
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
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
