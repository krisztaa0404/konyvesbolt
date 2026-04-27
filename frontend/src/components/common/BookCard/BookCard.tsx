import { Typography, Chip } from '@mui/material';
import {
  AddShoppingCart as AddShoppingCartIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { formatCurrency, truncateText } from '@utils/formatters';
import { getBookDetailRoute } from '@router/routes';
import { useCartStore } from '@store/cartStore';
import { useWishlistStore } from '@store/customer/wishlistStore';
import { useNotificationStore } from '@store/notificationStore';
import { useAuthStore } from '@store/authStore';
import { useAddToWishlist } from '@hooks/useAddToWishlist';
import { useRemoveFromWishlist } from '@hooks/useRemoveFromWishlist';
import type { Book, BookDetail } from '@types';
import {
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  PriceBox,
  StockBadge,
  AddToCartButton,
  WishlistButton,
} from './BookCard.sc';

interface BookCardProps {
  book: Book | BookDetail;
  showSalesCount?: boolean;
}

export const BookCard = ({ book, showSalesCount = false }: BookCardProps) => {
  const navigate = useNavigate();
  const cartStore = useCartStore();
  const { addNotification } = useNotificationStore();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { isInWishlist, addItem, removeItem } = useWishlistStore(
    useShallow(state => ({
      isInWishlist: state.isInWishlist(book.id || ''),
      addItem: state.addItem,
      removeItem: state.removeItem,
    }))
  );
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();
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

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      addNotification('Please login to use wishlist', 'warning');
      return;
    }

    const truncatedTitle = truncateText(book.title, 40);

    if (isInWishlist) {
      removeItem(book.id!);
      removeFromWishlistMutation.mutate(book.id!);
      addNotification(`"${truncatedTitle}" removed from wishlist`);
    } else {
      addItem(book);
      addToWishlistMutation.mutate(book.id!);
      addNotification(`"${truncatedTitle}" added to wishlist`);
    }
  };

  return (
    <StyledCard onClick={handleClick}>
      <WishlistButton
        onClick={handleToggleWishlist}
        aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        size="small"
      >
        {isInWishlist ? <FavoriteIcon sx={{ color: 'error.main' }} /> : <FavoriteBorderIcon />}
      </WishlistButton>
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
