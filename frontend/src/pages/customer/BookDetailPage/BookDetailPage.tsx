/**
 * Book Detail Page - Detailed view of a single book
 */
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Book Detail
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Detailed view of book ID: {id}
      </Typography>
    </Box>
  );
};
