import { useState } from 'react';
import { Typography, Tab, Button } from '@mui/material';
import { LibraryBooks as LibraryBooksIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { BookSection } from '@components/home/BookSection/BookSection';
import { useTopWeeklyBooks, useTopMonthlyBooks } from '@hooks/useTopBooks';
import { ROUTES } from '@router/routes';
import {
  PageContainer,
  ContentContainer,
  PageHeader,
  StyledTabs,
  TabPanel,
} from './BestsellersPage.sc';

export const BestsellersPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const {
    data: weeklyBooks,
    isLoading: isLoadingWeekly,
    isError: isErrorWeekly,
    error: errorWeekly,
  } = useTopWeeklyBooks(15, { enabled: activeTab === 0 });

  const {
    data: monthlyBooks,
    isLoading: isLoadingMonthly,
    isError: isErrorMonthly,
    error: errorMonthly,
  } = useTopMonthlyBooks(15, { enabled: activeTab === 1 });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <PageContainer>
      <ContentContainer>
        <PageHeader>
          <Typography variant="h3" component="h1" gutterBottom>
            Bestsellers
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Discover our most popular books this week and month
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<LibraryBooksIcon />}
            onClick={() => navigate(ROUTES.BROWSE_BOOKS)}
            sx={{ mt: 2 }}
          >
            Browse All Books
          </Button>
        </PageHeader>

        <StyledTabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="bestsellers tabs"
        >
          <Tab label="This Week" id="tab-0" aria-controls="tabpanel-0" />
          <Tab label="This Month" id="tab-1" aria-controls="tabpanel-1" />
        </StyledTabs>

        <TabPanel
          role="tabpanel"
          hidden={activeTab !== 0}
          id="tabpanel-0"
          aria-labelledby="tab-0"
        >
          <BookSection
            title="Top 15 Books This Week"
            books={weeklyBooks}
            isLoading={isLoadingWeekly}
            isError={isErrorWeekly}
            error={errorWeekly}
            showSalesCount={true}
          />
        </TabPanel>

        <TabPanel
          role="tabpanel"
          hidden={activeTab !== 1}
          id="tabpanel-1"
          aria-labelledby="tab-1"
        >
          <BookSection
            title="Top 15 Books This Month"
            books={monthlyBooks}
            isLoading={isLoadingMonthly}
            isError={isErrorMonthly}
            error={errorMonthly}
            showSalesCount={true}
          />
        </TabPanel>
      </ContentContainer>
    </PageContainer>
  );
};
