import { useState, useEffect } from 'react';
import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { TextField, Typography } from '@mui/material';
import {
  FormSection,
  SectionTitle,
  ImagePreviewContainer,
} from '@layout/manager/BookFormLayout.sc';
import type { CreateBookFormData } from '@schemas/bookSchemas';

interface BookDetailsSectionProps {
  control: Control<CreateBookFormData>;
  errors: FieldErrors<CreateBookFormData>;
  coverImageUrl?: string | null;
  disabled?: boolean;
}

export const BookDetailsSection = ({
  control,
  errors,
  coverImageUrl,
  disabled,
}: BookDetailsSectionProps) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [imageLoadError, setImageLoadError] = useState(false);

  useEffect(() => {
    if (coverImageUrl && coverImageUrl.trim()) {
      setImagePreviewUrl(coverImageUrl);
      setImageLoadError(false);
    } else {
      setImagePreviewUrl(null);
      setImageLoadError(false);
    }
  }, [coverImageUrl]);

  return (
    <FormSection>
      <SectionTitle>Details</SectionTitle>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            value={field.value || ''}
            label="Description"
            multiline
            rows={5}
            fullWidth
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={disabled}
            sx={{ mb: 2 }}
          />
        )}
      />

      <Controller
        name="metadata.coverImageUrl"
        control={control}
        render={({ field }) => (
          <>
            <TextField
              {...field}
              value={field.value || ''}
              label="Cover Image URL"
              fullWidth
              error={!!errors.metadata?.coverImageUrl}
              helperText={
                errors.metadata?.coverImageUrl?.message || 'Enter a valid URL to display book cover'
              }
              disabled={disabled}
            />
            {imagePreviewUrl && !imageLoadError && (
              <ImagePreviewContainer>
                <img
                  src={imagePreviewUrl}
                  alt="Cover preview"
                  onError={() => setImageLoadError(true)}
                />
              </ImagePreviewContainer>
            )}
            {imageLoadError && (
              <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                Failed to load image preview
              </Typography>
            )}
          </>
        )}
      />
    </FormSection>
  );
};
