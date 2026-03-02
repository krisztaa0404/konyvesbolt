import { Typography, Box } from '@mui/material';
import { OrderItem, ItemImage, ItemDetails } from '@pages/customer/CheckoutPage/CheckoutPage.sc';
import { formatCurrency } from '@utils/formatters';
import type { CartItem } from '@types';

interface OrderReviewSectionProps {
  items: CartItem[];
}

export const OrderReviewSection = ({ items }: OrderReviewSectionProps) => {
  return (
    <Box>
      {items.map((item, index) => {
        const subtotal = (item.book.price || 0) * item.quantity;
        const authors = item.book.authors?.join(', ') || 'Unknown Author(s)';

        return (
          <OrderItem key={`${item.book.id}-${item.format || 'default'}-${index}`}>
            <ItemImage src={item.book.coverImageUrl || '/placeholder.png'} alt={item.book.title} />

            <ItemDetails>
              <Typography variant="subtitle2" fontWeight="bold">
                {item.book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {authors}
              </Typography>
              {item.format && (
                <Typography variant="body2" color="text.secondary">
                  Format: {item.format}
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary">
                Quantity: {item.quantity}
              </Typography>
            </ItemDetails>

            <Typography variant="subtitle2" fontWeight="bold">
              {formatCurrency(subtotal)}
            </Typography>
          </OrderItem>
        );
      })}
    </Box>
  );
};
