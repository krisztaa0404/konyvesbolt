import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Breadcrumbs, Link, Button } from '@mui/material';
import { useManagerOrderById } from '@hooks/useManagerOrderById';
import { useUpdateOrderStatus } from '@hooks/useUpdateOrderStatus';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { OrderDetailSkeleton } from '@components/manager/orders/OrderDetailSkeleton';
import { OrderInformationCard } from '@components/manager/orders/OrderInformationCard';
import { CustomerShippingCard } from '@components/manager/orders/CustomerShippingCard';
import { OrderItemsList } from '@components/manager/orders/OrderItemsList';
import { PaymentInfoCard } from '@components/manager/orders/PaymentInfoCard';
import { OrderSummaryCard } from '@components/manager/orders/OrderSummaryCard';
import { OrderStatusManagement } from '@components/manager/orders/OrderStatusManagement';
import { ROUTES } from '@router/routes';
import { OrderStatus } from '@types';
import { formatOrderId } from '@utils/formatters';
import { calculateOrderItemsSubtotal, calculateTaxAmount } from '@utils/orderCalculations';
import {
  PageContainer,
  PageHeader,
  DetailsGrid,
  LeftColumn,
  RightColumn,
  ActionButtons,
} from './OrderDetailPage.sc';

export const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: order, isLoading, isError, error, refetch } = useManagerOrderById(id);
  const updateStatusMutation = useUpdateOrderStatus();

  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    if (!id) return;
    await updateStatusMutation.mutateAsync({
      orderId: id,
      status: newStatus,
    });
  };

  const handleBackToOrders = () => {
    navigate(ROUTES.MANAGER_ORDERS);
  };

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (isError || !order) {
    return (
      <PageContainer>
        <ErrorMessage
          title="Error Loading Order"
          message={error?.message || 'Failed to load order details'}
        />
        <ActionButtons>
          <Button variant="outlined" onClick={() => refetch()}>
            Retry
          </Button>
          <Button variant="contained" onClick={handleBackToOrders}>
            Back to Orders
          </Button>
        </ActionButtons>
      </PageContainer>
    );
  }

  const subtotal = calculateOrderItemsSubtotal(order.items);
  const discountAmount = order.discountAmount || 0;
  const taxAmount = calculateTaxAmount(subtotal, discountAmount);
  const itemCount = order.items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

  return (
    <PageContainer>
      <PageHeader>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link component="button" underline="hover" color="inherit" onClick={handleBackToOrders}>
            Orders
          </Link>
          <Typography color="text.primary">{formatOrderId(order.id)}</Typography>
        </Breadcrumbs>
        <Typography variant="h4" component="h1">
          {formatOrderId(order.id)}
        </Typography>
      </PageHeader>

      <DetailsGrid>
        <LeftColumn>
          <OrderInformationCard
            orderId={order.id}
            orderDate={order.orderDate}
            status={order.status}
            updatedAt={order.updatedAt}
            customerName={`${order.user?.firstName} ${order.user?.lastName}`}
            customerEmail={order.user?.email}
          />

          <CustomerShippingCard user={order.user} shippingAddress={order.shippingAddress} />

          <OrderItemsList items={order.items} />

          <PaymentInfoCard paymentInfo={order.paymentInfo} />
        </LeftColumn>

        <RightColumn>
          <OrderSummaryCard
            subtotal={subtotal}
            discountAmount={discountAmount}
            taxAmount={taxAmount}
            totalAmount={order.totalAmount || 0}
            itemCount={itemCount}
          />

          <OrderStatusManagement
            currentStatus={order.status as OrderStatus}
            onStatusUpdate={handleStatusUpdate}
            isUpdating={updateStatusMutation.isPending}
          />

          <ActionButtons>
            <Button variant="outlined" fullWidth onClick={handleBackToOrders}>
              Back to Orders
            </Button>
          </ActionButtons>
        </RightColumn>
      </DetailsGrid>
    </PageContainer>
  );
};
