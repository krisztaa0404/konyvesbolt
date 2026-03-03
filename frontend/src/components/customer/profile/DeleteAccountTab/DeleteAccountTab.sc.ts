import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const WarningBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

export const ConsequencesList = styled('ul')(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  paddingLeft: theme.spacing(3),
  '& li': {
    marginBottom: theme.spacing(1),
  },
}));

export const CheckboxContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));
