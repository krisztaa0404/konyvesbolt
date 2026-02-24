/**
 * Styled components for HomePage
 */
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const PageContainer = styled(Box)({
  width: '100%',
});

export const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1400,
  margin: '0 auto',
  padding: theme.spacing(3),
}));

export const GenresGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(6),
}));

export const SectionTitle = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));
