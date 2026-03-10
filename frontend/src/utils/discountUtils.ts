import type { SeasonalDiscount } from '@types';

export type DiscountStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED';

/**
 * Determines the current status of a seasonal discount
 * @param discount - The discount to check
 * @returns 'EXPIRED' if past validTo, 'ACTIVE' if currently active, 'INACTIVE' otherwise
 */
export const getDiscountStatus = (discount: SeasonalDiscount): DiscountStatus => {
  const now = new Date();
  const validTo = new Date(discount.validTo || '');

  if (validTo < now) return 'EXPIRED';
  if (discount.isActive) return 'ACTIVE';
  return 'INACTIVE';
};
