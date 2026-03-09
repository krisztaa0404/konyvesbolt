import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { TextField, InputAdornment } from '@mui/material';
import { FormSection, SectionTitle, FormRow } from '@layout/manager/BookFormLayout.sc';
import type { CreateBookFormData } from '@schemas/bookSchemas';

interface BookPricingSectionProps {
  control: Control<CreateBookFormData>;
  errors: FieldErrors<CreateBookFormData>;
  disabled?: boolean;
}

export const BookPricingSection = ({ control, errors, disabled }: BookPricingSectionProps) => {
  return (
    <FormSection>
      <SectionTitle>Pricing & Inventory</SectionTitle>

      <FormRow>
        <Controller
          name="price"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <TextField
              {...field}
              value={value || ''}
              onChange={e => {
                const val = e.target.value ? parseFloat(e.target.value) : 0;
                onChange(val);
              }}
              label="Price *"
              type="number"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              inputProps={{
                step: '0.01',
                min: '0',
              }}
              error={!!errors.price}
              helperText={errors.price?.message}
              disabled={disabled}
            />
          )}
        />

        <Controller
          name="stockQuantity"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <TextField
              {...field}
              value={value || ''}
              onChange={e => {
                const val = e.target.value ? parseInt(e.target.value, 10) : 0;
                onChange(val);
              }}
              label="Stock Quantity *"
              type="number"
              fullWidth
              inputProps={{
                min: '0',
              }}
              error={!!errors.stockQuantity}
              helperText={errors.stockQuantity?.message}
              disabled={disabled}
            />
          )}
        />
      </FormRow>
    </FormSection>
  );
};
