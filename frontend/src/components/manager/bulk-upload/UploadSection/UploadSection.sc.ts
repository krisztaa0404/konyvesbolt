import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export const FileDropZone = styled(Box, {
  shouldForwardProp: prop => prop !== 'error' && prop !== 'hasFile',
})<{ error?: boolean; hasFile?: boolean }>(({ theme, error, hasFile }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  backgroundColor: error
    ? theme.palette.error.light + '10'
    : hasFile
      ? theme.palette.success.light + '10'
      : theme.palette.background.default,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '08',
    borderColor: theme.palette.primary.main,
  },
}));
