import { z } from 'zod';
import { UserRole } from '@types';

/**
 * Validation schema for creating a new user
 */
export const createUserSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  role: z.enum([UserRole.USER, UserRole.MANAGER, UserRole.ADMIN], {
    message: 'Role is required',
  }),
});

/**
 * Validation schema for updating user role
 */
export const updateUserRoleSchema = z.object({
  role: z.enum([UserRole.USER, UserRole.MANAGER, UserRole.ADMIN], {
    message: 'Role is required',
  }),
});

/**
 * Validation schema for updating loyalty status
 */
export const updateLoyaltySchema = z.object({
  isLoyaltyMember: z.boolean({
    message: 'Loyalty member status is required',
  }),
  discountPercent: z
    .number()
    .min(0, 'Discount must be at least 0%')
    .max(50, 'Discount cannot exceed 50%')
    .optional(),
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type UpdateUserRoleFormData = z.infer<typeof updateUserRoleSchema>;
export type UpdateLoyaltyFormData = z.infer<typeof updateLoyaltySchema>;
