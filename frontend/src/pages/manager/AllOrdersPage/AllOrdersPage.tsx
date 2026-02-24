/**
 * All Orders Page - Comprehensive order management
 */
import { Box, Typography } from '@mui/material';

export const AllOrdersPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Management
      </Typography>
      <Typography variant="body1" color="text.secondary">
        View and manage all orders
      </Typography>
    </Box>
  );
};
