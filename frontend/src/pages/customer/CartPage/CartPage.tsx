import { Typography, Button, Chip, Divider } from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
  ShoppingCartOutlined as EmptyCartIcon,
  ArrowForward as ArrowForwardIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '@store/cartStore';
import { formatCurrency } from '@utils/formatters';
import { ROUTES, getBookDetailRoute } from '@router/routes';
import {
  CartContainer,
  CartContent,
  CartItemsSection,
  CartItemCard,
  ItemImage,
  ItemDetails,
  ItemActions,
  QuantityControls,
  QuantityButton,
  QuantityDisplay,
  SummaryCard,
  SummaryRow,
  TotalRow,
  EmptyCartContainer,
  EmptyCartIcon as StyledEmptyIcon,
  ClickableArea,
} from './CartPage.sc';

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalItems, getTotalPrice } = useCartStore();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const isEmpty = items.length === 0;

  const handleQuantityChange = (bookId: string, newQuantity: number, format?: string) => {
    if (newQuantity > 0) {
      updateQuantity(bookId, newQuantity, format);
    } else {
      removeItem(bookId, format);
    }
  };

  const handleRemoveItem = (bookId: string, format?: string) => {
    removeItem(bookId, format);
  };

  const handleItemClick = (bookId: string) => {
    navigate(getBookDetailRoute(bookId));
  };

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT);
  };

  const handleContinueShopping = () => {
    navigate(ROUTES.HOME);
  };

  if (isEmpty) {
    return (
      <CartContainer>
        <EmptyCartContainer>
          <StyledEmptyIcon>
            <EmptyCartIcon sx={{ fontSize: 'inherit' }} />
          </StyledEmptyIcon>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Looks like you haven't added any books yet.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<CartIcon />}
            onClick={handleContinueShopping}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </EmptyCartContainer>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
      </Typography>

      <CartContent>
        <CartItemsSection>
          {items.map((item) => (
            <CartItemCard key={`${item.book.id}-${item.format}`} elevation={2}>
              <ClickableArea onClick={() => handleItemClick(item.book.id!)}>
                <ItemImage
                  src={item.book.coverImageUrl || '/placeholder-book.jpg'}
                  alt={item.book.title}
                />

                <ItemDetails>
                  <Typography variant="h6" noWrap>
                    {item.book.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {item.book.authors?.join(', ')}
                  </Typography>
                  {item.format && (
                    <Chip label={item.format} size="small" variant="outlined" />
                  )}
                  <Typography variant="body2" color="text.secondary">
                    Price: {formatCurrency(item.book.price ?? 0)}
                  </Typography>
                </ItemDetails>
              </ClickableArea>

              <ItemActions>
                <Typography variant="h6" color="primary">
                  {formatCurrency((item.book.price ?? 0) * item.quantity)}
                </Typography>

                <QuantityControls>
                  <QuantityButton
                    size="small"
                    onClick={() => handleQuantityChange(item.book.id!, item.quantity - 1, item.format)}
                    disabled={item.quantity <= 1}
                  >
                    <RemoveIcon fontSize="small" />
                  </QuantityButton>

                  <QuantityDisplay>
                    <Typography variant="body1" fontWeight="bold">
                      {item.quantity}
                    </Typography>
                  </QuantityDisplay>

                  <QuantityButton
                    size="small"
                    onClick={() => handleQuantityChange(item.book.id!, item.quantity + 1, item.format)}
                    disabled={item.quantity >= (item.book.stockQuantity ?? 0)}
                  >
                    <AddIcon fontSize="small" />
                  </QuantityButton>
                </QuantityControls>

                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleRemoveItem(item.book.id!, item.format)}
                >
                  Remove
                </Button>
              </ItemActions>
            </CartItemCard>
          ))}
        </CartItemsSection>

        <SummaryCard elevation={3}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>

          <Divider />

          <SummaryRow>
            <Typography variant="body1">Subtotal ({totalItems} items):</Typography>
            <Typography variant="body1">{formatCurrency(totalPrice)}</Typography>
          </SummaryRow>

          <SummaryRow>
            <Typography variant="body2" color="text.secondary">Shipping:</Typography>
            <Typography variant="body2" color="text.secondary">
              Calculated at checkout
            </Typography>
          </SummaryRow>

          <TotalRow>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6" color="primary">
              {formatCurrency(totalPrice)}
            </Typography>
          </TotalRow>

          <Button
            variant="contained"
            size="large"
            fullWidth
            endIcon={<ArrowForwardIcon />}
            onClick={handleCheckout}
            sx={{ mt: 2 }}
          >
            Proceed to Checkout
          </Button>

          <Button
            variant="outlined"
            size="medium"
            fullWidth
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </Button>
        </SummaryCard>
      </CartContent>
    </CartContainer>
  );
};
