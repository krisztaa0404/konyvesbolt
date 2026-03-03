import { styled } from '@mui/material/styles';
import { Card, Box, Typography } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1.5),
  transition: 'all 0.3s ease',
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  cursor: 'default',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

export const IconContainer = styled(Box, {
  shouldForwardProp: prop => prop !== '$color',
})<{ $color: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' }>(
  ({ theme, $color }) => ({
    width: 56,
    height: 56,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette[$color].light,
    color: theme.palette[$color].main,
    '& svg': {
      fontSize: 28,
    },
  })
);

export const ValueText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '2rem',
  lineHeight: 1.2,
  color: theme.palette.text.primary,
}));

export const LabelText = styled(Typography)({
  fontSize: '0.875rem',
  fontWeight: 500,
  textAlign: 'center',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});
