import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import {
  TextField,
  Autocomplete,
  Chip,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
} from '@mui/material';
import { FormSection, SectionTitle } from '@layout/manager/BookFormLayout.sc';
import { AsyncPaginateSelect } from '@components/common/AsyncPaginateSelect';
import { loadGenresOptions } from '@utils/selectAdapters';
import { bookFormats, type CreateBookFormData } from '@schemas/bookSchemas';
import { formatBookFormat } from '@utils/formatters';

interface BookClassificationSectionProps {
  control: Control<CreateBookFormData>;
  errors: FieldErrors<CreateBookFormData>;
  disabled?: boolean;
}

export const BookClassificationSection = ({
  control,
  errors,
  disabled,
}: BookClassificationSectionProps) => {
  return (
    <FormSection>
      <SectionTitle>Classification</SectionTitle>

      <Controller
        name="genreIds"
        control={control}
        render={({ field: { value, onChange } }) => (
          <AsyncPaginateSelect
            loadOptions={loadGenresOptions}
            value={value || []}
            onChange={onChange}
            label="Genres"
            helperText={errors.genreIds?.message || 'Select 1-5 genres (type to search)'}
            error={!!errors.genreIds}
            disabled={disabled}
            required
          />
        )}
      />

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
                  label={formatBookFormat(format)}
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
