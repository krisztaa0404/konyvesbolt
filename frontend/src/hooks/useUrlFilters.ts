import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useFilterStore } from '@store/customer/browseFilterStore';

/**
 * Hook to synchronize URL parameters with filter state.
 * When navigating with URL params (genre, discount, search), clears other filters
 * to provide a clean, focused view.
 */
export const useUrlFilters = () => {
  const [searchParams] = useSearchParams();
  const { filters, searchTerm, clearFilters, setSearchTerm, updateFilters } = useFilterStore(
    useShallow(state => ({
      filters: state.filters,
      searchTerm: state.searchTerm,
      clearFilters: state.clearFilters,
      setSearchTerm: state.setSearchTerm,
      updateFilters: state.updateFilters,
    }))
  );

  useEffect(() => {
    const genreParams = searchParams.getAll('genre');
    const discountIdParam = searchParams.get('discountId');
    const searchParam = searchParams.get('search') || searchParams.get('q');

    if (genreParams.length > 0) {
      const currentGenreIds = filters.genreIds || [];
      const genreIdsMatch =
        genreParams.length === currentGenreIds.length &&
        genreParams.every(id => currentGenreIds.includes(id));

      if (!genreIdsMatch) {
        clearFilters();
        setSearchTerm('');
        updateFilters({ genreIds: genreParams });
      }
      return;
    }

    if (discountIdParam) {
      if (discountIdParam !== filters.discountId) {
        clearFilters();
        setSearchTerm('');
        updateFilters({ discountId: discountIdParam });
      }
      return;
    }

    if (searchParam) {
      if (searchParam !== searchTerm) {
        clearFilters();
        setSearchTerm(searchParam);
      }
      return;
    }
  }, [
    searchParams,
    filters.genreIds,
    filters.discountId,
    searchTerm,
    clearFilters,
    setSearchTerm,
    updateFilters,
  ]);
};
