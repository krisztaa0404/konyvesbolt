import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FormRow } from '@pages/customer/CheckoutPage/CheckoutPage.sc';
import type { CheckoutShippingFormData } from '@schemas/checkoutSchemas';

interface ShippingFormProps {
  control: Control<CheckoutShippingFormData>;
  errors: FieldErrors<CheckoutShippingFormData>;
}

export const ShippingForm = ({ control, errors }: ShippingFormProps) => {
  return (
    <>
      <FormRow>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="First Name"
              type="text"
              fullWidth
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              autoComplete="given-name"
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Last Name"
              type="text"
              fullWidth
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              autoComplete="family-name"
            />
          )}
        />
      </FormRow>

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Phone Number"
            type="tel"
            fullWidth
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            autoComplete="tel"
          />
        )}
      />

      <Controller
        name="street"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Street Address"
            type="text"
            fullWidth
            error={!!errors.street}
            helperText={errors.street?.message}
            autoComplete="street-address"
          />
        )}
      />

      <FormRow>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="City"
              type="text"
              fullWidth
              error={!!errors.city}
              helperText={errors.city?.message}
              autoComplete="address-level2"
            />
          )}
        />
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="State/Province"
              type="text"
              fullWidth
              error={!!errors.state}
              helperText={errors.state?.message}
              autoComplete="address-level1"
            />
          )}
        />
      </FormRow>

      <FormRow>
        <Controller
          name="postalCode"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Postal Code"
              type="text"
              fullWidth
              error={!!errors.postalCode}
              helperText={errors.postalCode?.message}
              autoComplete="postal-code"
            />
          )}
        />
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Country"
              type="text"
              fullWidth
              error={!!errors.country}
              helperText={errors.country?.message}
              autoComplete="country-name"
            />
          )}
        />
      </FormRow>
    </>
  );
};
