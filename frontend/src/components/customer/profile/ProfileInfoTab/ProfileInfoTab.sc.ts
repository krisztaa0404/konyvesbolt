import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';

export const LoyaltyBadge = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.success.light,
  color: theme.palette.success.dark,
  fontWeight: 600,
  padding: theme.spacing(0.5, 1),
}));
