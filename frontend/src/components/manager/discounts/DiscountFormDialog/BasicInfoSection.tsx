import { TextField } from '@mui/material';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { CreateDiscountFormData, UpdateDiscountFormData } from '@schemas/discountSchemas';
import { FieldContainer } from './DiscountFormDialog.sc';

interface BasicInfoSectionProps {
  control: Control<CreateDiscountFormData | UpdateDiscountFormData>;
  errors: FieldErrors<CreateDiscountFormData | UpdateDiscountFormData>;
  isPending: boolean;
}

export const BasicInfoSection = ({ control, errors, isPending }: BasicInfoSectionProps) => {
  return (
    <>
      <FieldContainer>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              required
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
              disabled={isPending}
            />
          )}
        />
      </FieldContainer>

      <FieldContainer>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              multiline
              rows={2}
              error={!!errors.description}
              helperText={errors.description?.message}
              disabled={isPending}
              value={field.value || ''}
            />
          )}
        />
      </FieldContainer>

      <FieldContainer>
        <Controller
          name="percentage"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Percentage"
              type="number"
              required
              fullWidth
              error={!!errors.percentage}
              helperText={errors.percentage?.message || 'Discount percentage (1-100)'}
              disabled={isPending}
              inputProps={{ min: 1, max: 100 }}
              onChange={e => field.onChange(Number(e.target.value))}
            />
          )}
        />
      </FieldContainer>
    </>
  );
};
