import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box, Chip, Button, IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useBook } from '@hooks/useBook';
import { useBookRecommendations } from '@hooks/useBookRecommendations';
import { useCartStore } from '@store/cartStore';
import { useNotificationStore } from '@store/notificationStore';
import { LoadingSpinner } from '@components/common/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { BookCard } from '@components/common/BookCard/BookCard';
import { BookCardSkeleton } from '@components/common/BookCard/BookCardSkeleton';
import { formatCurrency, truncateText } from '@utils/formatters';
import {
  DetailContainer,
  MainContent,
  ImageContainer,
  CoverImage,
  InfoContainer,
  PriceBox,
  StockBadge,
  QuantityControls,
  QuantityDisplay,
  AddToCartSection,
  MetadataGrid,
  DescriptionBox,
  RecommendationsSection,
  RecommendationsGrid,
} from './BookDetailPage.sc';

export const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError, error } = useBook(id!);
  const { data: recommendations, isLoading: isLoadingRecs } = useBookRecommendations(id!, 5);
  const { items, addItem } = useCartStore();
  const { addNotification } = useNotificationStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState<string>('');

  if (book && !selectedFormat && book.availableFormats && book.availableFormats.length > 0) {
    setSelectedFormat(book.availableFormats[0]);
  }

  const cartItem = useMemo(() => {
    if (!book?.id) return null;
    return items.find(item => item.book.id === book.id && item.format === selectedFormat);
  }, [items, book?.id, selectedFormat]);

  const isInCart = !!cartItem;
  const cartQuantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (book && book?.stockQuantity && book.stockQuantity > 0) {
      addItem(book, quantity, selectedFormat);
      const quantityText = quantity > 1 ? ` (${quantity})` : '';
      const truncatedTitle = truncateText(book.title, 40);
      addNotification(`"${truncatedTitle}"${quantityText} added to cart`);
      setQuantity(1);
    }
  };

  if (isLoading) return <LoadingSpinner fullPage />;
  if (isError || !book) return <ErrorMessage message={error?.message || 'Book not found'} />;

  return (
    <DetailContainer>
      <MainContent>
        <InfoContainer>
          <Typography variant="h3">{book.title}</Typography>

          {book.authors && book.authors.length > 0 && (
            <Typography variant="h6" color="text.secondary">
              {book.authors.join(', ')}
            </Typography>
          )}

          {book.genres && book.genres.length > 0 && (
            <Box display="flex" gap={1} flexWrap="wrap">
              {book.genres.map(genre => (
                <Chip key={genre.id} label={genre.name} />
              ))}
            </Box>
          )}

          <PriceBox>
            <Typography variant="h4" color="primary">
              {formatCurrency(book?.price ?? 0)}
            </Typography>
            <StockBadge
              $inStock={!!book?.stockQuantity && book.stockQuantity > 0}
              label={
                book?.stockQuantity && book.stockQuantity > 0
                  ? `${book.stockQuantity} in stock`
                  : 'Out of Stock'
              }
            />
          </PriceBox>

          <MetadataGrid>
            {book.isbn && (
              <>
                <Typography variant="body2" fontWeight="bold">
                  ISBN:
                </Typography>
                <Typography variant="body2">{book.isbn}</Typography>
              </>
            )}

            {book.publisher && (
              <>
                <Typography variant="body2" fontWeight="bold">
                  Publisher:
                </Typography>
                <Typography variant="body2">{book.publisher}</Typography>
              </>
            )}

            {book.publicationYear && (
              <>
                <Typography variant="body2" fontWeight="bold">
                  Publication Year:
                </Typography>
                <Typography variant="body2">{book.publicationYear}</Typography>
              </>
            )}

            {book.pageCount && (
              <>
                <Typography variant="body2" fontWeight="bold">
                  Pages:
                </Typography>
                <Typography variant="body2">{book.pageCount}</Typography>
              </>
            )}
          </MetadataGrid>

          {book.availableFormats && book.availableFormats.length > 0 && (
            <Box>
              <Typography variant="body2" fontWeight="bold" gutterBottom>
                Available Formats:
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {book.availableFormats.map(format => (
                  <Chip
                    key={format}
                    label={format}
                    onClick={() => setSelectedFormat(format)}
                    color={selectedFormat === format ? 'primary' : 'default'}
                    clickable
                  />
                ))}
              </Box>
            </Box>
          )}

          <AddToCartSection>
            {isInCart && (
              <Box display="flex" alignItems="center" gap={1} sx={{ mb: 1 }}>
                <ShoppingCartIcon color="success" fontSize="small" />
                <Typography variant="body2" color="success.main" fontWeight="bold">
                  {cartQuantity} {cartQuantity === 1 ? 'item' : 'items'} in cart
                </Typography>
              </Box>
            )}

            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Quantity
              </Typography>
              <QuantityControls>
                <IconButton
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  color="primary"
                  size="small"
                >
                  <RemoveIcon />
                </IconButton>
                <QuantityDisplay>
                  <Typography variant="h6" fontWeight="bold">
                    {quantity}
                  </Typography>
                </QuantityDisplay>
                <IconButton
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= (book?.stockQuantity ?? 0)}
                  color="primary"
                  size="small"
                >
                  <AddIcon />
                </IconButton>
              </QuantityControls>
            </Box>

            <Button
              variant="contained"
              size="large"
              startIcon={<AddShoppingCartIcon />}
              onClick={handleAddToCart}
              disabled={book.stockQuantity === 0}
              fullWidth
            >
              {isInCart ? 'Add More to Cart' : 'Add to Cart'}
            </Button>
          </AddToCartSection>
        </InfoContainer>

        <ImageContainer>
          <CoverImage src={book.coverImageUrl || '/placeholder-book.jpg'} alt={book.title} />
        </ImageContainer>
      </MainContent>

      {book.description && (
        <DescriptionBox>
          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {book.description}
          </Typography>
        </DescriptionBox>
      )}

      {book.tags && book.tags.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Tags:
          </Typography>
          <Box display="flex" gap={1} flexWrap="wrap">
            {book.tags.map(tag => (
              <Chip key={tag} label={tag} size="small" variant="outlined" />
            ))}
          </Box>
        </Box>
      )}

      <RecommendationsSection>
        <Typography variant="h5" gutterBottom>
          You Might Also Like
        </Typography>
        {isLoadingRecs ? (
          <RecommendationsGrid>
            {Array.from({ length: 5 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </RecommendationsGrid>
        ) : recommendations && recommendations.length > 0 ? (
          <RecommendationsGrid>
            {recommendations.map(rec => (
              <BookCard key={rec.id} book={rec} />
            ))}
          </RecommendationsGrid>
        ) : null}
      </RecommendationsSection>
    </DetailContainer>
  );
};
