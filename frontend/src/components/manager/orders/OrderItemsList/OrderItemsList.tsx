import { Typography, Divider, Box } from '@mui/material';
import { formatCurrency } from '@utils/formatters';
import {
  SectionCard,
  OrderItem,
  ItemImage,
  ItemDetails,
  ItemPriceInfo,
} from './OrderItemsList.sc';

interface OrderItemsListProps {
  items?: Array<{
    id?: string;
    book?: {
      title?: string;
      authors?: string[];
      coverImageUrl?: string;
    };
    format?: string;
    quantity?: number;
    priceAtOrder?: number;
  }>;
}

export const OrderItemsList = ({ items }: OrderItemsListProps) => {
  const itemCount = items?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;

  return (
    <SectionCard>
      <Typography variant="h6" gutterBottom>
        Order Items
      </Typography>
      <Divider />
      <Box>
        {items?.map((item, index) => (
          <OrderItem key={item.id || index}>
            <ItemImage
              src={item.book?.coverImageUrl || '/placeholder-book.jpg'}
              alt={item.book?.title || 'Book cover'}
            />
            <ItemDetails>
              <Typography variant="subtitle1" fontWeight={600}>
                {item.book?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.book?.authors?.join(', ')}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Format: {item.format}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quantity: {item.quantity}
              </Typography>
            </ItemDetails>
            <ItemPriceInfo>
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(item.priceAtOrder || 0)} each
              </Typography>
              <Typography variant="subtitle1" fontWeight={600}>
                {formatCurrency((item.priceAtOrder || 0) * (item.quantity || 0))}
              </Typography>
            </ItemPriceInfo>
          </OrderItem>
        ))}
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Total Items: {itemCount}
      </Typography>
    </SectionCard>
  );
};
