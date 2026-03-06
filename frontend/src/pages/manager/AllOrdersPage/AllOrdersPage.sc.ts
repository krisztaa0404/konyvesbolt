import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  width: '100%',
}));

export const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const FiltersContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const TableWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
