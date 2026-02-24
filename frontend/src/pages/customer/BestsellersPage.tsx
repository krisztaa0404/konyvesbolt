/**
 * Bestsellers Page - Top selling books
 */
import { Box, Typography } from '@mui/material';

export const BestsellersPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bestsellers
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Weekly and monthly bestselling books
      </Typography>
    </Box>
  );
};
