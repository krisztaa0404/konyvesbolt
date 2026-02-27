import { Typography, Button } from '@mui/material';
import { ShoppingCart as CartIcon, AccountCircle as AccountIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@store/authStore';
import { useCartStore } from '@store/cartStore';
import { ROUTES } from '@router/routes';
import {
  StyledAppBar,
  StyledToolbar,
  LogoBox,
  NavBox,
  ActionsBox,
  StyledIconButton,
  StyledBadge,
} from './Header.sc';

interface HeaderProps {
  variant: 'customer' | 'manager';
}

export const Header = ({ variant }: HeaderProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const totalItems = useCartStore(state => state.getTotalItems());

  const handleLogoClick = () => {
    navigate(variant === 'customer' ? ROUTES.HOME : ROUTES.MANAGER_DASHBOARD, { replace: true });
  };

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <StyledAppBar>
      <StyledToolbar>
        <LogoBox onClick={handleLogoClick}>
          <Typography variant="h6" component="div">
            {variant === 'customer' ? 'Bookstore' : 'Manager Portal'}
          </Typography>
        </LogoBox>

        <NavBox sx={{ flex: 1 }} />

        <ActionsBox>
          {variant === 'customer' && (
            <StyledIconButton onClick={() => navigate(ROUTES.CART)}>
              <StyledBadge badgeContent={totalItems} color="secondary">
                <CartIcon />
              </StyledBadge>
            </StyledIconButton>
          )}

          {isAuthenticated ? (
            <>
              <StyledIconButton onClick={() => navigate(ROUTES.PROFILE)}>
                <AccountIcon />
              </StyledIconButton>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              {user && (
                <Typography variant="body2">
                  {user.firstName} {user.lastName}
                </Typography>
              )}
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate(ROUTES.LOGIN)}>
              Login
            </Button>
          )}
        </ActionsBox>
      </StyledToolbar>
    </StyledAppBar>
  );
};
