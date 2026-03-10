import { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useShallow } from 'zustand/react/shallow';
import { useAllGenres } from '@hooks/useAllGenres';
import { useDeleteGenre } from '@hooks/useDeleteGenre';
import { useGenreFilterStore } from '@store/manager/managerFilterStore';
import { GenresFilters } from '@components/manager/genres/GenresFilters';
import { GenresTable } from '@components/manager/genres/GenresTable';
import { GenreFormDialog } from '@components/manager/genres/GenreFormDialog';
import { DeleteGenreDialog } from '@components/manager/genres/DeleteGenreDialog';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import type { Genre } from '@types';
import {
  PageContainer,
  PageHeader,
  HeaderContent,
  FiltersContainer,
  TableWrapper,
} from '@layout/manager/ManagerPageLayout.sc';

export const ManageGenresPage = () => {
  const [page, setPage] = useState(0);
  const [sortValue, setSortValue] = useState('name,asc');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [genreToDelete, setGenreToDelete] = useState<{ id: string; name: string } | null>(null);

  const { searchTerm } = useGenreFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
    }))
  );

  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  const { data, isLoading, isError, error, refetch } = useAllGenres({
    page,
    size: 20,
    sort: sortValue,
  });

  const deleteGenre = useDeleteGenre();

  const handleAddNew = () => {
    setSelectedGenre(null);
    setDialogOpen(true);
  };

  const handleEdit = (genre: Genre) => {
    setSelectedGenre(genre);
    setDialogOpen(true);
  };

  const handleDelete = (genreId: string, genreName: string) => {
    setGenreToDelete({ id: genreId, name: genreName });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (genreToDelete) {
      deleteGenre.mutate(genreToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setGenreToDelete(null);
        },
      });
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedGenre(null);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setGenreToDelete(null);
  };

  if (isError && !isLoading) {
    return (
      <PageContainer>
        <PageHeader>
          <Typography variant="h4" gutterBottom>
            Genre Management
          </Typography>
        </PageHeader>
        <ErrorMessage
          message={(error as Error)?.message || 'Failed to load genres'}
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
              Genre Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage book genres and categories
            </Typography>
          </div>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNew}>
            Add New Genre
          </Button>
        </HeaderContent>
      </PageHeader>

      <FiltersContainer>
        <GenresFilters sortValue={sortValue} onSortChange={setSortValue} />
      </FiltersContainer>

      <TableWrapper>
        <GenresTable
          data={data}
          isLoading={isLoading}
          page={page}
          onPageChange={setPage}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAddNew={handleAddNew}
        />
      </TableWrapper>

      <GenreFormDialog open={dialogOpen} onClose={handleCloseDialog} genre={selectedGenre} />

      <DeleteGenreDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        genreName={genreToDelete?.name || ''}
        isPending={deleteGenre.isPending}
      />
    </PageContainer>
  );
};
