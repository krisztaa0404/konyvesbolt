import { styled } from '@mui/material/styles';
import { Box, Chip } from '@mui/material';

export const DetailContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1400,
  margin: '0 auto',
  padding: theme.spacing(4),
}));

export const BackButton = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  color: theme.palette.text.secondary,
  transition: 'color 0.2s',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const MainContent = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 400px',
  gap: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
  },
}));

export const CoverImage = styled('img')(({ theme }) => ({
  width: '100%',
  maxWidth: 350,
  maxHeight: 500,
  height: 'auto',
  objectFit: 'contain',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const PriceBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const StockBadge = styled(Chip, {
  shouldForwardProp: (prop) => prop !== '$inStock',
})<{ $inStock: boolean }>(({ $inStock, theme }) => ({
  backgroundColor: $inStock ? theme.palette.success.light : theme.palette.error.light,
  color: $inStock ? theme.palette.success.dark : theme.palette.error.dark,
}));

export const QuantityControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
}));

export const QuantityDisplay = styled(Box)(({ theme }) => ({
  minWidth: 60,
  textAlign: 'center',
  padding: theme.spacing(1, 2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

export const DescriptionBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  '& p': {
    lineHeight: 1.8,
    textAlign: 'justify',
  },
}));

export const AddToCartSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1.5),
  boxShadow: theme.shadows[2],
  maxWidth: 500,
}));

export const MetadataGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

export const RecommendationsSection = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
}));

export const RecommendationsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: theme.spacing(3),
  marginTop: theme.spacing(3),
}));
