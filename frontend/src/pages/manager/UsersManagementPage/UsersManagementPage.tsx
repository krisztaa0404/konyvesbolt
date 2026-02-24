/**
 * Users Management Page - User account management
 */
import { Box, Typography } from '@mui/material';

export const UsersManagementPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage user accounts and roles
      </Typography>
    </Box>
  );
};
