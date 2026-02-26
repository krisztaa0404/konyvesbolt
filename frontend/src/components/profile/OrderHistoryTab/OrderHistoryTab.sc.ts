import { styled } from '@mui/material/styles';
import { Box, Chip } from '@mui/material';

export const OrdersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const OrderCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  transition: 'box-shadow 0.2s, border-color 0.2s',
  '&:hover': {
    boxShadow: theme.shadows[3],
    borderColor: theme.palette.primary.main,
  },
}));

export const OrderHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
  },
}));

export const OrderInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

export const OrderMeta = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
  },
}));

export const StatusChip = styled(Chip, {
  shouldForwardProp: prop => prop !== '$status',
})<{ $status: string }>(({ $status, theme }) => {
  const statusColors: Record<string, { bg: string; color: string }> = {
    DELIVERED: { bg: theme.palette.success.light, color: theme.palette.success.dark },
    SHIPPED: { bg: theme.palette.info.light, color: theme.palette.info.dark },
    PROCESSING: { bg: theme.palette.warning.light, color: theme.palette.warning.dark },
    PENDING: { bg: theme.palette.grey[200], color: theme.palette.grey[700] },
    CANCELLED: { bg: theme.palette.error.light, color: theme.palette.error.dark },
  };

  const colors = statusColors[$status] || statusColors.PENDING;

  return {
    backgroundColor: colors.bg,
    color: colors.color,
    fontWeight: 600,
  };
});

export const EmptyState = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  textAlign: 'center',
  gap: theme.spacing(2),
}));

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(3),
}));
