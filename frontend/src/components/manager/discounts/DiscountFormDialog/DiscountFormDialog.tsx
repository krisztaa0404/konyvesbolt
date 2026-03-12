import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  IconButton,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
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
import type { DetailedSeasonalDiscount, CreateSeasonalDiscount } from '@types';
import { DISCOUNT_SCOPE } from '@types';
import { BasicInfoSection } from './BasicInfoSection';
import { DateRangeSection } from './DateRangeSection';
import { ScopeSection } from './ScopeSection';
import { ConstraintsSection } from './ConstraintsSection';
import { FormContent } from './DiscountFormDialog.sc';

interface DiscountFormDialogProps {
  open: boolean;
  onClose: () => void;
  discount?: DetailedSeasonalDiscount | null;
  isLoadingDiscount?: boolean;
}

const getFormDefaultValues = (
  discount?: DetailedSeasonalDiscount | null
): CreateDiscountFormData | UpdateDiscountFormData => ({
  name: discount?.name || '',
  description: discount?.description || '',
  percentage: discount?.percentage || 10,
  validFrom: discount?.validFrom ? toDatetimeLocal(discount.validFrom) : '',
  validTo: discount?.validTo ? toDatetimeLocal(discount.validTo) : '',
  scopeType: discount?.scopeType || DISCOUNT_SCOPE.ALL_BOOKS,
  maxUsageCount: discount?.maxUsageCount || undefined,
  minimumOrderAmount: discount?.minimumOrderAmount || undefined,
  bookIds: discount?.books?.map(book => book.id || '') || [],
  genreIds: discount?.genres?.map(genre => genre.id || '') || [],
  allBooks: discount?.scopeType === DISCOUNT_SCOPE.ALL_BOOKS,
});

export const DiscountFormDialog = ({
  open,
  onClose,
  discount,
  isLoadingDiscount,
}: DiscountFormDialogProps) => {
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

  useEffect(() => {
    if (open) {
      reset(getFormDefaultValues(discount));
    }
  }, [open, discount, reset]);

  const onSubmit = (data: CreateDiscountFormData | UpdateDiscountFormData) => {
    const apiData: CreateSeasonalDiscount = {
      name: data.name ?? '',
      description: data.description || undefined,
      percentage: data.percentage ?? 0,
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
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{isEditMode ? 'Edit Discount' : 'Create New Discount'}</span>
          <IconButton aria-label="close" onClick={handleClose} disabled={isPending} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          {isLoadingDiscount ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <FormContent>
              <BasicInfoSection control={control} errors={errors} isPending={isPending} />
              <DateRangeSection control={control} errors={errors} isPending={isPending} />
              <ScopeSection
                control={control}
                errors={errors}
                scopeType={scopeType ?? ''}
                isPending={isPending}
                initialBooks={discount?.books}
                initialGenres={discount?.genres}
              />
              <ConstraintsSection control={control} errors={errors} isPending={isPending} />
            </FormContent>
          )}
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
