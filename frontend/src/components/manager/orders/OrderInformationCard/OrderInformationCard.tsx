import { Typography, Divider } from '@mui/material';
import { StatusChip } from '@components/common/StatusChip/StatusChip';
import { formatOrderId, formatDateLong, formatDateTime } from '@utils/formatters';
import { SectionCard, InfoRow, InfoLabel, InfoValue } from './OrderInformationCard.sc';

interface OrderInformationCardProps {
  orderId?: string;
  orderDate?: string;
  status?: string;
  updatedAt?: string;
  customerName: string;
  customerEmail?: string;
}

export const OrderInformationCard = ({
  orderId,
  orderDate,
  status,
  updatedAt,
  customerName,
  customerEmail,
}: OrderInformationCardProps) => {
  return (
    <SectionCard>
      <Typography variant="h6" gutterBottom>
        Order Information
      </Typography>
      <Divider />
      <InfoRow>
        <InfoLabel>Order ID</InfoLabel>
        <InfoValue>{orderId ? formatOrderId(orderId) : 'N/A'}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Order Date</InfoLabel>
        <InfoValue>{orderDate ? formatDateLong(orderDate) : 'N/A'}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Status</InfoLabel>
        <InfoValue>
          <StatusChip status={status || 'PENDING'} />
        </InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Last Updated</InfoLabel>
        <InfoValue>{updatedAt ? formatDateTime(updatedAt) : 'N/A'}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Customer Name</InfoLabel>
        <InfoValue>{customerName}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Customer Email</InfoLabel>
        <InfoValue>{customerEmail || 'N/A'}</InfoValue>
      </InfoRow>
    </SectionCard>
  );
};
