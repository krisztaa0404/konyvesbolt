import { styled } from '@mui/material/styles';
import { Box, Typography, Button } from '@mui/material';

export const FeaturedContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  cursor: 'pointer',
}));

export const BookCoverWrapper = styled(Box)(({ theme }) => ({
  perspective: '1000px',
  marginBottom: theme.spacing(3),
  width: '100%',
  maxWidth: '260px',
  aspectRatio: '2/3',

  [theme.breakpoints.down('md')]: {
    maxWidth: '220px',
  },

  [theme.breakpoints.down('sm')]: {
    maxWidth: '200px',
  },
}));

export const BookCover = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '12px',
  boxShadow: theme.shadows[8],
  transform: 'rotateY(-5deg) rotateX(2deg)',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.4s ease, box-shadow 0.3s ease',

  '&:hover': {
    transform: 'rotateY(-8deg) rotateX(3deg) scale(1.02)',
    boxShadow: '0 15px 50px rgba(0,0,0,0.3)',
  },

  [theme.breakpoints.down('md')]: {
    transform: 'rotateY(-3deg) rotateX(1deg)',
    '&:hover': {
      transform: 'rotateY(-5deg) rotateX(2deg) scale(1.02)',
    },
  },

  [theme.breakpoints.down('sm')]: {
    transform: 'none',
    '&:hover': {
      transform: 'scale(1.02)',
    },
  },

  willChange: 'transform',
}));

export const Tagline = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontStyle: 'italic',
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
  maxWidth: '320px',
}));

export const CTAButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  textTransform: 'none',
  fontSize: '1rem',
}));
