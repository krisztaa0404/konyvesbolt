import { Paper, TableCell, Box, Typography, styled } from '@mui/material';

export const StyledTableContainer = styled(Paper)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  overflow: 'hidden',
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const EmptyStateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(8),
  minHeight: 400,
}));

export const PaginationContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

export const StockIndicator = styled(Typography)<{ low: boolean }>(({ theme, low }) => ({
  fontWeight: 600,
  color: low ? theme.palette.warning.main : theme.palette.text.primary,
}));
