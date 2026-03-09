import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { TextField } from '@mui/material';
import { FormSection, SectionTitle, FormRow } from '@layout/manager/BookFormLayout.sc';
import type { CreateBookFormData } from '@schemas/bookSchemas';

interface BookMetadataSectionProps {
  control: Control<CreateBookFormData>;
  errors: FieldErrors<CreateBookFormData>;
  disabled?: boolean;
}

export const BookMetadataSection = ({ control, errors, disabled }: BookMetadataSectionProps) => {
  return (
    <FormSection>
      <SectionTitle>Metadata (Optional)</SectionTitle>

      <FormRow>
        <Controller
          name="metadata.language"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value || ''}
              label="Language"
              fullWidth
              placeholder="e.g., English"
              error={!!errors.metadata?.language}
              helperText={errors.metadata?.language?.message}
              disabled={disabled}
            />
          )}
        />

        <Controller
          name="metadata.dimensions"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value || ''}
              label="Dimensions"
              fullWidth
              placeholder="e.g., 6 x 9 inches"
              error={!!errors.metadata?.dimensions}
              helperText={errors.metadata?.dimensions?.message}
              disabled={disabled}
            />
          )}
        />
      </FormRow>

      <FormRow>
        <Controller
          name="metadata.readingAge"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value || ''}
              label="Reading Age"
              fullWidth
              placeholder="e.g., 8-12 years, Young Adult"
              error={!!errors.metadata?.readingAge}
              helperText={errors.metadata?.readingAge?.message}
              disabled={disabled}
            />
          )}
        />

        <Controller
          name="metadata.rating"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <TextField
              {...field}
              value={value ?? ''}
              onChange={e => {
                const val = e.target.value ? parseFloat(e.target.value) : null;
                onChange(val);
              }}
              label="Rating"
              type="number"
              fullWidth
              inputProps={{ step: '0.1', min: '1', max: '5' }}
              placeholder="1.0 - 5.0"
              error={!!errors.metadata?.rating}
              helperText={errors.metadata?.rating?.message || 'Rating between 1 and 5'}
              disabled={disabled}
            />
          )}
        />
      </FormRow>

      <FormRow>
        <Controller
          name="metadata.seriesName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value || ''}
              label="Series Name"
              fullWidth
              placeholder="e.g., Harry Potter, The Lord of the Rings"
              error={!!errors.metadata?.seriesName}
              helperText={errors.metadata?.seriesName?.message}
              disabled={disabled}
            />
          )}
        />

        <Controller
          name="metadata.seriesPosition"
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <TextField
              {...field}
              value={value ?? ''}
              onChange={e => {
                const val = e.target.value ? parseInt(e.target.value, 10) : null;
                onChange(val);
              }}
              label="Series Position"
              type="number"
              fullWidth
              inputProps={{ step: '1', min: '1' }}
              placeholder="e.g., 1, 2, 3"
              error={!!errors.metadata?.seriesPosition}
              helperText={errors.metadata?.seriesPosition?.message || 'Position in series'}
              disabled={disabled}
            />
          )}
        />
      </FormRow>

      <Controller
        name="metadata.bestsellerRanks"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''}
            label="Bestseller Ranks"
            fullWidth
            multiline
            rows={2}
            placeholder="e.g., #1 in Fiction, Top 100 in Mystery"
            error={!!errors.metadata?.bestsellerRanks}
            helperText={errors.metadata?.bestsellerRanks?.message}
            disabled={disabled}
          />
        )}
      />
    </FormSection>
  );
};
