import { Box, Skeleton } from '@mui/material';

export const ProfileTabSkeleton = () => {
  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Skeleton variant="text" width="40%" height={40} sx={{ mb: 3 }} />
      <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 2, borderRadius: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 2, borderRadius: 1 }} />
      <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 2, borderRadius: 1 }} />
      <Skeleton variant="rectangular" width="60%" height={40} sx={{ mt: 3, borderRadius: 1 }} />
    </Box>
  );
};
