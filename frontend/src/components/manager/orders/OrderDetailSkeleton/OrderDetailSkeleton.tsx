import { Box, Skeleton } from '@mui/material';
import {
  PageContainer,
  PageHeader,
  DetailsGrid,
  LeftColumn,
  RightColumn,
  SectionCard,
} from '@pages/manager/OrderDetailPage/OrderDetailPage.sc';

export const OrderDetailSkeleton = () => {
  return (
    <PageContainer>
      <PageHeader>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
        <Skeleton variant="text" width={300} height={48} />
      </PageHeader>
      <DetailsGrid>
        <LeftColumn>
          <SectionCard>
            <Skeleton variant="text" width={150} height={32} />
            {[...Array(6)].map((_, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Skeleton variant="text" width={120} />
                <Skeleton variant="text" width={180} />
              </Box>
            ))}
          </SectionCard>
          <SectionCard>
            <Skeleton variant="text" width={250} height={32} />
            <Skeleton variant="rectangular" height={120} sx={{ mt: 2 }} />
          </SectionCard>
          <SectionCard>
            <Skeleton variant="text" width={150} height={32} />
            {[...Array(3)].map((_, i) => (
              <Box key={i} sx={{ display: 'flex', gap: 2, py: 2 }}>
                <Skeleton variant="rectangular" width={80} height={100} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </Box>
                <Skeleton variant="text" width={80} />
              </Box>
            ))}
          </SectionCard>
        </LeftColumn>
        <RightColumn>
          <SectionCard>
            <Skeleton variant="text" width={150} height={32} />
            {[...Array(4)].map((_, i) => (
              <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={80} />
              </Box>
            ))}
          </SectionCard>
          <SectionCard>
            <Skeleton variant="text" width={180} height={32} />
            <Skeleton variant="rectangular" height={56} sx={{ mt: 2 }} />
            <Skeleton variant="rectangular" height={42} sx={{ mt: 2 }} />
          </SectionCard>
        </RightColumn>
      </DetailsGrid>
    </PageContainer>
  );
};
