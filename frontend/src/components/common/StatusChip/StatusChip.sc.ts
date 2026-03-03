import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';

export const StyledStatusChip = styled(Chip, {
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
