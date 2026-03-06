import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Typography,
  Button,
  Skeleton,
  Pagination,
  Chip,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { formatCurrency } from '@utils/formatters';
import { getManagerEditBookRoute, ROUTES } from '@router/routes';
import type { PageBook } from '@types';
import {
  StyledTableContainer,
  StyledTableCell,
  EmptyStateContainer,
  PaginationContainer,
  StockIndicator,
} from './BooksTable.sc';

const LOW_STOCK_THRESHOLD = 10;

interface BooksTableProps {
  data?: PageBook;
  isLoading: boolean;
  page: number;
  onPageChange: (page: number) => void;
}

export const BooksTable = ({ data, isLoading, page, onPageChange }: BooksTableProps) => {
  const navigate = useNavigate();

  const handleEdit = (bookId: string) => {
    navigate(getManagerEditBookRoute(bookId));
  };

  const handleAddNew = () => {
    navigate(ROUTES.MANAGER_ADD_BOOK);
  };

  const handlePaginationChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value - 1);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', color: 'error' as const };
    if (stock <= LOW_STOCK_THRESHOLD) return { label: 'Low Stock', color: 'warning' as const };
    return { label: 'In Stock', color: 'success' as const };
  };

  if (isLoading) {
    return (
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Authors</StyledTableCell>
              <StyledTableCell>ISBN</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Stock</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
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
                  <Skeleton width={140} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={120} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Skeleton width={70} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Skeleton width={50} />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Skeleton width={90} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Skeleton width={80} />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    );
  }

  const books = data?.content || [];
  const totalPages = data?.page?.totalPages || 0;

  if (books.length === 0) {
    return (
      <StyledTableContainer>
        <EmptyStateContainer>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            No books found
          </Typography>
          <Button variant="contained" onClick={handleAddNew} sx={{ mt: 2 }}>
            Add New Book
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
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Authors</StyledTableCell>
            <StyledTableCell>ISBN</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Stock</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map(book => {
            const stockStatus = getStockStatus(book.stockQuantity || 0);
            return (
              <TableRow key={book.id} hover>
                <StyledTableCell>
                  <Typography variant="body2" fontWeight={600}>
                    {book.title}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2">{book.authors || 'N/A'}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {book.isbn || 'N/A'}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Typography variant="body2" fontWeight={600}>
                    {formatCurrency(book.price || 0)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <StockIndicator low={(book?.stockQuantity ?? 0) <= LOW_STOCK_THRESHOLD}>
                    {book.stockQuantity || 0}
                  </StockIndicator>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Chip label={stockStatus.label} color={stockStatus.color} size="small" />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => book.id && handleEdit(book.id)}
                    disabled={!book.id}
                  >
                    Edit
                  </Button>
                </StyledTableCell>
              </TableRow>
            );
          })}
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
