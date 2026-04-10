import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ErrorContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  textAlign: 'center',
  padding: theme.spacing(4, 2),
  gap: theme.spacing(3),
}));

export const ErrorActions = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  justifyContent: 'center',

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '100%',
    maxWidth: 300,
  },
}));
