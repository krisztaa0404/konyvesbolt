import { styled, Box, Card } from '@mui/material';

export const PromotionsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1.5fr',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(6),

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

export const PromotionsList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const FeaturedBanner = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  minHeight: '300px',
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  position: 'relative',
  overflow: 'hidden',

  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
}));

export const FeaturedPercentage = styled(Box)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  lineHeight: 1,

  [theme.breakpoints.down('sm')]: {
    fontSize: '3rem',
  },
}));

export const FeaturedTitle = styled(Box)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: theme.spacing(1),

  [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem',
  },
}));

export const FeaturedDescription = styled(Box)(({ theme }) => ({
  fontSize: '1rem',
  opacity: 0.9,
  marginBottom: theme.spacing(2),
  maxWidth: '80%',

  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem',
  },
}));
