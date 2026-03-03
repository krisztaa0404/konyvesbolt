import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const SectionContainer = styled('section')(({ theme }) => ({
  marginBottom: theme.spacing(6),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));

export const SectionHeader = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

export const BooksContainer = styled('div')(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(3),
  scrollBehavior: 'smooth',

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    '& > *': {
      scrollSnapAlign: 'start',
    },
    '&::-webkit-scrollbar': {
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: theme.palette.grey[200],
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[400],
      borderRadius: '4px',
      '&:hover': {
        backgroundColor: theme.palette.grey[500],
      },
    },
  },

  [theme.breakpoints.between('md', 'lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    '& > *': {
      scrollSnapAlign: 'start',
    },
  },

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(5, 1fr)',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
}));

export const ViewAllButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(4),
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
