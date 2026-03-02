import { Typography, Tab } from '@mui/material';
import { Person, History, Lock, DeleteForever, Settings } from '@mui/icons-material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useCurrentUser } from '@hooks/useCurrentUser';
import { LoadingSpinner } from '@components/common/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import {
  PageContainer,
  ContentContainer,
  PageHeader,
  SidebarLayout,
  StyledTabs,
  MainContent,
} from './ProfilePage.sc';

export const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user, isLoading, isError, error } = useCurrentUser();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/orders')) return 1;
    if (path.includes('/password')) return 2;
    if (path.includes('/preferences')) return 3;
    if (path.includes('/delete')) return 4;
    return 0;
  };

  const activeTab = getActiveTab();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    const routes = [
      '/profile/info',
      '/profile/orders',
      '/profile/password',
      '/profile/preferences',
      '/profile/delete',
    ];
    navigate(routes[newValue]);
  };

  if (isLoading) {
    return <LoadingSpinner fullPage />;
  }

  if (isError || !user) {
    return (
      <PageContainer>
        <ContentContainer>
          <ErrorMessage message={error?.message || 'Failed to load profile'} severity="error" />
        </ContentContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentContainer>
        <PageHeader>
          <Typography variant="h4" gutterBottom>
            My Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your profile, view orders, and update settings
          </Typography>
        </PageHeader>

        <SidebarLayout>
          <StyledTabs
            orientation="vertical"
            value={activeTab}
            onChange={handleTabChange}
            aria-label="Profile tabs"
            sx={{
              '@media (max-width: 899px)': {
                '& .MuiTabs-flexContainer': {
                  flexDirection: 'row',
                },
              },
            }}
          >
            <Tab
              icon={<Person />}
              iconPosition="start"
              label="Profile"
              id="profile-tab-0"
              aria-controls="profile-tabpanel-0"
            />
            <Tab
              icon={<History />}
              iconPosition="start"
              label="Order History"
              id="profile-tab-1"
              aria-controls="profile-tabpanel-1"
            />
            <Tab
              icon={<Lock />}
              iconPosition="start"
              label="Change Password"
              id="profile-tab-2"
              aria-controls="profile-tabpanel-2"
            />
            <Tab
              icon={<Settings />}
              iconPosition="start"
              label="Preferences"
              id="profile-tab-3"
              aria-controls="profile-tabpanel-3"
            />
            <Tab
              icon={<DeleteForever />}
              iconPosition="start"
              label="Delete Account"
              id="profile-tab-4"
              aria-controls="profile-tabpanel-4"
            />
          </StyledTabs>

          <MainContent>
            <Outlet />
          </MainContent>
        </SidebarLayout>
      </ContentContainer>
    </PageContainer>
  );
};
