import { Box, styled } from '@mui/material';

export const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '&:last-child': {
    marginBottom: 0,
  },
}));

export const SectionTitle = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(2),
  fontSize: '1.1rem',
  color: theme.palette.text.primary,
}));

export const FormRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const ImagePreviewContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  maxWidth: '200px',
  '& img': {
    width: '100%',
    height: 'auto',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
  },
}));
