import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const LayoutContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export const MainContent = styled('main')(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.background.default,
}));
