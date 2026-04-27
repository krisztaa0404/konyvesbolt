/**
 * Re-export commonly used types from the generated API types
 * This provides cleaner imports throughout the application
 */
import type { components } from './generated/api';

// Address types
export type AddressDto = components['schemas']['AddressDto'];

// User types
export type User = components['schemas']['UserDto'];
export type CreateUser = components['schemas']['CreateUserDto'];
export type UpdateUser = components['schemas']['UpdateUserDto'];
export type UpdateUserRole = components['schemas']['UpdateUserRoleDto'];
export type UpdateLoyalty = components['schemas']['UpdateLoyaltyDto'];
export type ChangePassword = components['schemas']['ChangePasswordDto'];
export type Preferences = components['schemas']['PreferencesDto'];
export type UserFilter = components['schemas']['UserSearchFilterDto'];

// Book types
export type Book = components['schemas']['BookDto'];
export type BookDetail = components['schemas']['BookDetailDto'];
export type CreateBook = components['schemas']['CreateBookDto'];
export type UpdateBook = components['schemas']['UpdateBookDto'];
export type BookSearchFilter = components['schemas']['BookSearchFilterDto'];
export type BulkBookUploadResult = components['schemas']['BulkBookUploadResultDto'];
export type SkippedRow = components['schemas']['SkippedRowDto'];

// Order types
export type Order = components['schemas']['OrderDto'];
export type OrderDetail = components['schemas']['OrderDetailDto'];
export type OrderItem = components['schemas']['OrderItemDto'];
export type OrderFilter = components['schemas']['OrderFilterDto'];
export type CreateOrderItem = components['schemas']['CreateOrderItemDto'];
export type UpdateOrderStatus = components['schemas']['UpdateOrderStatusDto'];

// Extended CreateOrder type with seasonalDiscountId
export type CreateOrder = components['schemas']['CreateOrderDto'];

// Genre types
export type Genre = components['schemas']['GenreDto'];
export type CreateGenre = components['schemas']['CreateGenreDto'];
export type UpdateGenre = components['schemas']['UpdateGenreDto'];
export type GenreStatistics = components['schemas']['GenreStatisticsDto'];
export type GenreFilter = components['schemas']['GenreFilterDto'];
export type PageGenre = components['schemas']['PagedModelGenreDto'];

// Auth types
export type LoginRequest = components['schemas']['LoginRequestDto'];
export type RegisterRequest = components['schemas']['RegisterRequestDto'];
export type AuthResponse = components['schemas']['AuthResponseDto'];
export type RefreshTokenRequest = components['schemas']['RefreshTokenRequestDto'];
export type RefreshTokenResponse = components['schemas']['RefreshTokenResponseDto'];
export type LogoutRequest = components['schemas']['LogoutRequestDto'];

// Dashboard types
export type DashboardMetrics = components['schemas']['DashboardMetricsDto'];

// Seasonal Discount types
export type SeasonalDiscount = components['schemas']['SeasonalDiscountDto'];
export type DetailedSeasonalDiscount = components['schemas']['DetailedSeasonalDiscountDto'];
export type CreateSeasonalDiscount = components['schemas']['CreateSeasonalDiscountDto'];
export type UpdateSeasonalDiscount = components['schemas']['UpdateSeasonalDiscountDto'];
export type PageSeasonalDiscount = components['schemas']['PagedModelSeasonalDiscountDto'];
export type NamedEntityRef = components['schemas']['NamedEntityRefDto'];

// Wishlist types
export type WishlistDetail = components['schemas']['WishlistDetailDto'];
export type WishlistItem = components['schemas']['WishlistItemDto'];
export type AddToWishlist = components['schemas']['AddToWishlistDto'];

// Pagination types
export type Pageable = components['schemas']['Pageable'];
export type PageMetadata = components['schemas']['PageMetadata'];
export type PageUser = components['schemas']['PagedModelUserDto'];
export type PageBook = components['schemas']['PagedModelBookDto'];
export type PageOrder = components['schemas']['PagedModelOrderDto'];

// Book format type (matches API enum)
export type BookFormat = 'physical' | 'ebook' | 'audiobook';

// Discount scope type (matches API enum)
export type DiscountScopeType = 'ALL_BOOKS' | 'SPECIFIC_BOOKS';

// Discount scope type constants
export const DISCOUNT_SCOPE = {
  ALL_BOOKS: 'ALL_BOOKS' as const,
  SPECIFIC_BOOKS: 'SPECIFIC_BOOKS' as const,
} satisfies Record<string, DiscountScopeType>;

// Cart types (client-side only)
export interface CartItem {
  book: Book;
  quantity: number;
  format?: BookFormat;
}

// Notification types (client-side only)
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

// Browse Books params - combines filter with pagination
export interface BrowseBooksParams extends BookSearchFilter {
  // Pagination params
  page?: number | null;
  size?: number;
  sort?: string | null;
}

// Discount types
export type DiscountType = 'loyalty' | 'seasonal' | 'none';
