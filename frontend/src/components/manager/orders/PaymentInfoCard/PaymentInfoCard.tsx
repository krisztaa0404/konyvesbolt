import { Typography, Divider } from '@mui/material';
import { formatDateTime } from '@utils/formatters';
import { SectionCard, InfoRow, InfoLabel, InfoValue } from './PaymentInfoCard.sc';

interface PaymentInfoCardProps {
  paymentInfo?: {
    method: string;
    status?: string;
    transactionId?: string;
    paidAt?: string;
  };
}

export const PaymentInfoCard = ({ paymentInfo }: PaymentInfoCardProps) => {
  if (!paymentInfo) {
    return null;
  }

  return (
    <SectionCard>
      <Typography variant="h6" gutterBottom>
        Payment Information
      </Typography>
      <Divider />
      <InfoRow>
        <InfoLabel>Payment Method</InfoLabel>
        <InfoValue>{paymentInfo.method || 'N/A'}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Payment Status</InfoLabel>
        <InfoValue>{paymentInfo.status || 'N/A'}</InfoValue>
      </InfoRow>
      {paymentInfo.transactionId && (
        <InfoRow>
          <InfoLabel>Transaction ID</InfoLabel>
          <InfoValue>{paymentInfo.transactionId}</InfoValue>
        </InfoRow>
      )}
      {paymentInfo.paidAt && (
        <InfoRow>
          <InfoLabel>Paid At</InfoLabel>
          <InfoValue>{formatDateTime(paymentInfo.paidAt)}</InfoValue>
        </InfoRow>
      )}
    </SectionCard>
  );
};
