import { z } from 'zod';

/**
 * Payment method options for checkout
 */
export const paymentMethods = ['CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL'] as const;

/**
 * Checkout shipping form schema
 */
export const checkoutShippingSchema = z.object({
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
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[\d\s+()-]+$/, 'Please enter a valid phone number'),
  street: z
    .string()
    .min(1, 'Street address is required')
    .min(5, 'Street address must be at least 5 characters'),
  city: z.string().min(1, 'City is required').min(2, 'City must be at least 2 characters'),
  state: z.string().min(1, 'State is required').min(2, 'State must be at least 2 characters'),
  postalCode: z
    .string()
    .min(1, 'Postal code is required')
    .regex(/^[A-Z0-9\s-]+$/i, 'Please enter a valid postal code'),
  country: z.string().min(1, 'Country is required').min(2, 'Country must be at least 2 characters'),
  paymentMethod: z.enum(paymentMethods),
});

export type CheckoutShippingFormData = z.infer<typeof checkoutShippingSchema>;
