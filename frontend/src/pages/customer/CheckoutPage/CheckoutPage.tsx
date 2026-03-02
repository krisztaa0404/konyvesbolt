import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartStore } from '@store/cartStore';
import { useCurrentUser } from '@hooks/useCurrentUser';
import { useCreateOrder } from '@hooks/useCreateOrder';
import { parseAddress, formatCheckoutAddress } from '@utils/addressUtils';
import { calculateOrderTotals } from '@utils/orderCalculations';
import { checkoutShippingSchema, type CheckoutShippingFormData } from '@schemas/checkoutSchemas';
import { ShippingForm } from '@components/checkout/ShippingForm';
import { OrderReviewSection } from '@components/checkout/OrderReviewSection';
import { PaymentMethodSection } from '@components/checkout/PaymentMethodSection';
import { OrderSummary } from '@components/checkout/OrderSummary';
import { LoadingSpinner } from '@components/common/LoadingSpinner/LoadingSpinner';
import { ROUTES } from '@router/routes';
import type { CreateOrder, CreateOrderItem } from '@types';
import {
  CheckoutContainer,
  CheckoutContent,
  FormContainer,
  SectionCard,
  EmptyCartContainer,
  EmptyCartIcon,
} from './CheckoutPage.sc';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCartStore();
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();
  const { mutate: createOrder, isPending } = useCreateOrder();

  const cartSubtotal = getTotalPrice();
  const { subtotal, discountPercent, discountAmount, taxAmount, totalAmount } =
    calculateOrderTotals(cartSubtotal, currentUser?.loyaltyDiscountPercent);

  const parsedAddress = currentUser ? parseAddress(currentUser.addressData) : null;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CheckoutShippingFormData>({
    resolver: zodResolver(checkoutShippingSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
      paymentMethod: undefined,
    },
  });

  useEffect(() => {
    if (currentUser && parsedAddress) {
      reset({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        phoneNumber: currentUser.phone || '',
        street: parsedAddress.street || '',
        city: parsedAddress.city || '',
        state: parsedAddress.state || '',
        postalCode: parsedAddress.postalCode || '',
        country: parsedAddress.country || 'United States',
        paymentMethod: undefined,
      });
    }
  }, [currentUser, parsedAddress, reset]);

  const onSubmit = (formData: CheckoutShippingFormData) => {
    const shippingAddress = formatCheckoutAddress(formData);

    const orderItems: CreateOrderItem[] = items.map(item => ({
      bookId: item.book.id!,
      quantity: item.quantity,
      format: item.format || 'PHYSICAL',
    }));

    const orderData: CreateOrder = {
      items: orderItems,
      shippingAddress,
    };

    createOrder(orderData);
  };

  if (isLoadingUser) {
    return <LoadingSpinner />;
  }

  if (items.length === 0) {
    return (
      <CheckoutContainer>
        <EmptyCartContainer>
          <EmptyCartIcon>
            <ShoppingCartIcon fontSize="inherit" />
          </EmptyCartIcon>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Add some books to your cart before checking out.
          </Typography>
          <Button variant="contained" onClick={() => navigate(ROUTES.HOME)}>
            Continue Shopping
          </Button>
        </EmptyCartContainer>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Complete your purchase
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CheckoutContent>
          <FormContainer>
            <SectionCard>
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>
              <ShippingForm control={control} errors={errors} />
            </SectionCard>

            <SectionCard>
              <Typography variant="h6" gutterBottom>
                Order Review
              </Typography>
              <OrderReviewSection items={items} />
            </SectionCard>

            <SectionCard>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <PaymentMethodSection control={control} errors={errors} />
            </SectionCard>
          </FormContainer>

          <OrderSummary
            subtotal={subtotal}
            discountAmount={discountAmount}
            taxAmount={taxAmount}
            totalAmount={totalAmount}
            isValid={isValid}
            isPending={isPending}
            hasDiscount={discountPercent > 0}
          />
        </CheckoutContent>
      </form>
    </CheckoutContainer>
  );
};
