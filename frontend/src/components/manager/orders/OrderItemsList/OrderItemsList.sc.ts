import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const SectionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const OrderItem = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '80px 1fr auto',
  gap: theme.spacing(2),
  alignItems: 'center',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-child': {
    borderBottom: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '60px 1fr',
    gap: theme.spacing(1.5),
  },
}));

export const ItemImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 100,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    height: 80,
  },
}));

export const ItemDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  minWidth: 0,
}));

export const ItemPriceInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: theme.spacing(0.5),
  [theme.breakpoints.down('sm')]: {
    gridColumn: '2 / 3',
    alignItems: 'flex-start',
  },
}));
