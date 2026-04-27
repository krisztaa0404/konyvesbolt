import { useState } from 'react';
import { Box, Button, Container, Typography, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMyWishlist } from '@hooks/useMyWishlist';
import { useClearWishlist } from '@hooks/useClearWishlist';
import { BookCard } from '@components/common/BookCard/BookCard';
import { BookCardSkeleton } from '@components/common/BookCard/BookCardSkeleton';
import { DeleteConfirmDialog } from '@components/manager/common/DeleteConfirmDialog/DeleteConfirmDialog';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { ROUTES } from '@router/routes';
import type { WishlistItem } from '@types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

export const WishlistPage = () => {
  const navigate = useNavigate();
  const { data: wishlist, isLoading, isError } = useMyWishlist();
  const clearWishlistMutation = useClearWishlist();
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const handleClearWishlist = () => {
    clearWishlistMutation.mutate(undefined, {
      onSuccess: () => {
        setClearDialogOpen(false);
      },
    });
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width={300} height={48} />
          <Skeleton variant="text" width={150} height={32} sx={{ mt: 1 }} />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 3,
          }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ErrorMessage title="Failed to load wishlist" message="Please try again later" />
      </Container>
    );
  }

  const items = wishlist?.items || [];
  const isEmpty = items.length === 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FavoriteIcon color="error" fontSize="large" />
          <Typography variant="h4" component="h1" fontWeight="bold">
            My Wishlist
          </Typography>
          <Typography variant="h6" color="text.secondary">
            ({items.length} {items.length === 1 ? 'item' : 'items'})
          </Typography>
        </Box>

        {!isEmpty && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteSweepIcon />}
            onClick={() => setClearDialogOpen(true)}
            disabled={clearWishlistMutation.isPending}
          >
            Clear Wishlist
          </Button>
        )}
      </Box>

      {isEmpty ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 2,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
          }}
        >
          <FavoriteIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            Your wishlist is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start adding books you love to your wishlist!
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate(ROUTES.BROWSE_BOOKS)}>
            Browse Books
          </Button>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 3,
            }}
          >
            {items
              .filter((item: WishlistItem) => item.book)
              .map((item: WishlistItem) => (
                <BookCard key={item.id} book={item.book!} />
              ))}
          </Box>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button variant="outlined" size="large" onClick={() => navigate(ROUTES.BROWSE_BOOKS)}>
              Continue Browsing
            </Button>
          </Box>
        </>
      )}

      {/* Clear Wishlist Confirmation Dialog */}
      <DeleteConfirmDialog
        open={clearDialogOpen}
        onClose={() => setClearDialogOpen(false)}
        onConfirm={handleClearWishlist}
        isPending={clearWishlistMutation.isPending}
        title="Clear Wishlist"
        message={`Are you sure you want to remove all ${items.length} ${items.length === 1 ? 'book' : 'books'} from your wishlist?`}
        confirmButtonText="Clear All"
        warningMessage="This action cannot be undone."
      />
    </Container>
  );
};
