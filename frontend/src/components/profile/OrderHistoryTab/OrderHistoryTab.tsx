import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Pagination } from '@mui/material';
import { ShoppingBag } from '@mui/icons-material';
import { useMyOrders } from '@hooks/useMyOrders';
import { LoadingSpinner } from '@components/common/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { formatCurrency, formatDateLong, formatOrderId } from '@utils/formatters';
import { ROUTES } from '@router/routes';
import {
  OrdersContainer,
  OrderCard,
  OrderHeader,
  OrderInfo,
  OrderMeta,
  StatusChip,
  EmptyState,
  PaginationContainer,
} from './OrderHistoryTab.sc';

export const OrderHistoryTab = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const { data, isLoading, isError, error } = useMyOrders(page, pageSize);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorMessage message={error?.message || 'Failed to load orders'} severity="error" />;
  }

  if (!data || !data.content || data.content.length === 0) {
    return (
      <EmptyState>
        <ShoppingBag sx={{ fontSize: 64, color: 'text.secondary' }} />
        <Typography variant="h6" color="text.secondary">
          No orders yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start shopping to see your orders here
        </Typography>
        <Button variant="contained" onClick={() => navigate(ROUTES.BROWSE_BOOKS)} sx={{ mt: 2 }}>
          Start Shopping
        </Button>
      </EmptyState>
    );
  }

  const handleViewDetails = (orderId: string) => {
    navigate(ROUTES.ORDER_CONFIRMATION.replace(':orderId', orderId));
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1); // Convert from 1-indexed to 0-indexed
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Order History
      </Typography>

      <OrdersContainer>
        {data?.content?.map((order, index) => (
          <OrderCard key={order.id || `order-${index}`}>
            <OrderHeader>
              <OrderInfo>
                <Typography variant="subtitle1" fontWeight={600}>
                  {formatOrderId(order.id)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {formatDateLong(order.orderDate)}
                </Typography>
              </OrderInfo>
              <StatusChip $status={order.status ?? 'PENDING'} label={order.status} size="small" />
            </OrderHeader>

            <OrderMeta>
              <Typography variant="body2">
                Total: <strong>{formatCurrency(order.totalAmount)}</strong>
              </Typography>
              {(order.discountAmount ?? 0) > 0 && (
                <Typography variant="body2" color="success.main">
                  Discount: -{formatCurrency(order.discountAmount)}
                </Typography>
              )}
              <Button
                size="small"
                variant="outlined"
                onClick={() => order.id && handleViewDetails(order.id)}
                disabled={!order.id}
              >
                View Details
              </Button>
            </OrderMeta>
          </OrderCard>
        ))}
      </OrdersContainer>

      {(data.totalPages ?? 0) > 1 && (
        <PaginationContainer>
          <Pagination
            count={data.totalPages}
            page={page + 1} // Convert to 1-indexed for display
            onChange={handlePageChange}
            color="primary"
          />
        </PaginationContainer>
      )}
    </>
  );
};
