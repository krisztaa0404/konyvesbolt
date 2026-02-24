/**
 * Skeleton loading state for BookCard
 */
import { Skeleton } from '@mui/material';
import { StyledCard, StyledCardContent } from './BookCard.sc';

export const BookCardSkeleton = () => {
  return (
    <StyledCard sx={{ cursor: 'default', '&:hover': { transform: 'none', boxShadow: 'inherit' } }}>
      <Skeleton variant="rectangular" height={320} />
      <StyledCardContent>
        <Skeleton variant="text" width="90%" height={32} />
        <Skeleton variant="text" width="70%" height={24} />
        <Skeleton variant="text" width="40%" height={28} sx={{ mt: 2 }} />
      </StyledCardContent>
    </StyledCard>
  );
};
