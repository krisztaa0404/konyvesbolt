/**
 * Cart Page - Shopping cart review
 */
import { Box, Typography } from '@mui/material';

export const CartPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Review cart items and proceed to checkout
      </Typography>
    </Box>
  );
};
