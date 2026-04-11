import { styled } from '@mui/material/styles';
import { Box, FormGroup, Button } from '@mui/material';

export const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const FilterHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

export const CheckboxList = styled(FormGroup)(({ theme }) => ({
  gap: theme.spacing(0.5),
}));

export const ToggleButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  textTransform: 'none',
  fontSize: '0.875rem',
}));

export const SelectAllButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '0.875rem',
  padding: theme.spacing(0.5, 1),
}));
