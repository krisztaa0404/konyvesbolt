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
} from '@mui/material';
import { StatusChip } from '@components/common/StatusChip';
import { formatCurrency, formatDate, formatOrderId } from '@utils/formatters';
import { getManagerOrderDetailRoute } from '@router/routes';
import type { PageOrder } from '@types';
import {
  StyledTableContainer,
  StyledTableCell,
  EmptyStateContainer,
  PaginationContainer,
} from '@layout/manager/ManagerTableLayout.sc';

interface OrdersTableProps {
  data?: PageOrder;
  isLoading: boolean;
  page: number;
  onPageChange: (page: number) => void;
}

export const OrdersTable = ({ data, isLoading, page, onPageChange }: OrdersTableProps) => {
  const navigate = useNavigate();

  const handleViewDetails = (orderId: string) => {
    navigate(getManagerOrderDetailRoute(orderId));
  };

  const handlePaginationChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value - 1);
  };

  if (isLoading) {
    return (
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell>Customer</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="right">Total</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <StyledTableCell>
                  <Skeleton width={100} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={120} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={100} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={80} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Skeleton width={70} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Skeleton width={100} />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    );
  }

  const orders = data?.content || [];
  const totalPages = data?.page?.totalPages || 0;

  if (orders.length === 0) {
    return (
      <StyledTableContainer>
        <EmptyStateContainer>
          <Typography variant="body1" color="text.secondary">
            No orders found
          </Typography>
        </EmptyStateContainer>
      </StyledTableContainer>
    );
  }

  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Order ID</StyledTableCell>
            <StyledTableCell>Customer</StyledTableCell>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(order => (
            <TableRow key={order.id} hover>
              <StyledTableCell>
                <Typography variant="body2" fontWeight={600}>
                  {formatOrderId(order.id)}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="body2">{order.userEmail || 'N/A'}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="body2">{formatDate(order.orderDate)}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <StatusChip status={order.status ?? 'PENDING'} size="small" />
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography variant="body2" fontWeight={600}>
                  {formatCurrency(order.totalAmount)}
                </Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => order.id && handleViewDetails(order.id)}
                  disabled={!order.id}
                >
                  View Details
                </Button>
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
