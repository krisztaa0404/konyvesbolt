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
  MenuItem,
  TextField,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUserRoleSchema, type UpdateUserRoleFormData } from '@schemas/userSchemas';
import { useUpdateUserRole } from '@hooks/useUpdateUserRole';
import { UserRole } from '@types';
import type { User } from '@types';
import { FormContent, FieldContainer } from './EditUserRoleDialog.sc';

interface EditUserRoleDialogProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

export const EditUserRoleDialog = ({ open, onClose, user }: EditUserRoleDialogProps) => {
  const updateUserRole = useUpdateUserRole();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserRoleFormData>({
    resolver: zodResolver(updateUserRoleSchema),
    defaultValues: {
      role: (user?.role as UserRole) || UserRole.USER,
    },
  });

  useEffect(() => {
    if (open && user) {
      reset({
        role: (user.role as UserRole) || UserRole.USER,
      });
    }
  }, [open, user, reset]);

  const onSubmit = (data: UpdateUserRoleFormData) => {
    if (!user?.id) return;

    updateUserRole.mutate(
      { userId: user.id, role: { role: data.role } },
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
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Edit User Role</span>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            disabled={updateUserRole.isPending}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FormContent>
            {user && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  User:{' '}
                  <strong>
                    {user.firstName} {user.lastName}
                  </strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: <strong>{user.email}</strong>
                </Typography>
              </Box>
            )}

            <Alert severity="warning" sx={{ mb: 2 }}>
              Changing user roles affects their access permissions. ADMIN users have full system
              access.
            </Alert>

            <FieldContainer>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Role"
                    required
                    fullWidth
                    error={!!errors.role}
                    helperText={errors.role?.message}
                    disabled={updateUserRole.isPending}
                  >
                    <MenuItem value={UserRole.USER}>User</MenuItem>
                    <MenuItem value={UserRole.MANAGER}>Manager</MenuItem>
                    <MenuItem value={UserRole.ADMIN}>Admin</MenuItem>
                  </TextField>
                )}
              />
            </FieldContainer>
          </FormContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={updateUserRole.isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={updateUserRole.isPending}
            startIcon={updateUserRole.isPending && <CircularProgress size={20} />}
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
