import { Typography, Button, Divider, Alert } from '@mui/material';
import {
  SummaryCard,
  SummaryRow,
  TotalRow,
} from '@components/common/OrderComponents/OrderComponents.sc';
import { formatCurrency } from '@utils/formatters';

interface OrderSummaryProps {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  isValid: boolean;
  isPending: boolean;
  hasDiscount: boolean;
}

export const OrderSummary = ({
  subtotal,
  discountAmount,
  taxAmount,
  totalAmount,
  isValid,
  isPending,
  hasDiscount,
}: OrderSummaryProps) => {
  return (
    <SummaryCard>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>

      <Divider />

      <SummaryRow>
        <Typography variant="body2">Subtotal</Typography>
        <Typography variant="body2">{formatCurrency(subtotal)}</Typography>
      </SummaryRow>

      {hasDiscount && (
        <>
          <SummaryRow>
            <Typography variant="body2" color="success.main">
              Loyalty Discount
            </Typography>
            <Typography variant="body2" color="success.main">
              -{formatCurrency(discountAmount)}
            </Typography>
          </SummaryRow>
          {discountAmount > 0 && (
            <Alert severity="success" sx={{ mt: 1 }}>
              Loyalty discount applied!
            </Alert>
          )}
        </>
      )}

      <SummaryRow>
        <Typography variant="body2">Tax (8%)</Typography>
        <Typography variant="body2">{formatCurrency(taxAmount)}</Typography>
      </SummaryRow>

      <TotalRow>
        <Typography variant="h6">Total</Typography>
        <Typography variant="h6">{formatCurrency(totalAmount)}</Typography>
      </TotalRow>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        disabled={!isValid || isPending}
      >
        {isPending ? 'Placing Order...' : 'Place Order'}
      </Button>
    </SummaryCard>
  );
};
