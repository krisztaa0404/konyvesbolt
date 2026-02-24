/**
 * Manage Books Page - Book inventory management
 */
import { Box, Typography } from '@mui/material';

export const ManageBooksPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Book Management
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage book inventory
      </Typography>
    </Box>
  );
};
