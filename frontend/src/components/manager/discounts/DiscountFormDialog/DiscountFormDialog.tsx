import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createDiscountSchema,
  updateDiscountSchema,
  type CreateDiscountFormData,
  type UpdateDiscountFormData,
} from '@schemas/discountSchemas';
import { useCreateDiscount } from '@hooks/useCreateDiscount';
import { useUpdateDiscount } from '@hooks/useUpdateDiscount';
import { toDatetimeLocal, fromDatetimeLocal } from '@utils/formatters';
import type { SeasonalDiscount } from '@types';
import { DISCOUNT_SCOPE } from '@types';
import { AsyncPaginateSelect } from '@components/common/AsyncPaginateSelect';
import { loadBooksOptions, loadGenresOptions } from '@utils/selectAdapters';
import { FormContent, FieldContainer, RadioGroupContainer } from './DiscountFormDialog.sc';

interface DiscountFormDialogProps {
  open: boolean;
  onClose: () => void;
  discount?: SeasonalDiscount | null;
}

const getFormDefaultValues = (discount?: SeasonalDiscount | null): CreateDiscountFormData | UpdateDiscountFormData => ({
  name: discount?.name || '',
  description: discount?.description || '',
  percentage: discount?.percentage || 10,
  validFrom: discount?.validFrom ? toDatetimeLocal(discount.validFrom) : '',
  validTo: discount?.validTo ? toDatetimeLocal(discount.validTo) : '',
  scopeType: discount?.scopeType || DISCOUNT_SCOPE.ALL_BOOKS,
  maxUsageCount: discount?.maxUsageCount || undefined,
  minimumOrderAmount: discount?.minimumOrderAmount || undefined,
  bookIds: [],
  genreIds: [],
  allBooks: discount?.scopeType === DISCOUNT_SCOPE.ALL_BOOKS,
});

export const DiscountFormDialog = ({ open, onClose, discount }: DiscountFormDialogProps) => {
  const isEditMode = !!discount;
  const createDiscount = useCreateDiscount();
  const updateDiscount = useUpdateDiscount();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<CreateDiscountFormData | UpdateDiscountFormData>({
    resolver: zodResolver(isEditMode ? updateDiscountSchema : createDiscountSchema),
    defaultValues: getFormDefaultValues(discount),
  });

  const scopeType = watch('scopeType');
  const isSpecificBooks = scopeType === DISCOUNT_SCOPE.SPECIFIC_BOOKS;

  useEffect(() => {
    if (open) {
      reset(getFormDefaultValues(discount));
    }
  }, [open, discount, reset]);

  const onSubmit = (data: CreateDiscountFormData | UpdateDiscountFormData) => {
    const apiData: any = {
      name: data.name,
      description: data.description || undefined,
      percentage: data.percentage,
      validFrom: fromDatetimeLocal(data.validFrom as string),
      validTo: fromDatetimeLocal(data.validTo as string),
      maxUsageCount: data.maxUsageCount || undefined,
      minimumOrderAmount: data.minimumOrderAmount || undefined,
      allBooks: data.scopeType === DISCOUNT_SCOPE.ALL_BOOKS,
      bookIds: data.scopeType === DISCOUNT_SCOPE.SPECIFIC_BOOKS ? data.bookIds : undefined,
      genreIds: data.scopeType === DISCOUNT_SCOPE.SPECIFIC_BOOKS ? data.genreIds : undefined,
    };

    if (isEditMode && discount?.id) {
      updateDiscount.mutate(
        { discountId: discount.id, discount: apiData },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    } else {
      createDiscount.mutate(apiData, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const isPending = createDiscount.isPending || updateDiscount.isPending;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit Discount' : 'Create New Discount'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FormContent>
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

            <FieldContainer>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                Scope Type *
              </Typography>
              <Controller
                name="scopeType"
                control={control}
                render={({ field }) => (
                  <RadioGroupContainer>
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value={DISCOUNT_SCOPE.ALL_BOOKS}
                        control={<Radio />}
                        label="All Books"
                        disabled={isPending}
                      />
                      <FormControlLabel
                        value={DISCOUNT_SCOPE.SPECIFIC_BOOKS}
                        control={<Radio />}
                        label="Specific Books"
                        disabled={isPending}
                      />
                    </RadioGroup>
                  </RadioGroupContainer>
                )}
              />
              {errors.scopeType && (
                <Typography color="error" variant="caption">
                  {errors.scopeType.message}
                </Typography>
              )}
            </FieldContainer>

            {isSpecificBooks && (
              <>
                <FieldContainer>
                  <Controller
                    name="bookIds"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <AsyncPaginateSelect
                        loadOptions={loadBooksOptions}
                        value={value || []}
                        onChange={onChange}
                        label="Books"
                        helperText="Type to search books"
                        disabled={isPending}
                        error={!!errors.bookIds}
                      />
                    )}
                  />
                </FieldContainer>

                <FieldContainer>
                  <Controller
                    name="genreIds"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <AsyncPaginateSelect
                        loadOptions={loadGenresOptions}
                        value={value || []}
                        onChange={onChange}
                        label="Genres"
                        helperText="Type to search genres"
                        disabled={isPending}
                        error={!!errors.genreIds}
                      />
                    )}
                  />
                </FieldContainer>
              </>
            )}

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
          </FormContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            startIcon={isPending && <CircularProgress size={20} />}
          >
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
