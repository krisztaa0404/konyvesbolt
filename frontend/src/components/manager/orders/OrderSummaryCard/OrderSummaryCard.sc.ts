import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const SummaryCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: 'fit-content',
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
