import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export { PageContainer, ContentContainer } from '@components/layout/common/PageLayout.sc';

export const GenresGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(6),
}));

export const SectionTitle = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));
