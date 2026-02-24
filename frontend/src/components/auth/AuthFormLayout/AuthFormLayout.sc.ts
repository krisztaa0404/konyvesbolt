import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const PageContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
  padding: '24px',
});

export const FormContainer = styled(Paper)(({ theme }) => ({
  maxWidth: 500,
  width: '100%',
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const FormActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const LinkContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(2),
}));
