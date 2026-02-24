/**
 * Order Detail Page - Detailed order view with status update
 */
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Order Detail
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Order ID: {id}
      </Typography>
    </Box>
  );
};
