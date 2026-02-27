import { useCallback } from 'react';
import { Typography, Divider, Badge } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import {
  GenreFilter,
  PriceRangeFilter,
  AuthorFilter,
  YearRangeFilter,
  StockFilter,
} from '../filters';
import { FilterContainer, FilterSection, FilterHeader, ClearButton } from './FilterSidebar.sc';
import { useFilterStore } from '@store/filterStore';

export const FilterSidebar: React.FC = () => {
  const { filters, updateFilters, clearFilters, getActiveFilterCount } = useFilterStore(
    useShallow(state => ({
      filters: state.filters,
      updateFilters: state.updateFilters,
      clearFilters: state.clearFilters,
      getActiveFilterCount: state.getActiveFilterCount,
    }))
  );

  const activeFilterCount = getActiveFilterCount();
  const hasActiveFilters = activeFilterCount > 0;

  const handleClearFilters = () => {
    clearFilters();
  };

  const handleGenreChange = useCallback(
    (genreIds: string[]) => {
      updateFilters({ genreIds: genreIds.length > 0 ? genreIds : undefined });
    },
    [updateFilters]
  );

  const handlePriceChange = useCallback(
    (priceMin?: number, priceMax?: number) => {
      updateFilters({ priceMin, priceMax });
    },
    [updateFilters]
  );

  const handleAuthorChange = useCallback(
    (author: string) => {
      updateFilters({ author: author || undefined });
    },
    [updateFilters]
  );

  const handleYearChange = useCallback(
    (yearFrom?: number, yearTo?: number) => {
      updateFilters({ yearFrom, yearTo });
    },
    [updateFilters]
  );

  const handleStockChange = useCallback(
    (inStock: boolean) => {
      updateFilters({ inStock: inStock || undefined });
    },
    [updateFilters]
  );

  return (
    <FilterContainer>
      <FilterHeader>
        <Badge badgeContent={activeFilterCount} color="primary">
          <Typography variant="h6">Filters</Typography>
        </Badge>
      </FilterHeader>

      <Divider sx={{ mb: 2 }} />

      <FilterSection>
        <GenreFilter value={filters.genreIds || []} onChange={handleGenreChange} />
      </FilterSection>

      <Divider sx={{ my: 2 }} />

      <FilterSection>
        <PriceRangeFilter
          minPrice={filters.priceMin ?? undefined}
          maxPrice={filters.priceMax ?? undefined}
          onChange={handlePriceChange}
        />
      </FilterSection>

      <Divider sx={{ my: 2 }} />

      <FilterSection>
        <AuthorFilter value={filters.author || ''} onChange={handleAuthorChange} />
      </FilterSection>

      <Divider sx={{ my: 2 }} />

      <FilterSection>
        <YearRangeFilter
          minYear={filters.yearFrom ?? undefined}
          maxYear={filters.yearTo ?? undefined}
          onChange={handleYearChange}
        />
      </FilterSection>

      <Divider sx={{ my: 2 }} />

      <FilterSection>
        <StockFilter checked={filters.inStock || false} onChange={handleStockChange} />
      </FilterSection>

      <Divider sx={{ my: 2 }} />

      {hasActiveFilters && (
        <ClearButton variant="outlined" color="primary" fullWidth onClick={handleClearFilters}>
          Clear Filters
        </ClearButton>
      )}
    </FilterContainer>
  );
};
