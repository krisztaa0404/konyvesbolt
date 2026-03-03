import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Box, IconButton, Badge } from '@mui/material';

export const StyledAppBar = styled(AppBar)({
  position: 'sticky',
});

export const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '1rem',
});

export const LogoBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
});

export const NavBox = styled(Box)({
  display: 'flex',
  gap: '1rem',
  alignItems: 'center',
});

export const ActionsBox = styled(Box)({
  display: 'flex',
  gap: '0.5rem',
  alignItems: 'center',
});

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
}));
