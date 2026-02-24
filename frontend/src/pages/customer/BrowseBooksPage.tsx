/**
 * Browse Books Page - Book catalog with filters
 */
import { Box, Typography } from '@mui/material';

export const BrowseBooksPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Browse Books
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Book catalog with search, filters, and sorting
      </Typography>
    </Box>
  );
};
