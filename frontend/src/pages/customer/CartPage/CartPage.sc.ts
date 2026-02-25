import { styled } from '@mui/material/styles';
import { Box, Paper, IconButton } from '@mui/material';

export const CartContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const CartContent = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 400px',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr', // Stack on mobile
  },
}));

export const CartItemsSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const CartItemCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'grid',
  gridTemplateColumns: '120px 1fr auto',
  gap: theme.spacing(2),
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '80px 1fr',
  },
}));

export const ItemImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 160,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    height: 120,
  },
}));

export const ItemDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  minWidth: 0,
}));

// Clickable area wrapper
export const ClickableArea = styled(Box)(({ theme }) => ({
  display: 'contents',
  cursor: 'pointer',
  '& > img': {
    transition: 'opacity 0.2s',
  },
  '&:hover > img': {
    opacity: 0.8,
  },
  '&:hover h6': {
    color: theme.palette.primary.main,
    transition: 'color 0.2s',
  },
}));

export const ItemActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    gridColumn: '1 / -1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export const QuantityControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(0.5),
}));

export const QuantityButton = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0.5),
  '&:disabled': {
    opacity: 0.5,
  },
}));

export const QuantityDisplay = styled(Box)(({ theme }) => ({
  minWidth: 40,
  textAlign: 'center',
  padding: theme.spacing(0, 1),
}));

export const SummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: 'fit-content',
  position: 'sticky',
  top: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const SummaryRow = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const TotalRow = styled(SummaryRow)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  borderTop: `2px solid ${theme.palette.divider}`,
  marginTop: theme.spacing(1),
}));

export const EmptyCartContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8, 2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

export const EmptyCartIcon = styled(Box)(({ theme }) => ({
  fontSize: 80,
  color: theme.palette.text.secondary,
  opacity: 0.5,
}));
