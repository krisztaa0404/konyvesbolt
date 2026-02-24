/**
 * Login Page - User authentication
 */
import { Box, Typography } from '@mui/material';

export const LoginPage = () => {
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
          Login
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          Login form will be implemented here
        </Typography>
      </Box>
    </Box>
  );
};
