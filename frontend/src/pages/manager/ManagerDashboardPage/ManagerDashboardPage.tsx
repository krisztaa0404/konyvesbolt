/**
 * Manager Dashboard Page - Overview of business metrics
 */
import { Box, Typography } from '@mui/material';

export const ManagerDashboardPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Business metrics and quick actions
      </Typography>
    </Box>
  );
};
