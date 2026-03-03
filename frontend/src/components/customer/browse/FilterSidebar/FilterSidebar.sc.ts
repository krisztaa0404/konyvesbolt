import { styled, Box, Button } from '@mui/material';

export const FilterContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    position: 'sticky',
    top: 16,
    height: 'fit-content',
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(2),
  },
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

export const FilterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '&:last-child': {
    marginBottom: 0,
  },
}));

export const FilterHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

export const ClearButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
