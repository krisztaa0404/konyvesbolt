import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

export const ActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(1.5, 3),
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
