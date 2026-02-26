/**
 * Reusable BookCard component for displaying book information
 */
import { Typography, Chip } from '@mui/material';
import { AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { formatCurrency, truncateText } from '@utils/formatters';
import { getBookDetailRoute } from '@router/routes';
import { useCartStore } from '@store/cartStore';
import { useNotificationStore } from '@store/notificationStore';
import type { Book, BookDetail } from '@types';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  PriceBox,
  StockBadge,
  AddToCartButton,
} from './BookCard.sc';

interface BookCardProps {
  book: Book | BookDetail;
  showSalesCount?: boolean;
}

export const BookCard = ({ book, showSalesCount = false }: BookCardProps) => {
  const navigate = useNavigate();
  const cartStore = useCartStore();
  const { addNotification } = useNotificationStore();
  const inStock = (book.stockQuantity ?? 0) > 0;

  const handleClick = () => {
    if (book.id) {
      navigate(getBookDetailRoute(book.id));
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inStock) {
      const format =
        'availableFormats' in book && book.availableFormats && book.availableFormats.length > 0
          ? book.availableFormats[0]
          : 'physical';
      cartStore.addItem(book, 1, format);
      const truncatedTitle = truncateText(book.title, 40);
      addNotification(`"${truncatedTitle}" added to cart`);
    }
  };

  return (
    <StyledCard onClick={handleClick}>
      <AddToCartButton
        onClick={handleAddToCart}
        disabled={!inStock}
        aria-label="Add to cart"
        size="small"
      >
        <AddShoppingCartIcon />
      </AddToCartButton>
      <StyledCardMedia image={book.coverImageUrl || '/placeholder-book.jpg'} title={book.title} />
      <StyledCardContent>
        <Typography variant="h6" component="h3" noWrap>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {book.authors?.join(', ')}
        </Typography>
        {showSalesCount && book.salesCount !== undefined && (
          <Chip label={`${book.salesCount} sold`} size="small" color="secondary" />
        )}
        <PriceBox>
          <Typography variant="h6" color="primary">
            {formatCurrency(book.price ?? 0)}
          </Typography>
          <StockBadge $inStock={inStock}>{inStock ? 'In Stock' : 'Out of Stock'}</StockBadge>
        </PriceBox>
      </StyledCardContent>
    </StyledCard>
  );
};
