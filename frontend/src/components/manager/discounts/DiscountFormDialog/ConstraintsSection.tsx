import { TextField } from '@mui/material';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { CreateDiscountFormData, UpdateDiscountFormData } from '@schemas/discountSchemas';
import { FieldContainer } from './DiscountFormDialog.sc';

interface ConstraintsSectionProps {
  control: Control<CreateDiscountFormData | UpdateDiscountFormData>;
  errors: FieldErrors<CreateDiscountFormData | UpdateDiscountFormData>;
  isPending: boolean;
}

export const ConstraintsSection = ({ control, errors, isPending }: ConstraintsSectionProps) => {
  return (
    <>
      <FieldContainer>
        <Controller
          name="maxUsageCount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Max Usage Count"
              type="number"
              fullWidth
              error={!!errors.maxUsageCount}
              helperText={errors.maxUsageCount?.message || 'Leave empty for unlimited'}
              disabled={isPending}
              inputProps={{ min: 1 }}
              onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
              value={field.value || ''}
            />
          )}
        />
      </FieldContainer>

      <FieldContainer>
        <Controller
          name="minimumOrderAmount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Minimum Order Amount"
              type="number"
              fullWidth
              error={!!errors.minimumOrderAmount}
              helperText={errors.minimumOrderAmount?.message || 'Minimum order amount required'}
              disabled={isPending}
              inputProps={{ min: 0, step: 0.01 }}
              onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
              value={field.value || ''}
            />
          )}
        />
      </FieldContainer>
    </>
  );
};
