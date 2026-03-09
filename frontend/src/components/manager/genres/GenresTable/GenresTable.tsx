import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Typography,
  Button,
  Skeleton,
  Pagination,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Add as AddIcon } from '@mui/icons-material';
import type { PageGenre, Genre } from '@types';
import {
  StyledTableContainer,
  StyledTableCell,
  EmptyStateContainer,
  PaginationContainer,
} from './GenresTable.sc';

interface GenresTableProps {
  data?: PageGenre;
  isLoading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  onEdit: (genre: Genre) => void;
  onDelete: (genreId: string, genreName: string) => void;
  onAddNew: () => void;
}

export const GenresTable = ({
  data,
  isLoading,
  page,
  onPageChange,
  onEdit,
  onDelete,
  onAddNew,
}: GenresTableProps) => {
  const handlePaginationChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value - 1);
  };

  if (isLoading) {
    return (
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <StyledTableCell>
                  <Skeleton width={180} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={300} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Skeleton width={120} />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    );
  }

  const genres = data?.content || [];
  const totalPages = data?.page?.totalPages || 0;

  if (genres.length === 0) {
    return (
      <StyledTableContainer>
        <EmptyStateContainer>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            No genres found
          </Typography>
          <Button variant="contained" onClick={onAddNew} startIcon={<AddIcon />} sx={{ mt: 2 }}>
            Add New Genre
          </Button>
        </EmptyStateContainer>
      </StyledTableContainer>
    );
  }

  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {genres.map(genre => (
            <TableRow key={genre.id} hover>
              <StyledTableCell>
                <Typography variant="body2" fontWeight={600}>
                  {genre.name}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="body2">
                  {genre.description
                    ? genre.description.length > 150
                      ? `${genre.description.substring(0, 150)}...`
                      : genre.description
                    : '—'}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => onEdit(genre)}
                  disabled={!genre.id}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => genre.id && genre.name && onDelete(genre.id, genre.name)}
                  disabled={!genre.id || !genre.name}
                  sx={{ ml: 1 }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={handlePaginationChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </PaginationContainer>
      )}
    </StyledTableContainer>
  );
};
