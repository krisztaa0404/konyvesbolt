import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface UnsavedChangesDialogProps {
  open: boolean;
  onClose: () => void;
  onLeave: () => void;
}

export const UnsavedChangesDialog = ({ open, onClose, onLeave }: UnsavedChangesDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Unsaved Changes</span>
          <IconButton aria-label="close" onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          You have unsaved changes. Are you sure you want to leave?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Stay</Button>
        <Button onClick={onLeave} color="warning" autoFocus>
          Leave
        </Button>
      </DialogActions>
    </Dialog>
  );
};
