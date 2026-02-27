import { styled, Box, Paper } from '@mui/material';

export const ListContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const ListItemContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)',
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

export const BookInfo = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  minWidth: 0,
}));

export const GenresContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  flexWrap: 'wrap',
  marginTop: theme.spacing(0.5),
}));

export const PriceSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  minWidth: 120,
  [theme.breakpoints.down('sm')]: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
}));

export const StockBadge = styled(Box, {
  shouldForwardProp: prop => prop !== '$inStock',
})<{ $inStock: boolean }>(({ theme, $inStock }) => ({
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: $inStock ? theme.palette.success.light : theme.palette.error.light,
  color: $inStock ? theme.palette.success.dark : theme.palette.error.dark,
  fontSize: '0.75rem',
  fontWeight: 600,
  textAlign: 'center',
}));
