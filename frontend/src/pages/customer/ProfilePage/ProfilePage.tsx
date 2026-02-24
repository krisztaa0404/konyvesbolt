/**
 * Profile Page - User account management
 */
import { Box, Typography } from '@mui/material';

export const ProfilePage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage your account, view order history
      </Typography>
    </Box>
  );
};
