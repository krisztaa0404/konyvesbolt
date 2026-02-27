import { Typography, Chip, Button } from '@mui/material';
import { AddShoppingCart as AddShoppingCartIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@utils/formatters';
import { getBookDetailRoute } from '@router/routes';
import { useCartStore } from '@store/cartStore';
import { useNotificationStore } from '@store/notificationStore';
import { truncateText } from '@utils/formatters';
import type { Book } from '@types';
import {
  ListItemContainer,
  BookInfo,
  GenresContainer,
  PriceSection,
  StockBadge,
} from './BookList.sc';

interface BookListItemProps {
  book: Book;
}

export const BookListItem: React.FC<BookListItemProps> = ({ book }) => {
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
      cartStore.addItem(book, 1, 'physical');
      const truncatedTitle = truncateText(book.title, 40);
      addNotification(`"${truncatedTitle}" added to cart`);
    }
  };

  const displayedGenres = book.genres?.slice(0, 3) || [];

  return (
    <ListItemContainer onClick={handleClick} elevation={1}>
      <BookInfo>
        <Typography variant="h6" component="h3" noWrap>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap>
          by {book.authors?.join(', ')}
        </Typography>
        {displayedGenres.length > 0 && (
          <GenresContainer>
            {displayedGenres.map(genre => (
              <Chip key={genre.id} label={genre.name} size="small" />
            ))}
            {(book.genres?.length ?? 0) > 3 && (
              <Chip
                label={`+${(book.genres?.length ?? 0) - 3} more`}
                size="small"
                variant="outlined"
              />
            )}
          </GenresContainer>
        )}
      </BookInfo>

      <PriceSection>
        <Typography variant="h6" color="primary">
          {formatCurrency(book.price ?? 0)}
        </Typography>
        <StockBadge $inStock={inStock}>{inStock ? 'In Stock' : 'Out of Stock'}</StockBadge>
        <Button
          variant="contained"
          size="small"
          onClick={handleAddToCart}
          disabled={!inStock}
          startIcon={<AddShoppingCartIcon />}
        >
          Add to Cart
        </Button>
      </PriceSection>
    </ListItemContainer>
  );
};
