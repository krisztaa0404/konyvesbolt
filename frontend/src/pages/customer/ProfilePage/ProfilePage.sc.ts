import { styled } from '@mui/material/styles';
import { Box, Tabs } from '@mui/material';

export const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  maxWidth: 1400,
  margin: '0 auto',
  padding: theme.spacing(4),
}));

export const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const SidebarLayout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '250px 1fr',
  gap: theme.spacing(4),
  minHeight: 'calc(100vh - 200px)',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    minHeight: 'auto',
  },
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiTab-root': {
    alignItems: 'center',
    textAlign: 'left',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      textAlign: 'center',
    },
  },
}));

export const MainContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: theme.spacing(3),
  height: '100%',
}));

export const TabPanel = styled(Box, {
  shouldForwardProp: prop => prop !== '$active',
})<{ $active: boolean }>(({ $active }) => ({
  display: $active ? 'block' : 'none',
  width: '100%',
}));
