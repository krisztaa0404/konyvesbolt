/**
 * Order calculation utilities
 */

export interface OrderTotals {
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
}

const TAX_RATE = 0.08; // 8% sales tax

/**
 * Calculate order totals including discount and tax
 */
export const calculateOrderTotals = (
  subtotal: number,
  discountPercent: number = 0
): OrderTotals => {
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxAmount = (subtotal - discountAmount) * TAX_RATE;
  const totalAmount = subtotal - discountAmount + taxAmount;

  return {
    subtotal,
    discountPercent,
    discountAmount,
    taxAmount,
    totalAmount,
  };
};
