import { styled } from '@mui/material/styles';
import { Box, Alert } from '@mui/material';

export const SuccessAlert = styled(Alert)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontSize: '1.1rem',
  '& .MuiAlert-icon': {
    fontSize: '2rem',
  },
}));

export const DetailsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export const SummaryContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export const OrderInfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1, 0),
}));

export const AddressBlock = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));
