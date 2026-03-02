import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const OrderPageContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1200,
  margin: '0 auto',
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const OrderContent = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 400px',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const SectionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const SummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: 'fit-content',
  position: 'sticky',
  top: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    position: 'static',
  },
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
}));

export const ItemImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 100,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
}));

export const ItemDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  minWidth: 0,
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
