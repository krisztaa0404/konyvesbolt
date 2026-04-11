import { useState } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Chip,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Typography,
  Box,
} from '@mui/material';
import {
  StyledTableContainer,
  StyledTableCell,
  PaginationContainer,
} from '@layout/manager/ManagerTableLayout.sc';
import type { SkippedRow } from '@types';

interface SkippedRowsTableProps {
  skippedRows: SkippedRow[];
}

const ROWS_PER_PAGE = 10;

export const SkippedRowsTable = ({ skippedRows }: SkippedRowsTableProps) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(skippedRows.length / ROWS_PER_PAGE);
  const startIndex = (page - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const currentRows = skippedRows.slice(startIndex, endIndex);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box>
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Row #</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>ISBN</StyledTableCell>
              <StyledTableCell>Reason</StyledTableCell>
              <StyledTableCell>Missing Genres</StyledTableCell>
              <StyledTableCell>Validation Errors</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map(row => (
              <TableRow key={row.rowNumber}>
                <StyledTableCell>
                  <Typography variant="body2" fontWeight={500}>
                    {row.rowNumber}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2">{row.bookTitle || '-'}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2">{row.isbn || '-'}</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" color="error">
                    {row.reason}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  {row.missingGenres && row.missingGenres.length > 0 ? (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {row.missingGenres.map((genre, index) => (
                        <Chip
                          key={index}
                          label={genre}
                          size="small"
                          color="secondary"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      -
                    </Typography>
                  )}
                </StyledTableCell>
                <StyledTableCell>
                  {row.validationErrors && row.validationErrors.length > 0 ? (
                    <List dense disablePadding sx={{ maxWidth: 300 }}>
                      {row.validationErrors.map((error, index) => (
                        <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                          <ListItemText
                            primary={error}
                            primaryTypographyProps={{
                              variant: 'caption',
                              color: 'error',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      -
                    </Typography>
                  )}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {totalPages > 1 && (
          <PaginationContainer>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </PaginationContainer>
        )}
      </StyledTableContainer>
    </Box>
  );
};
