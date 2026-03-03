import React from 'react';
import { Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

const SkeletonContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const RankNumberSkeleton = styled(Skeleton)({
  position: 'absolute',
  top: '-20px',
  left: '-10px',
  fontSize: 'clamp(80px, 12vw, 128px)',
  width: '80px',
  height: '120px',
});

const ImageSkeleton = styled(Skeleton)({
  aspectRatio: '2/3',
  maxWidth: '180px',
  width: '100%',
  borderRadius: '8px',
});

const MetaSkeleton = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'center',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

export const RankedBookCardSkeleton: React.FC = () => {
  return (
    <SkeletonContainer>
      <RankNumberSkeleton variant="rectangular" />
      <ImageSkeleton variant="rectangular" />
      <MetaSkeleton>
        <Skeleton variant="text" width="80%" height={24} />
        <Skeleton variant="text" width="60%" height={20} />
      </MetaSkeleton>
    </SkeletonContainer>
  );
};
