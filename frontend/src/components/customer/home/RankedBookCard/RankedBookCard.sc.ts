import { styled } from '@mui/material/styles';

export const RankContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2),
  cursor: 'pointer',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

export const RankNumber = styled('div')({
  position: 'absolute',
  top: '-35px',
  left: '-35px',
  fontSize: 'clamp(100px, 15vw, 160px)',
  fontWeight: 800,
  color: '#C8B8A8',
  opacity: 0.85,
  zIndex: 0,
  userSelect: 'none',
  pointerEvents: 'none',
  lineHeight: 1,
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
});

export const BookContent = styled('div')({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const BookImageWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  aspectRatio: '2/3',
  maxWidth: '180px',
  width: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
  transition: 'box-shadow 0.2s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[8],
  },
}));

export const BookImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const BookMeta = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  textAlign: 'center',
  '& h3': {
    fontSize: '1rem',
    fontWeight: 600,
    marginBottom: theme.spacing(0.5),
  },
  '& p': {
    fontSize: '0.875rem',
  },
}));
