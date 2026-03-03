/**
 * Hook to determine applicable seasonal discount for checkout
 */
import { useMemo } from 'react';
import { useActiveSeasonalDiscounts } from './useActiveSeasonalDiscounts';
import type { SeasonalDiscount } from '@types';

interface UseApplicableSeasonalDiscountProps {
  cartSubtotal: number;
  cartBookIds: string[];
}

export const useApplicableSeasonalDiscount = ({
  cartSubtotal,
  cartBookIds,
}: UseApplicableSeasonalDiscountProps) => {
  const { data: activeDiscounts, isLoading, isError } = useActiveSeasonalDiscounts();

  const applicableDiscount = useMemo(() => {
    if (!activeDiscounts || activeDiscounts.length === 0) {
      return null;
    }

    // Filter discounts based on eligibility
    const eligibleDiscounts = activeDiscounts.filter((discount: SeasonalDiscount) => {
      // Check minimum order amount
      if (discount.minimumOrderAmount && cartSubtotal < discount.minimumOrderAmount) {
        return false;
      }

      // Check if max usage count is reached
      if (
        discount.maxUsageCount &&
        discount.currentUsageCount &&
        discount.currentUsageCount >= discount.maxUsageCount
      ) {
        return false;
      }

      // For SPECIFIC_BOOKS scope, we'll let the backend validate
      // Frontend just needs to check if cart is not empty
      if (discount.scopeType === 'SPECIFIC_BOOKS' && cartBookIds.length === 0) {
        return false;
      }

      return true;
    });

    // Return highest percentage discount if multiple are eligible
    if (eligibleDiscounts.length === 0) {
      return null;
    }

    return eligibleDiscounts.reduce((best, current) => {
      return (current.percentage || 0) > (best.percentage || 0) ? current : best;
    });
  }, [activeDiscounts, cartSubtotal, cartBookIds]);

  return {
    data: applicableDiscount,
    isLoading,
    isError,
  };
};
