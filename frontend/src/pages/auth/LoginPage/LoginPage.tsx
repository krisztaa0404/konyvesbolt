import { useState } from 'react';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, TextField, Button, Link } from '@mui/material';
import { authApi } from '@services/auth/authApi';
import { useAuthStore } from '@store/authStore';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { getErrorMessage } from '@utils/errorUtils';
import { ROUTES } from '@router/routes';
import { loginSchema, type LoginFormData } from '@schemas/authSchemas';
import {
  PageContainer,
  FormContainer,
  FormActions,
  LinkContainer,
} from '@layout/common/AuthLayout.sc';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: loginToStore, setLoading } = useAuthStore();
  const [apiError, setApiError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setApiError('');
      setLoading(true);

      const response = await authApi.login({
        email: data.email,
        password: data.password,
      });

      if (!response.token || !response.refreshToken) {
        throw new Error('Invalid response: missing authentication tokens');
      }

      const user = {
        id: response.userId,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role,
      };

      loginToStore(response.token, response.refreshToken, user);

      const from = location.state?.from?.pathname;

      if (from) {
        navigate(from, { replace: true });
      } else {
        const isManager = response.role === 'MANAGER' || response.role === 'ADMIN';
        const defaultRoute = isManager ? ROUTES.MANAGER_DASHBOARD : ROUTES.HOME;
        navigate(defaultRoute, { replace: true });
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, 'Login failed. Please try again.');
      setApiError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <FormContainer elevation={3}>
        <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
          Sign In
        </Typography>

        {apiError && <ErrorMessage message={apiError} severity="error" />}

        <form onSubmit={handleSubmit(onSubmit)}>
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
                autoFocus
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
                autoComplete="current-password"
                sx={{ mt: 2 }}
              />
            )}
          />

          <FormActions sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </FormActions>
        </form>

        <LinkContainer>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link component={RouterLink} to={ROUTES.REGISTER} color="primary" underline="hover">
              Register
            </Link>
          </Typography>
        </LinkContainer>
      </FormContainer>
    </PageContainer>
  );
};
