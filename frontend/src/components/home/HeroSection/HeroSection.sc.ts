import { styled } from '@mui/material/styles';
import { Box, TextField } from '@mui/material';

export const HeroContainer = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.text.primary,
  padding: theme.spacing(8, 3),
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

export const SearchBox = styled(Box)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  marginTop: theme.spacing(3),
}));

export const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#FFFFFF',
    '& fieldset': {
      borderColor: 'transparent',
    },
  },
});
