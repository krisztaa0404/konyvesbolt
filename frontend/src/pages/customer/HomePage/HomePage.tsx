/**
 * Home Page - Landing page with featured content
 */
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/routes';
import { HeroSection } from '@components/home/HeroSection/HeroSection';
import { BookSection } from '@components/home/BookSection/BookSection';
import { GenreStatisticsCard } from '@components/home/GenreStatisticsCard/GenreStatisticsCard';
import { GenreStatisticsCardSkeleton } from '@components/home/GenreStatisticsCard/GenreStatisticsCardSkeleton';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { useNewestBooks } from '@hooks/useNewestBooks';
import { useTopWeeklyBooks, useTopMonthlyBooks } from '@hooks/useTopBooks';
import { useGenreStatistics } from '@hooks/useGenreStatistics';
import { PageContainer, ContentContainer, GenresGrid, SectionTitle } from './HomePage.sc';

export const HomePage = () => {
  const navigate = useNavigate();

  const {
    data: newestBooks,
    isLoading: isLoadingNewest,
    isError: isErrorNewest,
    error: errorNewest,
  } = useNewestBooks(10);
  const {
    data: weeklyBooks,
    isLoading: isLoadingWeekly,
    isError: isErrorWeekly,
    error: errorWeekly,
  } = useTopWeeklyBooks(10);
  const {
    data: monthlyBooks,
    isLoading: isLoadingMonthly,
    isError: isErrorMonthly,
    error: errorMonthly,
  } = useTopMonthlyBooks(10);
  const {
    data: genreStats,
    isLoading: isLoadingGenres,
    isError: isErrorGenres,
    error: errorGenres,
  } = useGenreStatistics();

  return (
    <PageContainer>
      <HeroSection />

      <ContentContainer>
        <BookSection
          title="Newest Books"
          books={newestBooks?.content}
          isLoading={isLoadingNewest}
          isError={isErrorNewest}
          error={errorNewest}
          onViewAll={() => navigate(ROUTES.BROWSE_BOOKS)}
        />

        <BookSection
          title="Top Books This Week"
          books={weeklyBooks}
          isLoading={isLoadingWeekly}
          isError={isErrorWeekly}
          error={errorWeekly}
          showSalesCount
          onViewAll={() => navigate(ROUTES.BESTSELLERS)}
        />

        <BookSection
          title="Top Books This Month"
          books={monthlyBooks}
          isLoading={isLoadingMonthly}
          isError={isErrorMonthly}
          error={errorMonthly}
          showSalesCount
          onViewAll={() => navigate(ROUTES.BESTSELLERS)}
        />

        <SectionTitle>
          <Typography variant="h4" component="h2">
            Popular Genres
          </Typography>
        </SectionTitle>

        {isErrorGenres && (
          <ErrorMessage message={errorGenres?.message || 'Failed to load genres'} />
        )}
        <GenresGrid>
          {isLoadingGenres
            ? Array.from({ length: 6 }).map((_, index) => (
                <GenreStatisticsCardSkeleton key={index} />
              ))
            : genreStats
              ? genreStats.map(genre => <GenreStatisticsCard key={genre.genreId} genre={genre} />)
              : null}
        </GenresGrid>
      </ContentContainer>
    </PageContainer>
  );
};
