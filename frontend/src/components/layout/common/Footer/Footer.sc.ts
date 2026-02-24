import { styled } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

export const FooterContainer = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  padding: theme.spacing(3),
  marginTop: 'auto',
}));

export const FooterContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
});

export const LinksBox = styled(Box)({
  display: 'flex',
  gap: '2rem',
});

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));
