import { z } from 'zod';
import type { BookFormat } from '@types';

/**
 * Available book format options (must match API enum values)
 */
export const bookFormats: readonly BookFormat[] = ['physical', 'ebook', 'audiobook'] as const;

/**
 * Validation schema for creating a book
 */
export const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must not exceed 200 characters'),

  authors: z
    .array(z.string().min(1, 'Author name cannot be empty'))
    .min(1, 'At least one author is required')
    .max(10, 'Maximum 10 authors allowed'),

  isbn: z
    .string()
    .min(1, 'ISBN is required')
    .transform(val => val.replace(/[-\s]/g, ''))
    .refine(val => /^\d{10}$|^\d{13}$/.test(val), {
      message: 'ISBN must be 10 or 13 digits (hyphens allowed)',
    }),

  publisher: z
    .string()
    .min(1, 'Publisher is required')
    .max(100, 'Publisher name must not exceed 100 characters'),

  publicationYear: z
    .number({ message: 'Publication year must be a number' })
    .int('Publication year must be an integer')
    .min(1450, 'Publication year must be at least 1450')
    .max(
      new Date().getFullYear() + 1,
      `Publication year cannot be later than ${new Date().getFullYear() + 1}`
    ),

  price: z
    .number({ message: 'Price must be a number' })
    .positive('Price must be positive')
    .max(9999.99, 'Price must not exceed $9,999.99'),

  stockQuantity: z
    .number({ message: 'Stock quantity must be a number' })
    .int('Stock quantity must be an integer')
    .nonnegative('Stock quantity cannot be negative'),

  availableFormats: z.array(z.string()).min(1, 'At least one format must be selected'),

  genreIds: z
    .array(z.string().uuid('Invalid genre ID'))
    .min(1, 'At least one genre is required')
    .max(5, 'Maximum 5 genres allowed'),

  // Optional fields
  pageCount: z
    .number({ message: 'Page count must be a number' })
    .int('Page count must be an integer')
    .positive('Page count must be positive')
    .nullable()
    .optional(),

  description: z
    .string()
    .max(2000, 'Description must not exceed 2000 characters')
    .nullable()
    .optional(),

  tags: z.array(z.string()).max(10, 'Maximum 10 tags allowed').nullable().optional(),

  metadata: z
    .object({
      language: z.string().nullable().optional(),
      dimensions: z.string().nullable().optional(),
      coverImageUrl: z
        .string()
        .refine(val => !val || val === '' || z.string().url().safeParse(val).success, {
          message: 'Cover image URL must be a valid URL',
        })
        .nullable()
        .optional(),
      readingAge: z.string().nullable().optional(),
      bestsellerRanks: z.string().nullable().optional(),
      seriesName: z.string().nullable().optional(),
      seriesPosition: z
        .number({ message: 'Series position must be a number' })
        .int('Series position must be an integer')
        .positive('Series position must be positive')
        .nullable()
        .optional(),
      rating: z
        .number({ message: 'Rating must be a number' })
        .min(1, 'Rating must be at least 1')
        .max(5, 'Rating must be at most 5')
        .nullable()
        .optional(),
    })
    .nullable()
    .optional(),
});

/**
 * Validation schema for updating a book (all fields optional)
 */
export const updateBookSchema = createBookSchema.partial();

/**
 * Type for create book form data
 */
export type CreateBookFormData = z.infer<typeof createBookSchema>;

/**
 * Type for update book form data
 */
export type UpdateBookFormData = z.infer<typeof updateBookSchema>;
