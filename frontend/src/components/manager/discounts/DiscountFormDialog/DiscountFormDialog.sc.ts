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

export const RadioGroupContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1, 0),
}));
