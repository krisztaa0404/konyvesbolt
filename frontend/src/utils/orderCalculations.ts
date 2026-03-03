/**
 * Order calculation utilities
 */

import type { OrderItem } from '@types';

export interface OrderTotals {
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  discountLabel: string;
}

const TAX_RATE = 0.08; // 8% sales tax

/**
 * Calculate subtotal from order items
 */
export const calculateOrderItemsSubtotal = (items?: OrderItem[]): number => {
  if (!items || items.length === 0) {
    return 0;
  }
  return items.reduce((sum, item) => sum + (item.priceAtOrder || 0) * (item.quantity || 0), 0);
};

/**
 * Calculate tax amount based on subtotal and discount
 */
export const calculateTaxAmount = (subtotal: number, discountAmount: number = 0): number => {
  return (subtotal - discountAmount) * TAX_RATE;
};

/**
 * Calculate order totals including discount and tax
 */
export const calculateOrderTotals = (
  subtotal: number,
  discountType: 'loyalty' | 'seasonal' | 'none' = 'none',
  loyaltyDiscountPercent: number = 0,
  seasonalDiscountPercent: number = 0,
  seasonalDiscountName?: string
): OrderTotals => {
  let discountPercent = 0;
  let discountLabel = '';

  if (discountType === 'loyalty' && loyaltyDiscountPercent > 0) {
    discountPercent = loyaltyDiscountPercent;
    discountLabel = 'Loyalty Discount';
  } else if (discountType === 'seasonal' && seasonalDiscountPercent > 0) {
    discountPercent = seasonalDiscountPercent;
    discountLabel = `Seasonal Discount${seasonalDiscountName ? ': ' + seasonalDiscountName : ''}`;
  }

  const discountAmount = (subtotal * discountPercent) / 100;
  const taxAmount = calculateTaxAmount(subtotal, discountAmount);
  const totalAmount = subtotal - discountAmount + taxAmount;

  return {
    subtotal,
    discountPercent,
    discountAmount,
    taxAmount,
    totalAmount,
    discountLabel,
  };
};
