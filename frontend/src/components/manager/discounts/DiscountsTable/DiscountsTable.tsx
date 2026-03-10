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
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as ActivateIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import type { PageSeasonalDiscount, SeasonalDiscount } from '@types';
import { DISCOUNT_SCOPE } from '@types';
import { getDiscountStatus } from '@utils/discountUtils';
import { formatDateNumeric } from '@utils/formatters';
import {
  StyledTableContainer,
  StyledTableCell,
  EmptyStateContainer,
  PaginationContainer,
} from '@layout/manager/ManagerTableLayout.sc';

interface DiscountsTableProps {
  data?: PageSeasonalDiscount;
  isLoading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  onEdit: (discount: SeasonalDiscount) => void;
  onActivate: (discountId: string) => void;
  onDeactivate: (discountId: string) => void;
  onDelete: (discountId: string, discountName: string) => void;
  onAddNew: () => void;
}

export const DiscountsTable = ({
  data,
  isLoading,
  page,
  onPageChange,
  onEdit,
  onActivate,
  onDeactivate,
  onDelete,
  onAddNew,
}: DiscountsTableProps) => {
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
              <StyledTableCell>Percentage</StyledTableCell>
              <StyledTableCell>Valid Period</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Scope</StyledTableCell>
              <StyledTableCell>Usage</StyledTableCell>
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
                  <Skeleton width={60} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={200} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={80} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={120} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={80} />
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

  const discounts = data?.content || [];
  const totalPages = data?.page?.totalPages || 0;

  if (discounts.length === 0) {
    return (
      <StyledTableContainer>
        <EmptyStateContainer>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            No discounts found
          </Typography>
          <Button variant="contained" onClick={onAddNew} startIcon={<AddIcon />} sx={{ mt: 2 }}>
            Add New Discount
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
            <StyledTableCell>Percentage</StyledTableCell>
            <StyledTableCell>Valid Period</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Scope</StyledTableCell>
            <StyledTableCell>Usage</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {discounts.map(discount => {
            const status = getDiscountStatus(discount);
            return (
              <TableRow key={discount.id} hover>
                <StyledTableCell>
                  <Tooltip title={discount.description || ''} arrow placement="top">
                    <Typography variant="body2" fontWeight={600}>
                      {discount.name}
                    </Typography>
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2">{discount.percentage}%</Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2">
                    {formatDateNumeric(discount.validFrom)} - {formatDateNumeric(discount.validTo)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Chip
                    label={status}
                    size="small"
                    color={
                      status === 'ACTIVE' ? 'success' : status === 'EXPIRED' ? 'warning' : 'default'
                    }
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2">
                    {discount.scopeType === DISCOUNT_SCOPE.ALL_BOOKS ? 'All Books' : 'Specific Books'}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2">
                    {discount.maxUsageCount
                      ? `${discount.currentUsageCount || 0} / ${discount.maxUsageCount}`
                      : 'Unlimited'}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => onEdit(discount)}
                    disabled={!discount.id}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                  {status === 'INACTIVE' && (
                    <IconButton
                      size="small"
                      color="success"
                      onClick={() => discount.id && onActivate(discount.id)}
                      disabled={!discount.id}
                      sx={{ ml: 1 }}
                    >
                      <ActivateIcon fontSize="small" />
                    </IconButton>
                  )}
                  {status === 'ACTIVE' && (
                    <IconButton
                      size="small"
                      color="warning"
                      onClick={() => discount.id && onDeactivate(discount.id)}
                      disabled={!discount.id}
                      sx={{ ml: 1 }}
                    >
                      <BlockIcon fontSize="small" />
                    </IconButton>
                  )}
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => discount.id && discount.name && onDelete(discount.id, discount.name)}
                    disabled={!discount.id || !discount.name}
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
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
