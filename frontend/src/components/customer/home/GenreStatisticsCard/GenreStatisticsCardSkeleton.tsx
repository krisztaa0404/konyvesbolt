import { Skeleton } from '@mui/material';
import { StyledCard, StyledCardContent } from './GenreStatisticsCard.sc';

export const GenreStatisticsCardSkeleton = () => {
  return (
    <StyledCard sx={{ cursor: 'default', '&:hover': { transform: 'none', boxShadow: 'inherit' } }}>
      <StyledCardContent>
        <Skeleton variant="text" width="70%" height={32} sx={{ margin: '0 auto' }} />
        <Skeleton variant="text" width="50%" height={48} sx={{ margin: '8px auto' }} />
        <Skeleton variant="text" width="80%" height={20} sx={{ margin: '0 auto' }} />
        <Skeleton variant="text" width="60%" height={20} sx={{ margin: '8px auto 0' }} />
      </StyledCardContent>
    </StyledCard>
  );
};
