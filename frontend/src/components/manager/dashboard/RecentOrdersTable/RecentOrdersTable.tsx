import { useNavigate } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, Typography, Button, Skeleton } from '@mui/material';
import { StatusChip } from '@components/common/StatusChip';
import { formatCurrency, formatDate, formatOrderId } from '@utils/formatters';
import { getManagerOrderDetailRoute } from '@router/routes';
import type { Order } from '@types';
import {
  StyledTableContainer,
  StyledTableCell,
  EmptyStateContainer,
} from '@layout/manager/ManagerTableLayout.sc';

interface RecentOrdersTableProps {
  orders: Order[];
  isLoading: boolean;
}

export const RecentOrdersTable = ({ orders, isLoading }: RecentOrdersTableProps) => {
  const navigate = useNavigate();

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
            {Array.from({ length: 5 }).map((_, index) => (
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

  if (!orders || orders.length === 0) {
    return (
      <StyledTableContainer>
        <EmptyStateContainer>
          <Typography variant="body1" color="text.secondary">
            No recent orders
          </Typography>
        </EmptyStateContainer>
      </StyledTableContainer>
    );
  }

  const handleViewDetails = (orderId: string) => {
    navigate(getManagerOrderDetailRoute(orderId));
  };

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
    </StyledTableContainer>
  );
};
