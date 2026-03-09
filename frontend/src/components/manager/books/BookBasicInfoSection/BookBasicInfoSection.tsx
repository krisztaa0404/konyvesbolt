import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { TextField, Autocomplete, Chip } from '@mui/material';
import { FormSection, SectionTitle, FormRow } from '@layout/manager/BookFormLayout.sc';
import type { CreateBookFormData } from '@schemas/bookSchemas';

interface BookBasicInfoSectionProps {
  control: Control<CreateBookFormData>;
  errors: FieldErrors<CreateBookFormData>;
  disabled?: boolean;
}

export const BookBasicInfoSection = ({ control, errors, disabled }: BookBasicInfoSectionProps) => {
  return (
    <FormSection>
      <SectionTitle>Basic Information</SectionTitle>

      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title *"
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
            disabled={disabled}
            sx={{ mb: 2 }}
          />
        )}
      />

      <Controller
        name="authors"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Autocomplete
            multiple
            freeSolo
            value={value}
            onChange={(_, newValue) => onChange(newValue)}
            options={[]}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => {
                const { key, ...tagProps } = getTagProps({ index });
                return <Chip key={key} label={option} {...tagProps} />;
              })
            }
            renderInput={params => (
              <TextField
                {...params}
                label="Authors *"
                placeholder="Type author name and press Enter"
                error={!!errors.authors}
                helperText={
                  errors.authors?.message ||
                  'Add multiple authors by pressing Enter after each name'
                }
              />
            )}
            disabled={disabled}
            sx={{ mb: 2 }}
          />
        )}
      />

      <FormRow>
        <Controller
          name="isbn"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="ISBN *"
              fullWidth
              error={!!errors.isbn}
              helperText={errors.isbn?.message || '10 or 13 digits'}
              disabled={disabled}
            />
          )}
        />

        <Controller
          name="publisher"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Publisher *"
              fullWidth
              error={!!errors.publisher}
              helperText={errors.publisher?.message}
              disabled={disabled}
            />
          )}
        />
      </FormRow>

      <FormRow>
        <Controller
          name="publicationYear"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <TextField
              {...field}
              value={value || ''}
              onChange={e => {
                const val = e.target.value ? parseInt(e.target.value, 10) : 0;
                onChange(val);
              }}
              label="Publication Year *"
              type="number"
              fullWidth
              error={!!errors.publicationYear}
              helperText={errors.publicationYear?.message}
              disabled={disabled}
            />
          )}
        />

        <Controller
          name="pageCount"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <TextField
              {...field}
              value={value ?? ''}
              onChange={e => {
                const val = e.target.value ? parseInt(e.target.value, 10) : null;
                onChange(val);
              }}
              label="Page Count"
              type="number"
              fullWidth
              error={!!errors.pageCount}
              helperText={errors.pageCount?.message}
              disabled={disabled}
            />
          )}
        />
      </FormRow>
    </FormSection>
  );
};
