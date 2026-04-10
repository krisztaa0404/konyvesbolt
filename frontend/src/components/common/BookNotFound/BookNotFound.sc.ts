import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const NotFoundContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '80vh',
  textAlign: 'center',
  padding: theme.spacing(8, 2),
  gap: theme.spacing(3),
}));

export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: theme.spacing(1),

  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    width: '100%',
    maxWidth: 300,
  },
}));
