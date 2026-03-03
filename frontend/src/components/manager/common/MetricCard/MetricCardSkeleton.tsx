import { Skeleton } from '@mui/material';
import { StyledCard } from './MetricCard.sc';

export const MetricCardSkeleton = () => {
  return (
    <StyledCard>
      <Skeleton variant="circular" width={56} height={56} />
      <Skeleton variant="text" width={80} height={48} />
      <Skeleton variant="text" width={120} height={20} />
    </StyledCard>
  );
};
