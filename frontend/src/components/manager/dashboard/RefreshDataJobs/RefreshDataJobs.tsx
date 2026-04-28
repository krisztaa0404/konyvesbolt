import { Typography, CircularProgress } from '@mui/material';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useRefreshBookRecommendations } from '@hooks/useRefreshBookRecommendations';
import { useRefreshGenreStatistics } from '@hooks/useRefreshGenreStatistics';
import { useRefreshTopBooksMonthly } from '@hooks/useRefreshTopBooksMonthly';
import { useRefreshTopBooksWeekly } from '@hooks/useRefreshTopBooksWeekly';
import { RefreshContainer, RefreshButton } from './RefreshDataJobs.sc';

export const RefreshDataJobs = () => {
  const refreshBookRecs = useRefreshBookRecommendations();
  const refreshGenreStats = useRefreshGenreStatistics();
  const refreshTopMonthly = useRefreshTopBooksMonthly();
  const refreshTopWeekly = useRefreshTopBooksWeekly();

  return (
    <RefreshContainer>
      <Typography variant="h5" gutterBottom>
        Refresh Data
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Manually refresh materialized views to update recommendations and statistics
      </Typography>

      <RefreshButton
        variant="outlined"
        startIcon={refreshBookRecs.isPending ? <CircularProgress size={20} /> : <RefreshIcon />}
        onClick={() => refreshBookRecs.mutate()}
        disabled={refreshBookRecs.isPending}
      >
        {refreshBookRecs.isPending ? 'Refreshing...' : 'Book Recommendations'}
      </RefreshButton>

      <RefreshButton
        variant="outlined"
        startIcon={refreshGenreStats.isPending ? <CircularProgress size={20} /> : <RefreshIcon />}
        onClick={() => refreshGenreStats.mutate()}
        disabled={refreshGenreStats.isPending}
      >
        {refreshGenreStats.isPending ? 'Refreshing...' : 'Genre Statistics'}
      </RefreshButton>

      <RefreshButton
        variant="outlined"
        startIcon={refreshTopMonthly.isPending ? <CircularProgress size={20} /> : <RefreshIcon />}
        onClick={() => refreshTopMonthly.mutate()}
        disabled={refreshTopMonthly.isPending}
      >
        {refreshTopMonthly.isPending ? 'Refreshing...' : 'Top Books (Monthly)'}
      </RefreshButton>

      <RefreshButton
        variant="outlined"
        startIcon={refreshTopWeekly.isPending ? <CircularProgress size={20} /> : <RefreshIcon />}
        onClick={() => refreshTopWeekly.mutate()}
        disabled={refreshTopWeekly.isPending}
      >
        {refreshTopWeekly.isPending ? 'Refreshing...' : 'Top Books (Weekly)'}
      </RefreshButton>
    </RefreshContainer>
  );
};
