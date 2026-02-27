import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Chip,
  CircularProgress,
} from '@mui/material';
import { useUpdateProfile } from '@hooks/useUpdateProfile';
import { useGenres } from '@hooks/useGenres';
import { preferencesSchema, type PreferencesFormData } from '@schemas/profileSchemas';
import type { User } from '@types';
import { FormContainer, FormSection, SectionTitle, ButtonGroup } from '../ProfileLayout.sc';

interface PreferencesTabProps {
  user: User;
}

export const PreferencesTab = ({ user }: PreferencesTabProps) => {
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { data: genresPage, isLoading: isLoadingGenres } = useGenres({ size: 200 });
  const genres = genresPage?.content || [];

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<PreferencesFormData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      newsletter: user.preferences?.newsletter ?? false,
      notificationEmail: user.preferences?.notificationEmail ?? false,
      favoriteGenres: user.preferences?.favoriteGenres ?? [],
    },
  });

  const onSubmit = (data: PreferencesFormData) => {
    updateProfile({
      preferences: {
        newsletter: data.newsletter,
        notificationEmail: data.notificationEmail,
        favoriteGenres: data.favoriteGenres,
      },
    });
  };

  const handleReset = () => {
    reset();
  };

  return (
    <FormContainer>
      <Typography variant="h5" gutterBottom>
        Preferences
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Customize your experience and communication preferences
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection>
          <SectionTitle>
            <Typography variant="h6">Communication</Typography>
          </SectionTitle>

          <Controller
            name="newsletter"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox checked={field.value} onChange={field.onChange} color="primary" />
                }
                label="Subscribe to newsletter"
              />
            )}
          />

          <Controller
            name="notificationEmail"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox checked={field.value} onChange={field.onChange} color="primary" />
                }
                label="Receive email notifications about orders"
              />
            )}
          />
        </FormSection>

        <FormSection>
          <SectionTitle>
            <Typography variant="h6">Favorite Genres</Typography>
          </SectionTitle>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select your favorite book genres to receive personalized recommendations
          </Typography>

          <Controller
            name="favoriteGenres"
            control={control}
            render={({ field: { value, onChange } }) => {
              const selectedGenres = genres.filter(g => value.includes(g?.name ?? ''));

              return (
                <Autocomplete
                  multiple
                  options={genres}
                  loading={isLoadingGenres}
                  value={selectedGenres}
                  onChange={(_, newValue) => {
                    onChange(newValue.map(genre => genre.name ?? ''));
                  }}
                  getOptionLabel={option => option.name ?? ''}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Select Genres"
                      error={!!errors.favoriteGenres}
                      helperText={errors.favoriteGenres?.message}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingGenres ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      }}
                    />
                  )}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => {
                      const { key, ...chipProps } = getTagProps({ index });
                      return <Chip key={key} label={option.name} {...chipProps} />;
                    })
                  }
                  disabled={isLoadingGenres}
                />
              );
            }}
          />
        </FormSection>

        <ButtonGroup>
          <Button variant="outlined" onClick={handleReset} disabled={!isDirty || isUpdating}>
            Reset
          </Button>
          <Button type="submit" variant="contained" disabled={!isDirty || isUpdating}>
            {isUpdating ? 'Saving...' : 'Save Preferences'}
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};
