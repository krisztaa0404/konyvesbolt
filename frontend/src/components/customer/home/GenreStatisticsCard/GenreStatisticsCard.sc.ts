import { styled } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

export const StyledCardContent = styled(CardContent)({
  textAlign: 'center',
});

export const StatNumber = styled('div')(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginTop: theme.spacing(1),
}));
