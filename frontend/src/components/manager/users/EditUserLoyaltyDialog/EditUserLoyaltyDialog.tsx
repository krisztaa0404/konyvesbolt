import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Alert,
  Typography,
  Box,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateLoyaltySchema, type UpdateLoyaltyFormData } from '@schemas/userSchemas';
import { useUpdateUserLoyalty } from '@hooks/useUpdateUserLoyalty';
import { formatCurrency } from '@utils/formatters';
import type { User } from '@types';
import { FormContent, FieldContainer } from './EditUserLoyaltyDialog.sc';

interface EditUserLoyaltyDialogProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

export const EditUserLoyaltyDialog = ({ open, onClose, user }: EditUserLoyaltyDialogProps) => {
  const updateUserLoyalty = useUpdateUserLoyalty();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateLoyaltyFormData>({
    resolver: zodResolver(updateLoyaltySchema),
    defaultValues: {
      isLoyaltyMember: user?.isLoyaltyMember || false,
      discountPercent: user?.loyaltyDiscountPercent || 0,
    },
  });

  const isLoyaltyMember = useWatch({ control, name: 'isLoyaltyMember' });

  useEffect(() => {
    if (open && user) {
      reset({
        isLoyaltyMember: user.isLoyaltyMember || false,
        discountPercent: user.loyaltyDiscountPercent || 0,
      });
    }
  }, [open, user, reset]);

  const onSubmit = (data: UpdateLoyaltyFormData) => {
    if (!user?.id) return;

    const loyaltyData = {
      isLoyaltyMember: data.isLoyaltyMember,
      ...(data.isLoyaltyMember && { discountPercent: data.discountPercent }),
    };

    updateUserLoyalty.mutate(
      { userId: user.id, loyalty: loyaltyData },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User Loyalty</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FormContent>
            {user && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  User: <strong>{user.firstName} {user.lastName}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: <strong>{user.email}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Spent: <strong>{formatCurrency(user.totalSpent)}</strong>
                </Typography>
              </Box>
            )}

            <Alert severity="info" sx={{ mb: 2 }}>
              Loyalty members receive exclusive discounts on all purchases. Set the discount percentage below.
            </Alert>

            <FieldContainer>
              <Controller
                name="isLoyaltyMember"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.value}
                        onChange={field.onChange}
                        disabled={updateUserLoyalty.isPending}
                      />
                    }
                    label="Loyalty Member"
                  />
                )}
              />
            </FieldContainer>

            {isLoyaltyMember && (
              <FieldContainer>
                <Controller
                  name="discountPercent"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Discount Percentage"
                      type="number"
                      required
                      fullWidth
                      inputProps={{ min: 0, max: 100, step: 1 }}
                      error={!!errors.discountPercent}
                      helperText={errors.discountPercent?.message || 'Enter a value between 0 and 100'}
                      disabled={updateUserLoyalty.isPending}
                      value={field.value || 0}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
              </FieldContainer>
            )}
          </FormContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={updateUserLoyalty.isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={updateUserLoyalty.isPending}
            startIcon={updateUserLoyalty.isPending && <CircularProgress size={20} />}
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
