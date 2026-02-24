import { styled } from '@mui/material/styles';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon } from '@mui/material';

export const LayoutContainer = styled(Box)({
  display: 'flex',
  minHeight: '100vh',
});

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 250,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 250,
    boxSizing: 'border-box',
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
}));

export const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.grey[800]}`,
}));

export const StyledList = styled(List)({
  padding: 0,
});

export const StyledListItem = styled(ListItem)({
  padding: 0,
});

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(2),
  '&:hover': {
    backgroundColor: theme.palette.grey[800],
  },
  '&.active': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  color: theme.palette.common.white,
  minWidth: 40,
}));

export const MainContainer = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});

export const MainContent = styled('main')(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
}));
