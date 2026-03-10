import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useShallow } from 'zustand/react/shallow';
import { useAllBooks } from '@hooks/useAllBooks';
import { useBookFilterStore } from '@store/manager/managerFilterStore';
import { BooksFilters } from '@components/manager/books/BooksFilters';
import { BooksTable } from '@components/manager/books/BooksTable';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { ROUTES } from '@router/routes';
import {
  PageContainer,
  PageHeader,
  HeaderContent,
  FiltersContainer,
  TableWrapper,
} from '@layout/manager/ManagerPageLayout.sc';

export const ManageBooksPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [sortValue, setSortValue] = useState('createdAt,desc');

  const { searchTerm, statusFilter, updateStatusFilter } = useBookFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
      statusFilter: state.statusFilter,
      updateStatusFilter: state.updateStatusFilter,
    }))
  );

  useEffect(() => {
    const statusParam = searchParams.get('status');
    if (statusParam && statusParam !== statusFilter) {
      updateStatusFilter(statusParam);
    }
  }, [searchParams, statusFilter, updateStatusFilter]);

  useEffect(() => {
    setPage(0);
  }, [searchTerm, statusFilter]);

  const { data, isLoading, isError, error, refetch } = useAllBooks({
    page,
    size: 20,
    sort: sortValue,
  });

  const handleAddNew = () => {
    navigate(ROUTES.MANAGER_ADD_BOOK);
  };

  if (isError && !isLoading) {
    return (
      <PageContainer>
        <PageHeader>
          <Typography variant="h4" gutterBottom>
            Book Management
          </Typography>
        </PageHeader>
        <ErrorMessage
          message={(error as Error)?.message || 'Failed to load books'}
          severity="error"
        />
        <Button variant="contained" onClick={() => refetch()} sx={{ mt: 2 }}>
          Retry
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <HeaderContent>
          <div>
            <Typography variant="h4" gutterBottom>
              Book Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your book inventory
            </Typography>
          </div>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNew}>
            Add New Book
          </Button>
        </HeaderContent>
      </PageHeader>

      <FiltersContainer>
        <BooksFilters sortValue={sortValue} onSortChange={setSortValue} />
      </FiltersContainer>

      <TableWrapper>
        <BooksTable data={data} isLoading={isLoading} page={page} onPageChange={setPage} />
      </TableWrapper>
    </PageContainer>
  );
};
