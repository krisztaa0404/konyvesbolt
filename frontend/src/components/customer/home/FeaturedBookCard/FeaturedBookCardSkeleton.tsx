import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

const SkeletonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  height: '100%',
}));

const CoverSkeleton = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '320px',
  aspectRatio: '2/3',
  marginBottom: theme.spacing(3),

  [theme.breakpoints.down('md')]: {
    maxWidth: '280px',
  },

  [theme.breakpoints.down('sm')]: {
    maxWidth: '240px',
  },
}));

const TaglineSkeleton = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '320px',
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const FeaturedBookCardSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      <CoverSkeleton>
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{ borderRadius: '12px' }}
        />
      </CoverSkeleton>
      <TaglineSkeleton>
        <Skeleton variant="text" width="80%" height={24} />
        <Skeleton variant="text" width="60%" height={24} />
      </TaglineSkeleton>
      <Skeleton
        variant="rectangular"
        width={120}
        height={42}
        sx={{ borderRadius: '4px', marginTop: 2 }}
      />
    </SkeletonContainer>
  );
};
