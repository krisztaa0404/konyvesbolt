import { Typography, styled } from '@mui/material';

export const StockIndicator = styled(Typography)<{ low: boolean }>(({ theme, low }) => ({
  fontWeight: 600,
  color: low ? theme.palette.warning.main : theme.palette.text.primary,
}));
