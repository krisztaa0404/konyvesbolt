import { z } from 'zod';

/**
 * Address object schema for profile updates
 */
const addressObjectSchema = z.object({
  street: z
    .string()
    .min(1, 'Street address is required')
    .min(5, 'Street address must be at least 5 characters'),
  city: z.string().min(1, 'City is required').min(2, 'City must be at least 2 characters'),
  state: z.string().min(1, 'State is required').min(2, 'State must be at least 2 characters'),
  postal_code: z
    .string()
    .min(1, 'Postal code is required')
    .regex(/^[A-Z0-9\s-]+$/i, 'Please enter a valid postal code'),
  country: z.string().min(1, 'Country is required').min(2, 'Country must be at least 2 characters'),
});

/**
 * Profile update schema
 */
export const profileUpdateSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must not exceed 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must not exceed 50 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[\d\s+()-]+$/, 'Please enter a valid phone number'),
  street: addressObjectSchema.shape.street,
  city: addressObjectSchema.shape.city,
  state: addressObjectSchema.shape.state,
  postal_code: addressObjectSchema.shape.postal_code,
  country: addressObjectSchema.shape.country,
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

/**
 * Change password schema
 */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(1, 'New password is required')
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
