import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from '@mui/material';
import { paymentMethods, type CheckoutShippingFormData } from '@schemas/checkoutSchemas';

interface PaymentMethodSectionProps {
  control: Control<CheckoutShippingFormData>;
  errors: FieldErrors<CheckoutShippingFormData>;
}

const paymentMethodLabels: Record<(typeof paymentMethods)[number], string> = {
  CREDIT_CARD: 'Credit Card',
  DEBIT_CARD: 'Debit Card',
  PAYPAL: 'PayPal',
};

export const PaymentMethodSection = ({ control, errors }: PaymentMethodSectionProps) => {
  return (
    <Controller
      name="paymentMethod"
      control={control}
      render={({ field }) => (
        <FormControl error={!!errors.paymentMethod} fullWidth>
          <FormLabel id="payment-method-label">Payment Method</FormLabel>
          <RadioGroup
            aria-labelledby="payment-method-label"
            {...field}
            onChange={e => field.onChange(e.target.value)}
          >
            {paymentMethods.map(method => (
              <FormControlLabel
                key={method}
                value={method}
                control={<Radio />}
                label={paymentMethodLabels[method]}
              />
            ))}
          </RadioGroup>
          {errors.paymentMethod && <FormHelperText>{errors.paymentMethod.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};
