/**
 * Register Page - New user registration
 */
import { Box, Typography } from '@mui/material';

export const RegisterPage = () => {
  return (
    <Box
      sx={{
        p: 3,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
      }}
    >
      <Box sx={{ maxWidth: 400, width: '100%' }}>
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          Registration form will be implemented here
        </Typography>
      </Box>
    </Box>
  );
};
