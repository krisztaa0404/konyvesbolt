import { styled } from '@mui/material/styles';
import { Box, CircularProgress } from '@mui/material';

export const SpinnerContainer = styled(Box)<{ fullPage?: boolean }>(({ fullPage }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...(fullPage && {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: 9999,
  }),
  ...(!fullPage && {
    padding: '2rem',
  }),
}));

export const StyledCircularProgress = styled(CircularProgress)({});
