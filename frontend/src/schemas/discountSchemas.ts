import { z } from 'zod';
import type { DiscountScopeType } from '@types';
import { DISCOUNT_SCOPE } from '@types';

const discountScopeTypes: [DiscountScopeType, ...DiscountScopeType[]] = [
  DISCOUNT_SCOPE.ALL_BOOKS,
  DISCOUNT_SCOPE.SPECIFIC_BOOKS,
];

const baseDiscountSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  description: z.string().max(500, 'Description must be 500 characters or less').optional(),
  percentage: z
    .number({ message: 'Percentage is required' })
    .min(1, 'Percentage must be at least 1')
    .max(100, 'Percentage cannot exceed 100'),
  validFrom: z.string().min(1, 'Start date is required'),
  validTo: z.string().min(1, 'End date is required'),
  scopeType: z.enum(discountScopeTypes, 'Scope type is required'),
  maxUsageCount: z.number().int().positive().optional(),
  minimumOrderAmount: z.number().positive().optional(),
  bookIds: z.array(z.string()).optional(),
  genreIds: z.array(z.string()).optional(),
  allBooks: z.boolean().optional(),
});

type BaseDiscountData = z.infer<typeof baseDiscountSchema>;
type PartialDiscountData = Partial<BaseDiscountData>;

const scopeTypeRefinement = (data: BaseDiscountData | PartialDiscountData): boolean => {
  if (data.scopeType === DISCOUNT_SCOPE.SPECIFIC_BOOKS) {
    return ((data.bookIds && data.bookIds.length > 0) || (data.genreIds && data.genreIds.length > 0)) ?? false;
  }
  return true;
};

const dateRangeRefinement = (data: BaseDiscountData | PartialDiscountData): boolean => {
  if (!data.validFrom || !data.validTo) return true;
  return new Date(data.validTo) > new Date(data.validFrom);
};

export const createDiscountSchema = baseDiscountSchema
  .refine(scopeTypeRefinement, {
    message: 'Must select at least one book or genre when scope type is SPECIFIC_BOOKS',
    path: ['scopeType'],
  })
  .refine(dateRangeRefinement, {
    message: 'End date must be after start date',
    path: ['validTo'],
  });

export const updateDiscountSchema = baseDiscountSchema
  .partial()
  .refine(scopeTypeRefinement, {
    message: 'Must select at least one book or genre when scope type is SPECIFIC_BOOKS',
    path: ['scopeType'],
  })
  .refine(dateRangeRefinement, {
    message: 'End date must be after start date',
    path: ['validTo'],
  });

export type CreateDiscountFormData = z.infer<typeof createDiscountSchema>;
export type UpdateDiscountFormData = z.infer<typeof updateDiscountSchema>;
