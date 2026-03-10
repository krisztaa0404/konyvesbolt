import { Box, styled } from '@mui/material';

export const FormContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(1),
}));

export const FieldContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
