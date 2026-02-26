import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, TextField, Button, Alert } from '@mui/material';
import { useChangePassword } from '@hooks/useChangePassword';
import { changePasswordSchema, type ChangePasswordFormData } from '@schemas/profileSchemas';
import { FormContainer, FormSection, ButtonContainer } from '../ProfileLayout.sc';
import { SuccessAlert } from './ChangePasswordTab.sc';

export const ChangePasswordTab = () => {
  const { mutate: changePassword, isPending } = useChangePassword();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    changePassword(
      {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          setShowSuccess(true);
          reset();
          // Hide success message after 5 seconds
          setTimeout(() => setShowSuccess(false), 5000);
        },
      }
    );
  };

  return (
    <FormContainer>
      <Typography variant="h5" gutterBottom>
        Change Password
      </Typography>

      {showSuccess && (
        <SuccessAlert>
          <Alert severity="success" onClose={() => setShowSuccess(false)}>
            Password changed successfully!
          </Alert>
        </SuccessAlert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection>
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Current Password"
                type="password"
                fullWidth
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
                autoComplete="current-password"
              />
            )}
          />

          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="New Password"
                type="password"
                fullWidth
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                autoComplete="new-password"
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Confirm New Password"
                type="password"
                fullWidth
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                autoComplete="new-password"
              />
            )}
          />
        </FormSection>

        <ButtonContainer>
          <Button type="submit" variant="contained" disabled={isPending}>
            {isPending ? 'Updating...' : 'Update Password'}
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};
