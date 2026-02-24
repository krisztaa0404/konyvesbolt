import { styled } from '@mui/material/styles';
import { Box, Tabs } from '@mui/material';

export { PageContainer, ContentContainer } from '@components/layout/common/PageLayout.sc';

export const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

interface TabPanelProps {
  hidden: boolean;
}

export const TabPanel = styled(Box)<TabPanelProps>(({ hidden }) => ({
  display: hidden ? 'none' : 'block',
}));
