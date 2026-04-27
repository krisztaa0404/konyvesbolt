import { Typography, Button } from '@mui/material';
import {
  ShoppingCart as CartIcon,
  AccountCircle as AccountIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useAuthStore, selectIsCustomer } from '@store/authStore';
import { useCartStore } from '@store/cartStore';
import { useWishlistStore } from '@store/customer/wishlistStore';
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
  const isCustomer = useAuthStore(selectIsCustomer);
  const totalItems = useCartStore(state => state.getTotalItems());
  const totalWishlistItems = useWishlistStore(useShallow(state => state.getTotalItems()));

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
            <>
              <StyledIconButton onClick={() => navigate(ROUTES.WISHLIST)}>
                <StyledBadge badgeContent={totalWishlistItems} color="secondary">
                  <FavoriteBorderIcon />
                </StyledBadge>
              </StyledIconButton>

              <StyledIconButton onClick={() => navigate(ROUTES.CART)}>
                <StyledBadge badgeContent={totalItems} color="secondary">
                  <CartIcon />
                </StyledBadge>
              </StyledIconButton>
            </>
          )}

          {isAuthenticated ? (
            <>
              {isCustomer && (
                <StyledIconButton onClick={() => navigate(ROUTES.PROFILE)}>
                  <AccountIcon />
                </StyledIconButton>
              )}
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
