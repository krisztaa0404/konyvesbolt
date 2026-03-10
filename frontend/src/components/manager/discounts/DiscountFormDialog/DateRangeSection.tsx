import { TextField } from '@mui/material';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { CreateDiscountFormData, UpdateDiscountFormData } from '@schemas/discountSchemas';
import { FieldContainer } from './DiscountFormDialog.sc';

interface DateRangeSectionProps {
  control: Control<CreateDiscountFormData | UpdateDiscountFormData>;
  errors: FieldErrors<CreateDiscountFormData | UpdateDiscountFormData>;
  isPending: boolean;
}

export const DateRangeSection = ({ control, errors, isPending }: DateRangeSectionProps) => {
  return (
    <>
      <FieldContainer>
        <Controller
          name="validFrom"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Valid From"
              type="datetime-local"
              required
              fullWidth
              error={!!errors.validFrom}
              helperText={errors.validFrom?.message}
              disabled={isPending}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </FieldContainer>

      <FieldContainer>
        <Controller
          name="validTo"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Valid To"
              type="datetime-local"
              required
              fullWidth
              error={!!errors.validTo}
              helperText={errors.validTo?.message}
              disabled={isPending}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </FieldContainer>
    </>
  );
};
