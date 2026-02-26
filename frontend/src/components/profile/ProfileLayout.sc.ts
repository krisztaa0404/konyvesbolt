import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const FormContainer = styled(Box)(() => ({
  width: '100%',
}));

export const FormSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
  marginBottom: theme.spacing(4),
}));

export const SectionTitle = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(1),
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

export const FieldRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));
