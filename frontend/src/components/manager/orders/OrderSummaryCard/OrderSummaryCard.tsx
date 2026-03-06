import { Typography, Divider } from '@mui/material';
import { formatCurrency } from '@utils/formatters';
import { SummaryCard, SummaryRow, TotalRow } from './OrderSummaryCard.sc';

interface OrderSummaryCardProps {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  itemCount: number;
}

export const OrderSummaryCard = ({
  subtotal,
  discountAmount,
  taxAmount,
  totalAmount,
  itemCount,
}: OrderSummaryCardProps) => {
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
      {discountAmount > 0 && (
        <SummaryRow>
          <Typography variant="body2" color="success.main">
            Discount
          </Typography>
          <Typography variant="body2" color="success.main">
            -{formatCurrency(discountAmount)}
          </Typography>
        </SummaryRow>
      )}
      <SummaryRow>
        <Typography variant="body2">Tax (8%)</Typography>
        <Typography variant="body2">{formatCurrency(taxAmount)}</Typography>
      </SummaryRow>
      <TotalRow>
        <Typography variant="h6" fontWeight={700}>
          Total
        </Typography>
        <Typography variant="h6" fontWeight={700}>
          {formatCurrency(totalAmount)}
        </Typography>
      </TotalRow>
      <Divider sx={{ mt: 2 }} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        {itemCount} item{itemCount !== 1 ? 's' : ''}
      </Typography>
    </SummaryCard>
  );
};
