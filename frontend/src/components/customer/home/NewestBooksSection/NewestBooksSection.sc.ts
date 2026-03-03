import { styled } from '@mui/material/styles';
import { Box, Button } from '@mui/material';

export const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
  padding: `0 ${theme.spacing(2)}`,

  [theme.breakpoints.up('md')]: {
    padding: 0,
  },
}));

export const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));

export const FeaturedLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),
  gridTemplateColumns: '1fr',
  alignItems: 'start',

  [theme.breakpoints.up('sm')]: {
    gap: theme.spacing(2),
  },

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '0.7fr 1.6fr',
    gap: theme.spacing(3),
  },

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '0.7fr 1.6fr',
    gap: theme.spacing(3),
  },
}));

export const BooksGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(2),

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

export const ViewAllButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: '8px',
  textTransform: 'none',
  fontSize: '1rem',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
}));
