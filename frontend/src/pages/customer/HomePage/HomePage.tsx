import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/routes';
import { HeroSection } from '@components/customer/home/HeroSection/HeroSection';
import { RankedBooksSection } from '@components/customer/home/RankedBooksSection/RankedBooksSection';
import { GenreStatisticsCard } from '@components/customer/home/GenreStatisticsCard/GenreStatisticsCard';
import { GenreStatisticsCardSkeleton } from '@components/customer/home/GenreStatisticsCard/GenreStatisticsCardSkeleton';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { NewestBooksSection } from '@components/customer/home/NewestBooksSection/NewestBooksSection';
import { useNewestBooks } from '@hooks/useNewestBooks';
import { useTopMonthlyBooks } from '@hooks/useTopBooks';
import { useGenreStatistics } from '@hooks/useGenreStatistics';
import { useActiveSeasonalDiscounts } from '@hooks/useActiveSeasonalDiscounts';
import { SeasonalPromotionsSection } from '@components/customer/home/SeasonalPromotionsSection/SeasonalPromotionsSection';
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
    data: monthlyBooks,
    isLoading: isLoadingMonthly,
    isError: isErrorMonthly,
    error: errorMonthly,
  } = useTopMonthlyBooks(5);
  const {
    data: genreStats,
    isLoading: isLoadingGenres,
    isError: isErrorGenres,
    error: errorGenres,
  } = useGenreStatistics();
  const { data: activeDiscounts, isLoading: isLoadingDiscounts } = useActiveSeasonalDiscounts();

  return (
    <PageContainer>
      <HeroSection />

      <ContentContainer>
        {activeDiscounts && activeDiscounts.length > 0 && (
          <SeasonalPromotionsSection
            discounts={activeDiscounts.slice(0, 3)}
            isLoading={isLoadingDiscounts}
          />
        )}
        <NewestBooksSection
          title="Newest Books"
          books={newestBooks?.content}
          isLoading={isLoadingNewest}
          isError={isErrorNewest}
          error={errorNewest}
          onViewAll={() => navigate(ROUTES.BROWSE_BOOKS)}
          viewAllButtonText="View Complete List"
        />

        <RankedBooksSection
          title="Bestsellers"
          books={monthlyBooks}
          isLoading={isLoadingMonthly}
          isError={isErrorMonthly}
          error={errorMonthly}
          onViewAll={() => navigate(ROUTES.BESTSELLERS)}
          viewAllButtonText="View Complete List"
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
