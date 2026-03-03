import { styled, Box, FormControlLabel } from '@mui/material';

export const DiscountOption = styled(FormControlLabel)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  margin: 0,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  marginBottom: theme.spacing(1.5),
  transition: 'all 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },

  '&.Mui-disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
}));

export const DiscountDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  flex: 1,
  marginLeft: theme.spacing(1),
}));

export const SavingsPreview = styled(Box)(({ theme }) => ({
  color: theme.palette.success.main,
  fontWeight: 600,
  fontSize: '0.875rem',
}));
