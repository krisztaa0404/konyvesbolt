import { useState, useEffect } from 'react';
import { Typography, Pagination, Button } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { useBrowseBooks } from '@hooks/useBrowseBooks';
import { useFilterStore } from '@store/filterStore';
import { FilterSidebar } from '@components/browse/FilterSidebar';
import { BrowseToolbar } from '@components/browse/BrowseToolbar';
import { BookGrid } from '@components/browse/BookGrid';
import { BookList } from '@components/browse/BookList';
import {
  PageContainer,
  ContentWrapper,
  MainContent,
  PaginationContainer,
  EmptyStateContainer,
  ErrorContainer,
} from './BrowseBooksPage.sc';

export const BrowseBooksPage = () => {
  const { viewMode, filters, searchTerm, clearFilters, setSearchTerm } = useFilterStore(
    useShallow(state => ({
      viewMode: state.viewMode,
      filters: state.filters,
      searchTerm: state.searchTerm,
      clearFilters: state.clearFilters,
      setSearchTerm: state.setSearchTerm,
    }))
  );
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('createdAt,desc');

  useEffect(() => {
    setPage(0);
  }, [filters, searchTerm]);

  const { data, isLoading, isError, error } = useBrowseBooks({
    page,
    size: 20,
    sort,
  });

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setPage(0);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearAllFilters = () => {
    clearFilters();
    setSearchTerm('');
    setPage(0);
  };

  if (isError) {
    return (
      <PageContainer>
        <ErrorContainer>
          <Typography variant="h5" color="error" gutterBottom>
            Error Loading Books
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {error instanceof Error ? error.message : 'An unexpected error occurred'}
          </Typography>
          <Button variant="contained" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </ErrorContainer>
      </PageContainer>
    );
  }

  const books = data?.content || [];
  const totalPages = data?.page?.totalPages || 0;
  const totalElements = data?.page?.totalElements || 0;
  const currentPage = page + 1;

  return (
    <PageContainer>
      <BrowseToolbar resultCount={totalElements} sort={sort} onSortChange={handleSortChange} />

      <ContentWrapper>
        <FilterSidebar />

        <MainContent>
          {isLoading && (
            <>
              {viewMode === 'grid' ? (
                <BookGrid books={[]} loading />
              ) : (
                <BookList books={[]} loading />
              )}
            </>
          )}

          {!isLoading && (
            <>
              {books.length === 0 && (
                <EmptyStateContainer>
                  <Typography variant="h5" gutterBottom>
                    No books found
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Try adjusting your filters or search terms
                  </Typography>
                  <Button variant="outlined" onClick={handleClearAllFilters}>
                    Clear All Filters
                  </Button>
                </EmptyStateContainer>
              )}

              {books.length > 0 && (
                <>
                  {viewMode === 'grid' ? <BookGrid books={books} /> : <BookList books={books} />}

                  {totalPages > 1 && (
                    <PaginationContainer>
                      <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                      />
                    </PaginationContainer>
                  )}
                </>
              )}
            </>
          )}
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  );
};
