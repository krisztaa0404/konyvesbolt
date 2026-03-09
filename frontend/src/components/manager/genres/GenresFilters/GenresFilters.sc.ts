import { Box, TextField, FormControl, styled } from '@mui/material';

export const FiltersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

export const SearchField = styled(TextField)(({ theme }) => ({
  flex: 1,
  minWidth: 250,
  [theme.breakpoints.down('md')]: {
    minWidth: 'unset',
  },
}));

export const FilterControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  [theme.breakpoints.down('md')]: {
    minWidth: 'unset',
  },
}));
