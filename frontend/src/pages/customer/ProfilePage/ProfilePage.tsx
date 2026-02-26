import { useState } from 'react';
import { Typography, Tab } from '@mui/material';
import { Person, History, Lock, DeleteForever, Settings } from '@mui/icons-material';
import { useCurrentUser } from '@hooks/useCurrentUser';
import { LoadingSpinner } from '@components/common/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { ProfileInfoTab } from '@components/profile/ProfileInfoTab';
import { OrderHistoryTab } from '@components/profile/OrderHistoryTab';
import { ChangePasswordTab } from '@components/profile/ChangePasswordTab';
import { PreferencesTab } from '@components/profile/PreferencesTab';
import { DeleteAccountTab } from '@components/profile/DeleteAccountTab';
import {
  PageContainer,
  ContentContainer,
  PageHeader,
  SidebarLayout,
  StyledTabs,
  MainContent,
  TabPanel,
} from './ProfilePage.sc';

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { data: user, isLoading, isError, error } = useCurrentUser();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
            <TabPanel
              $active={activeTab === 0}
              role="tabpanel"
              id="profile-tabpanel-0"
              aria-labelledby="profile-tab-0"
            >
              <ProfileInfoTab user={user} />
            </TabPanel>

            <TabPanel
              $active={activeTab === 1}
              role="tabpanel"
              id="profile-tabpanel-1"
              aria-labelledby="profile-tab-1"
            >
              <OrderHistoryTab />
            </TabPanel>

            <TabPanel
              $active={activeTab === 2}
              role="tabpanel"
              id="profile-tabpanel-2"
              aria-labelledby="profile-tab-2"
            >
              <ChangePasswordTab />
            </TabPanel>

            <TabPanel
              $active={activeTab === 3}
              role="tabpanel"
              id="profile-tabpanel-3"
              aria-labelledby="profile-tab-3"
            >
              <PreferencesTab user={user} />
            </TabPanel>

            <TabPanel
              $active={activeTab === 4}
              role="tabpanel"
              id="profile-tabpanel-4"
              aria-labelledby="profile-tab-4"
            >
              <DeleteAccountTab />
            </TabPanel>
          </MainContent>
        </SidebarLayout>
      </ContentContainer>
    </PageContainer>
  );
};
