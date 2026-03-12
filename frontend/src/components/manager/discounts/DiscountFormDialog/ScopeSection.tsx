import { RadioGroup, FormControlLabel, Radio, Typography } from '@mui/material';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import type { CreateDiscountFormData, UpdateDiscountFormData } from '@schemas/discountSchemas';
import type { NamedEntityRef } from '@types';
import { DISCOUNT_SCOPE } from '@types';
import { AsyncPaginateSelect, type OptionType } from '@components/common/AsyncPaginateSelect';
import { loadBooksOptions, loadGenresOptions } from '@utils/selectAdapters';
import { FieldContainer, RadioGroupContainer } from './DiscountFormDialog.sc';

interface ScopeSectionProps {
  control: Control<CreateDiscountFormData | UpdateDiscountFormData>;
  errors: FieldErrors<CreateDiscountFormData | UpdateDiscountFormData>;
  scopeType: string;
  isPending: boolean;
  initialBooks?: NamedEntityRef[];
  initialGenres?: NamedEntityRef[];
}

export const ScopeSection = ({
  control,
  errors,
  scopeType,
  isPending,
  initialBooks = [],
  initialGenres = [],
}: ScopeSectionProps) => {
  const isSpecificBooks = scopeType === DISCOUNT_SCOPE.SPECIFIC_BOOKS;

  const initialBookOptions: OptionType[] = initialBooks.map(book => ({
    label: book.name || '',
    value: book.id || '',
  }));

  const initialGenreOptions: OptionType[] = initialGenres.map(genre => ({
    label: genre.name || '',
    value: genre.id || '',
  }));

  return (
    <>
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
                  initialOptions={initialBookOptions}
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
                  initialOptions={initialGenreOptions}
                />
              )}
            />
          </FieldContainer>
        </>
      )}
    </>
  );
};
