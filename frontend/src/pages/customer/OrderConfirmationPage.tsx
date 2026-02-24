/**
 * Order Confirmation Page - Order success and details
 */
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export const OrderConfirmationPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Confirmation
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Order ID: {id}
      </Typography>
    </Box>
  );
};
