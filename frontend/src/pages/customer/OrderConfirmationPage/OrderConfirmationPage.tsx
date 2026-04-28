import { Typography, Button, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useOrderById } from '@hooks/useOrderById';
import { parseAddress } from '@utils/addressUtils';
import {
  formatCurrency,
  formatDateLong,
  formatOrderId,
  formatPaymentMethod,
} from '@utils/formatters';
import { calculateOrderItemsSubtotal, calculateTaxAmount } from '@utils/orderCalculations';
import { LoadingSpinner } from '@components/common/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { StatusChip } from '@components/common/StatusChip';
import {
  OrderPageContainer,
  OrderContent,
  SectionCard,
  OrderItem,
  ItemImage,
  ItemDetails,
  SummaryRow,
  TotalRow,
} from '@layout/customer/OrderLayout.sc';
import {
  SuccessAlert,
  DetailsContainer,
  SummaryContainer,
  OrderInfoRow,
  AddressBlock,
} from './OrderConfirmationPage.sc';
import { ROUTES } from '@router/routes';

export const OrderConfirmationPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: order, isLoading, isError, error } = useOrderById(id);

  // Only show success message when coming from checkout
  const fromCheckout = location.state?.fromCheckout === true;

  if (isLoading) {
    return <LoadingSpinner fullPage />;
  }

  if (isError || !order) {
    return (
      <OrderPageContainer>
        <ErrorMessage
          message={error?.message || 'Failed to load order details. Please try again.'}
        />
        <Button
          variant="contained"
          onClick={() => navigate(ROUTES.PROFILE)}
          sx={{ mt: 2, maxWidth: 300 }}
        >
          Back to Profile
        </Button>
      </OrderPageContainer>
    );
  }

  const shippingAddress = parseAddress(order.shippingAddress);

  const subtotal = calculateOrderItemsSubtotal(order.items);
  const taxAmount = calculateTaxAmount(subtotal, order.discountAmount || 0);

  return (
    <OrderPageContainer>
      {fromCheckout && (
        <SuccessAlert icon={<CheckCircleIcon fontSize="inherit" />} severity="success">
          Order placed successfully! Thank you for your purchase.
        </SuccessAlert>
      )}

      <OrderContent>
        <DetailsContainer>
          <SectionCard>
            <Typography variant="h6" gutterBottom>
              Order Information
            </Typography>
            <Divider />
            <OrderInfoRow>
              <Typography variant="body2" color="text.secondary">
                Order Number
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {formatOrderId(order.id)}
              </Typography>
            </OrderInfoRow>
            <OrderInfoRow>
              <Typography variant="body2" color="text.secondary">
                Order Date
              </Typography>
              <Typography variant="body1">{formatDateLong(order.orderDate)}</Typography>
            </OrderInfoRow>
            <OrderInfoRow>
              <Typography variant="body2" color="text.secondary">
                Status
              </Typography>
              <StatusChip status={order.status || 'PENDING'} size="small" />
            </OrderInfoRow>
          </SectionCard>

          <SectionCard>
            <Typography variant="h6" gutterBottom>
              Shipping Address
            </Typography>
            <Divider />
            {shippingAddress ? (
              <AddressBlock>
                {order.user && (
                  <Typography variant="body1">
                    {order.user.firstName} {order.user.lastName}
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  {shippingAddress.street}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.postalCode}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {shippingAddress.country}
                </Typography>
                {shippingAddress.phone && (
                  <Typography variant="body2" color="text.secondary">
                    Phone: {shippingAddress.phone}
                  </Typography>
                )}
              </AddressBlock>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No shipping address available
              </Typography>
            )}
          </SectionCard>

          <SectionCard>
            <Typography variant="h6" gutterBottom>
              Order Items
            </Typography>
            <Divider />
            {order.items && order.items.length > 0 ? (
              order.items.map((item, index) => {
                const itemSubtotal = (item.priceAtOrder || 0) * (item.quantity || 0);
                const authors = item.book?.authors?.join(', ') || 'Unknown Author(s)';

                return (
                  <OrderItem key={`${item.book?.id}-${item.format || 'default'}-${index}`}>
                    <ItemImage
                      src={item.book?.coverImageUrl || '/placeholder.png'}
                      alt={item.book?.title || 'Book'}
                    />

                    <ItemDetails>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {item.book?.title || 'Unknown Title'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {authors}
                      </Typography>
                      {item.format && (
                        <Typography variant="body2" color="text.secondary">
                          Format: {item.format}
                        </Typography>
                      )}
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity || 0}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: {formatCurrency(item.priceAtOrder || 0)}
                      </Typography>
                    </ItemDetails>

                    <Typography variant="subtitle2" fontWeight="bold">
                      {formatCurrency(itemSubtotal)}
                    </Typography>
                  </OrderItem>
                );
              })
            ) : (
              <Typography variant="body2" color="text.secondary">
                No items found
              </Typography>
            )}
          </SectionCard>
        </DetailsContainer>

        <SummaryContainer>
          <SectionCard>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider />
            <SummaryRow>
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2">{formatCurrency(subtotal)}</Typography>
            </SummaryRow>

            {(order.discountAmount ?? 0) > 0 && (
              <SummaryRow>
                <Typography variant="body2" color="success.main">
                  Discount
                </Typography>
                <Typography variant="body2" color="success.main">
                  -{formatCurrency(order.discountAmount)}
                </Typography>
              </SummaryRow>
            )}

            <SummaryRow>
              <Typography variant="body2">Tax (8%)</Typography>
              <Typography variant="body2">{formatCurrency(taxAmount)}</Typography>
            </SummaryRow>

            <TotalRow>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">{formatCurrency(order.totalAmount)}</Typography>
            </TotalRow>
          </SectionCard>

          <SectionCard>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            <Divider />
            <Typography variant="body2" color="text.secondary">
              Payment Method: {formatPaymentMethod(order.paymentInfo?.method)}
            </Typography>
          </SectionCard>

          <SectionCard>
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate(ROUTES.BROWSE_BOOKS)}
            >
              Continue Shopping
            </Button>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => navigate(ROUTES.PROFILE_ORDERS)}
            >
              View Order History
            </Button>
          </SectionCard>
        </SummaryContainer>
      </OrderContent>
    </OrderPageContainer>
  );
};
