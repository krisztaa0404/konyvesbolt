import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import {
  TextField,
  Autocomplete,
  Chip,
  FormGroup,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import { FormSection, SectionTitle } from '@layout/manager/BookFormLayout.sc';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { bookFormats, type CreateBookFormData } from '@schemas/bookSchemas';
import type { Genre } from '@types';

interface BookClassificationSectionProps {
  control: Control<CreateBookFormData>;
  errors: FieldErrors<CreateBookFormData>;
  genres: Genre[];
  isLoadingGenres: boolean;
  isGenresError: boolean;
  disabled?: boolean;
}

export const BookClassificationSection = ({
  control,
  errors,
  genres,
  isLoadingGenres,
  isGenresError,
  disabled,
}: BookClassificationSectionProps) => {
  return (
    <FormSection>
      <SectionTitle>Classification</SectionTitle>

      <Controller
        name="genreIds"
        control={control}
        render={({ field: { value, onChange } }) => {
          const selectedGenres = genres.filter(g => g.id && value.includes(g.id));
          return (
            <Autocomplete
              multiple
              options={genres}
              value={selectedGenres}
              onChange={(_, newValue) =>
                onChange(newValue.map(g => g.id).filter(Boolean) as string[])
              }
              getOptionLabel={option => option.name || ''}
              loading={isLoadingGenres}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return <Chip key={key} label={option.name || ''} {...tagProps} />;
                })
              }
              renderInput={params => (
                <TextField
                  {...params}
                  label="Genres *"
                  error={!!errors.genreIds}
                  helperText={errors.genreIds?.message || 'Select 1-5 genres'}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {isLoadingGenres ? <CircularProgress size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
              disabled={disabled || isGenresError}
              sx={{ mb: 2 }}
            />
          );
        }}
      />

      {isGenresError && (
        <ErrorMessage message="Failed to load genres" severity="warning" sx={{ mb: 2 }} />
      )}

      <Controller
        name="tags"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Autocomplete
            multiple
            freeSolo
            value={value || []}
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
                label="Tags"
                placeholder="Type tag and press Enter"
                error={!!errors.tags}
                helperText={errors.tags?.message || 'Add custom tags (optional, max 10)'}
              />
            )}
            disabled={disabled}
            sx={{ mb: 2 }}
          />
        )}
      />

      <Box>
        <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
          Available Formats *
        </Typography>
        <Controller
          name="availableFormats"
          control={control}
          render={({ field: { value, onChange } }) => (
            <FormGroup>
              {bookFormats.map(format => (
                <FormControlLabel
                  key={format}
                  control={
                    <Checkbox
                      checked={value.includes(format)}
                      onChange={e => {
                        if (e.target.checked) {
                          onChange([...value, format]);
                        } else {
                          onChange(value.filter(v => v !== format));
                        }
                      }}
                      disabled={disabled}
                    />
                  }
                  label={format}
                />
              ))}
            </FormGroup>
          )}
        />
        {errors.availableFormats && (
          <Typography color="error" variant="caption">
            {errors.availableFormats.message}
          </Typography>
        )}
      </Box>
    </FormSection>
  );
};
