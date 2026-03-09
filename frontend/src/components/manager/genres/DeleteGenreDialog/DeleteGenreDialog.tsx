import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

interface DeleteGenreDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  genreName: string;
  isPending: boolean;
}

export const DeleteGenreDialog = ({
  open,
  onClose,
  onConfirm,
  genreName,
  isPending,
}: DeleteGenreDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete Genre</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          Are you sure you want to delete the genre <strong>"{genreName}"</strong>?
        </Typography>
        <Typography variant="body2" color="warning.main" sx={{ mt: 2 }}>
          Warning: If this genre has associated books, deletion may fail.
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
