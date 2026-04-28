import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

export const RefreshContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

export const RefreshButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing(1),
  minWidth: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginRight: 0,
  },
}));
