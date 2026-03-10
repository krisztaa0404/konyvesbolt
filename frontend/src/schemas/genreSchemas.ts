import { z } from 'zod';

/**
 * Validation schema for creating a genre
 */
export const createGenreSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must not exceed 100 characters'),

  description: z.string().max(500, 'Description must not exceed 500 characters').optional(),
});

/**
 * Validation schema for updating a genre (all fields optional)
 */
export const updateGenreSchema = createGenreSchema.partial();

/**
 * Type for create genre form data
 */
export type CreateGenreFormData = z.infer<typeof createGenreSchema>;

/**
 * Type for update genre form data
 */
export type UpdateGenreFormData = z.infer<typeof updateGenreSchema>;
