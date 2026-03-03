import { useState } from 'react';
import {
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
} from '@mui/material';
import { Warning } from '@mui/icons-material';
import { useDeleteAccount } from '@hooks/useDeleteAccount';
import { FormContainer, ButtonContainer } from '../ProfileLayout.sc';
import { WarningBox, ConsequencesList, CheckboxContainer } from './DeleteAccountTab.sc';

export const DeleteAccountTab = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    deleteAccount();
    handleCloseDialog();
  };

  return (
    <FormContainer>
      <Typography variant="h5" gutterBottom color="error">
        Delete Account
      </Typography>

      <WarningBox>
        <Alert severity="error" icon={<Warning />}>
          <Typography variant="subtitle1" fontWeight={600}>
            Warning: This action is permanent!
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Deleting your account will permanently remove all your data from our system.
          </Typography>
        </Alert>
      </WarningBox>

      <Typography variant="body1" gutterBottom>
        Once you delete your account, you will lose:
      </Typography>

      <ConsequencesList>
        <li>Access to your order history</li>
        <li>Your saved profile information</li>
        <li>Your loyalty membership status and discounts</li>
        <li>Any pending orders or refunds</li>
        <li>All associated data and preferences</li>
      </ConsequencesList>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        This action cannot be undone. If you're sure you want to proceed, please confirm below.
      </Typography>

      <CheckboxContainer>
        <FormControlLabel
          control={
            <Checkbox
              checked={isChecked}
              onChange={e => setIsChecked(e.target.checked)}
              color="error"
            />
          }
          label="I understand this action is permanent and cannot be reversed"
        />
      </CheckboxContainer>

      <ButtonContainer>
        <Button
          variant="contained"
          color="error"
          onClick={handleOpenDialog}
          disabled={!isChecked || isPending}
          startIcon={<Warning />}
        >
          Delete My Account
        </Button>
      </ButtonContainer>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you absolutely sure you want to delete your account? This action is permanent and
            cannot be undone. All your data will be lost forever.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
            Yes, Delete My Account
          </Button>
        </DialogActions>
      </Dialog>
    </FormContainer>
  );
};
