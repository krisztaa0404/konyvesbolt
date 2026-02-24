/**
 * Add/Edit Book Page - Book form for creating or editing
 */
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export const AddEditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {isEdit ? 'Edit Book' : 'Add New Book'}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {isEdit ? `Editing book ID: ${id}` : 'Create a new book entry'}
      </Typography>
    </Box>
  );
};
