/**
 * Styled components for BookCard
 */
import { styled } from '@mui/material/styles';
import { Card, CardMedia, CardContent, Box, IconButton } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 320,
  objectFit: 'contain',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
}));

export const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const PriceBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 'auto',
});

export const StockBadge = styled(Box, {
  shouldForwardProp: prop => prop !== '$inStock',
})<{ $inStock: boolean }>(({ $inStock, theme }) => ({
  padding: '2px 8px',
  borderRadius: 4,
  fontSize: '0.75rem',
  fontWeight: 600,
  backgroundColor: $inStock ? theme.palette.success.light : theme.palette.error.light,
  color: $inStock ? theme.palette.success.contrastText : theme.palette.error.contrastText,
}));

export const AddToCartButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[4],
  },
}));
