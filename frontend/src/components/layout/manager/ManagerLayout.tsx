import { Typography } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingBag as OrdersIcon,
  Book as BooksIcon,
  People as UsersIcon,
} from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../common/Header/Header';
import { ROUTES } from '@router/routes';
import {
  LayoutContainer,
  StyledDrawer,
  SidebarHeader,
  StyledList,
  StyledListItem,
  StyledListItemButton,
  StyledListItemIcon,
  MainContainer,
  MainContent,
} from './ManagerLayout.sc';
import { ListItemText } from '@mui/material';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: ROUTES.MANAGER_DASHBOARD },
  { text: 'Orders', icon: <OrdersIcon />, path: ROUTES.MANAGER_ORDERS },
  { text: 'Books', icon: <BooksIcon />, path: ROUTES.MANAGER_BOOKS },
  { text: 'Users', icon: <UsersIcon />, path: ROUTES.MANAGER_USERS },
];

export const ManagerLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <LayoutContainer>
      <StyledDrawer variant="permanent">
        <SidebarHeader>
          <Typography variant="h6">Manager Portal</Typography>
        </SidebarHeader>
        <StyledList>
          {menuItems.map(item => (
            <StyledListItem key={item.text}>
              <StyledListItemButton
                className={location.pathname === item.path ? 'active' : ''}
                onClick={() => navigate(item.path)}
              >
                <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                <ListItemText primary={item.text} />
              </StyledListItemButton>
            </StyledListItem>
          ))}
        </StyledList>
      </StyledDrawer>

      <MainContainer>
        <Header variant="manager" />
        <MainContent>
          <Outlet />
        </MainContent>
      </MainContainer>
    </LayoutContainer>
  );
};
