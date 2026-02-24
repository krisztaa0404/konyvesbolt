/**
 * Reusable BookCard component for displaying book information
 */
import { Typography, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@utils/formatters';
import { getBookDetailRoute } from '@router/routes';
import type { Book } from '@types';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  PriceBox,
  StockBadge,
} from './BookCard.sc';

interface BookCardProps {
  book: Book;
  showSalesCount?: boolean;
}

export const BookCard = ({ book, showSalesCount = false }: BookCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (book.id) {
      navigate(getBookDetailRoute(book.id));
    }
  };

  const inStock = (book.stockQuantity ?? 0) > 0;

  return (
    <StyledCard onClick={handleClick}>
      <StyledCardMedia
        image={book.coverImageUrl || '/placeholder-book.jpg'}
        title={book.title}
      />
      <StyledCardContent>
        <Typography variant="h6" component="h3" noWrap>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          {book.authors?.join(', ')}
        </Typography>
        {showSalesCount && book.salesCount !== undefined && (
          <Chip
            label={`${book.salesCount} sold`}
            size="small"
            color="secondary"
          />
        )}
        <PriceBox>
          <Typography variant="h6" color="primary">
            {formatCurrency(book.price ?? 0)}
          </Typography>
          <StockBadge inStock={inStock}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </StockBadge>
        </PriceBox>
      </StyledCardContent>
    </StyledCard>
  );
};
