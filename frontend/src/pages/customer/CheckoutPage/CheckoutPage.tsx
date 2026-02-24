/**
 * Checkout Page - Complete purchase
 */
import { Box, Typography } from '@mui/material';

export const CheckoutPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Complete your purchase
      </Typography>
    </Box>
  );
};
