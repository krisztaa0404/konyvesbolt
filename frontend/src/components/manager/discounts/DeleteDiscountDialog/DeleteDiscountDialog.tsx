import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface DeleteDiscountDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  discountName: string;
  isPending: boolean;
}

export const DeleteDiscountDialog = ({
  open,
  onClose,
  onConfirm,
  discountName,
  isPending,
}: DeleteDiscountDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete Discount</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete the discount <strong>"{discountName}"</strong>?
        </Typography>
        <Typography variant="body2" color="error.main" sx={{ mt: 2 }}>
          Warning: This action cannot be undone.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Note: Orders that used this discount will retain their discount information for historical purposes.
        </Typography>
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
