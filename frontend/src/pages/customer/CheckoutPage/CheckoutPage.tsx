import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartStore } from '@store/cartStore';
import { useCurrentUser } from '@hooks/useCurrentUser';
import { useCreateOrder } from '@hooks/useCreateOrder';
import { useApplicableSeasonalDiscount } from '@hooks/useApplicableSeasonalDiscount';
import { parseAddress, formatCheckoutAddress } from '@utils/addressUtils';
import { calculateOrderTotals } from '@utils/orderCalculations';
import { checkoutShippingSchema, type CheckoutShippingFormData } from '@schemas/checkoutSchemas';
import { ShippingForm } from '@components/checkout/ShippingForm';
import { OrderReviewSection } from '@components/checkout/OrderReviewSection';
import { PaymentMethodSection } from '@components/checkout/PaymentMethodSection';
import { DiscountSelector } from '@components/checkout/DiscountSelector/DiscountSelector';
import { OrderSummary } from '@components/checkout/OrderSummary';
import { LoadingSpinner } from '@components/common/LoadingSpinner/LoadingSpinner';
import { ROUTES } from '@router/routes';
import type { CreateOrder, CreateOrderItem, DiscountType } from '@types';
import {
  OrderPageContainer,
  OrderContent,
  SectionCard,
} from '@components/common/OrderComponents/OrderComponents.sc';
import {
  FormContainer,
  EmptyCartContainer,
  EmptyCartIcon,
} from './CheckoutPage.sc';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCartStore();
  const { data: currentUser, isLoading: isLoadingUser } = useCurrentUser();
  const { mutate: createOrder, isPending } = useCreateOrder();

  const cartSubtotal = getTotalPrice();
  const { data: applicableSeasonalDiscount } = useApplicableSeasonalDiscount({
    cartSubtotal,
    cartBookIds: items.map(item => item.book.id!),
  });

  const [selectedDiscountType, setSelectedDiscountType] = useState<DiscountType>('none');

  useEffect(() => {
    if (applicableSeasonalDiscount) {
      setSelectedDiscountType('seasonal');
    } else if (currentUser?.loyaltyDiscountPercent && currentUser.loyaltyDiscountPercent > 0) {
      setSelectedDiscountType('loyalty');
    } else {
      setSelectedDiscountType('none');
    }
  }, [applicableSeasonalDiscount, currentUser]);

  const { subtotal, discountPercent, discountAmount, taxAmount, totalAmount, discountLabel } =
    calculateOrderTotals(
      cartSubtotal,
      selectedDiscountType,
      currentUser?.loyaltyDiscountPercent,
      applicableSeasonalDiscount?.percentage,
      applicableSeasonalDiscount?.name
    );

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
      format: (item.format || 'PHYSICAL').toLowerCase(),
    }));

    const orderData: CreateOrder = {
      items: orderItems,
      shippingAddress,
      paymentInfo: {
        method: formData.paymentMethod,
      },
      seasonalDiscountId:
        selectedDiscountType === 'seasonal' ? applicableSeasonalDiscount?.id : undefined,
    };

    createOrder(orderData);
  };

  if (isLoadingUser) {
    return <LoadingSpinner />;
  }

  if (items.length === 0) {
    return (
      <OrderPageContainer>
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
      </OrderPageContainer>
    );
  }

  return (
    <OrderPageContainer>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Complete your purchase
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <OrderContent>
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

            <SectionCard>
              <Typography variant="h6" gutterBottom>
                Apply Discount
              </Typography>
              <DiscountSelector
                selectedType={selectedDiscountType}
                onTypeChange={setSelectedDiscountType}
                loyaltyDiscountPercent={currentUser?.loyaltyDiscountPercent}
                seasonalDiscount={applicableSeasonalDiscount || undefined}
                cartSubtotal={cartSubtotal}
              />
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
            discountLabel={discountLabel}
          />
        </OrderContent>
      </form>
    </OrderPageContainer>
  );
};
