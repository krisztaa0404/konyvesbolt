import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, TextField, Button, Box } from '@mui/material';
import { useUpdateProfile } from '@hooks/useUpdateProfile';
import { profileUpdateSchema, type ProfileUpdateFormData } from '@schemas/profileSchemas';
import { parseAddress, formatAddressDto } from '@utils/addressUtils';
import type { User, UpdateUser } from '@types';
import {
  FormContainer,
  FormSection,
  SectionTitle,
  FieldRow,
  ButtonGroup,
} from '../ProfileLayout.sc';
import { LoyaltyBadge } from './ProfileInfoTab.sc';

interface ProfileInfoTabProps {
  user: User;
}

export const ProfileInfoTab = ({ user }: ProfileInfoTabProps) => {
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const parsedAddress = parseAddress(user.addressData);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phoneNumber: user.phone || '',
      street: parsedAddress.street || '',
      city: parsedAddress.city || '',
      state: parsedAddress.state || '',
      postalCode: parsedAddress.postalCode || '',
      country: parsedAddress.country || 'United States',
      addressType: parsedAddress.type || '',
    },
  });

  const onSubmit = async (data: ProfileUpdateFormData) => {
    const { street, city, state, postalCode, country, addressType, phoneNumber, ...baseData } =
      data;

    const updateData: UpdateUser = {
      ...baseData,
      phone: phoneNumber,
      addressData: [
        formatAddressDto({
          street,
          city,
          state,
          postalCode,
          country,
          type: addressType,
        }),
      ],
    };

    updateProfile(updateData);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <FormContainer>
      <Typography variant="h5" gutterBottom>
        Profile Information
      </Typography>

      {user.isLoyaltyMember && (
        <Box sx={{ mb: 3 }}>
          <LoyaltyBadge
            label={`Loyalty Member - ${user.loyaltyDiscountPercent}% Discount`}
            icon={<span>✨</span>}
          />
        </Box>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection>
          <SectionTitle>
            <Typography variant="h6">Personal Information</Typography>
          </SectionTitle>

          <FieldRow>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name"
                  type="text"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  autoComplete="given-name"
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  type="text"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  autoComplete="family-name"
                />
              )}
            />
          </FieldRow>

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                autoComplete="email"
              />
            )}
          />

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                type="tel"
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
                autoComplete="tel"
              />
            )}
          />
        </FormSection>

        <FormSection>
          <SectionTitle>
            <Typography variant="h6">Address</Typography>
          </SectionTitle>

          <Controller
            name="addressType"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address Type (Optional)"
                type="text"
                fullWidth
                error={!!errors.addressType}
                helperText={errors.addressType?.message}
                placeholder="e.g., BILLING, SHIPPING"
              />
            )}
          />

          <Controller
            name="street"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Street Address"
                type="text"
                fullWidth
                error={!!errors.street}
                helperText={errors.street?.message}
                autoComplete="street-address"
              />
            )}
          />

          <FieldRow>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  type="text"
                  fullWidth
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  autoComplete="address-level2"
                />
              )}
            />
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="State/Province"
                  type="text"
                  fullWidth
                  error={!!errors.state}
                  helperText={errors.state?.message}
                  autoComplete="address-level1"
                />
              )}
            />
          </FieldRow>

          <FieldRow>
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Postal Code"
                  type="text"
                  fullWidth
                  error={!!errors.postalCode}
                  helperText={errors.postalCode?.message}
                  autoComplete="postal-code"
                />
              )}
            />
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Country"
                  type="text"
                  fullWidth
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  autoComplete="country-name"
                />
              )}
            />
          </FieldRow>
        </FormSection>

        <ButtonGroup>
          <Button variant="outlined" onClick={handleReset} disabled={!isDirty || isPending}>
            Reset
          </Button>
          <Button type="submit" variant="contained" disabled={!isDirty || isPending}>
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
};
