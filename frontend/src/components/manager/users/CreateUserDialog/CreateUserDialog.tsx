import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Alert,
  MenuItem,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserSchema } from '@schemas/userSchemas';
import type { CreateUserFormData } from '@schemas/userSchemas';
import { useCreateUser } from '@hooks/useCreateUser';
import { UserRole } from '@types';
import type { CreateUser } from '@types';
import { FormContent, FieldContainer, FieldRow } from './CreateUserDialog.sc';

interface CreateUserDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateUserDialog = ({ open, onClose }: CreateUserDialogProps) => {
  const createUser = useCreateUser();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      role: UserRole.USER,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
        role: UserRole.USER,
      });
    }
  }, [open, reset]);

  const onSubmit = (data: CreateUserFormData) => {
    const userData: CreateUser = {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone || undefined,
      role: data.role as 'USER' | 'MANAGER' | 'ADMIN',
    };

    createUser.mutate(userData, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New User</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FormContent>
            <Alert severity="info" sx={{ mb: 1 }}>
              Create user accounts manually. Use this for creating staff accounts (MANAGER/ADMIN) or
              customer accounts when needed.
            </Alert>

            <FieldRow>
              <FieldContainer sx={{ flex: 1 }}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      required
                      fullWidth
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      disabled={createUser.isPending}
                    />
                  )}
                />
              </FieldContainer>

              <FieldContainer sx={{ flex: 1 }}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      required
                      fullWidth
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      disabled={createUser.isPending}
                    />
                  )}
                />
              </FieldContainer>
            </FieldRow>

            <FieldContainer>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    type="email"
                    required
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    disabled={createUser.isPending}
                  />
                )}
              />
            </FieldContainer>

            <FieldContainer>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message || 'Must be at least 8 characters with uppercase, lowercase, and number'}
                    disabled={createUser.isPending}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </FieldContainer>

            <FieldContainer>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                    disabled={createUser.isPending}
                    value={field.value || ''}
                  />
                )}
              />
            </FieldContainer>

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
                    disabled={createUser.isPending}
                  >
                    <MenuItem value={UserRole.USER}>User (Customer)</MenuItem>
                    <MenuItem value={UserRole.MANAGER}>Manager (Staff)</MenuItem>
                    <MenuItem value={UserRole.ADMIN}>Admin (Full Access)</MenuItem>
                  </TextField>
                )}
              />
            </FieldContainer>
          </FormContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={createUser.isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={createUser.isPending}
            startIcon={createUser.isPending && <CircularProgress size={20} />}
          >
            Create User
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
