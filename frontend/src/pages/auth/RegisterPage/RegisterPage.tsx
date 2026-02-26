import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, TextField, Button, Link, Box } from '@mui/material';
import { authApi } from '@services/api/authApi';
import { useAuthStore } from '@store/authStore';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { formatAddressDto } from '@utils/addressUtils';
import { getErrorMessage } from '@utils/errorUtils';
import { ROUTES } from '@router/routes';
import { registerSchema, type RegisterFormData } from '@schemas/authSchemas';
import type { RegisterRequest } from '@types';
import {
  PageContainer,
  FormContainer,
  FormActions,
  LinkContainer,
} from '@components/auth/AuthFormLayout/AuthFormLayout.sc';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { login: loginToStore, setLoading } = useAuthStore();
  const [apiError, setApiError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
      addressType: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setApiError('');
      setLoading(true);

      const { street, city, state, postalCode, country, addressType, phoneNumber, ...baseData } =
        data;

      const registerData: RegisterRequest = {
        ...baseData,
        phone: phoneNumber,
        addressData: formatAddressDto({
          street,
          city,
          state,
          postalCode,
          country,
          type: addressType,
        }),
      };

      const response = await authApi.register(registerData);

      if (!response.token) {
        throw new Error('Invalid response: missing token');
      }

      const user = {
        id: response.userId,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role,
      };

      loginToStore(response.token, user);

      navigate(ROUTES.HOME, { replace: true });
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, 'Registration failed. Please try again.');
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer elevation={3}>
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Create Account
        </Typography>

        {apiError && <ErrorMessage message={apiError} severity="error" />}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    type="text"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    autoComplete="given-name"
                    autoFocus
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    type="text"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    autoComplete="family-name"
                  />
                )}
              />
            </Box>

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  autoComplete="email"
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
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
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  autoComplete="new-password"
                />
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number"
                  type="tel"
                  fullWidth
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  autoComplete="tel"
                />
              )}
            />

            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
              Address
            </Typography>

            <Controller
              name="addressType"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Address Type (Optional)"
                  type="text"
                  fullWidth
                  error={!!errors.addressType}
                  helperText={errors.addressType?.message}
                  placeholder="e.g., BILLING, SHIPPING"
                />
              )}
            />

            <Controller
              name="street"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Street Address"
                  type="text"
                  fullWidth
                  error={!!errors.street}
                  helperText={errors.street?.message}
                  autoComplete="street-address"
                />
              )}
            />

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    type="text"
                    fullWidth
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    autoComplete="address-level2"
                  />
                )}
              />
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="State/Province"
                    type="text"
                    fullWidth
                    error={!!errors.state}
                    helperText={errors.state?.message}
                    autoComplete="address-level1"
                    placeholder="State/Province"
                  />
                )}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Controller
                name="postalCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Postal Code"
                    type="text"
                    fullWidth
                    error={!!errors.postalCode}
                    helperText={errors.postalCode?.message}
                    autoComplete="postal-code"
                  />
                )}
              />
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    type="text"
                    fullWidth
                    error={!!errors.country}
                    helperText={errors.country?.message}
                    autoComplete="country-name"
                    placeholder="e.g., United States"
                  />
                )}
              />
            </Box>
          </Box>

          <FormActions>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Account...' : 'Register'}
            </Button>
          </FormActions>
        </form>

        <LinkContainer>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Link component={RouterLink} to={ROUTES.LOGIN} color="primary" underline="hover">
              Login
            </Link>
          </Typography>
        </LinkContainer>
      </FormContainer>
    </PageContainer>
  );
};
