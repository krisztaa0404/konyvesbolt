/**
 * Re-export commonly used types from the generated API types
 * This provides cleaner imports throughout the application
 */
import type { components } from './generated/api';

// User types
export type User = components['schemas']['UserDto'];
export type CreateUser = components['schemas']['CreateUserDto'];
export type UpdateUser = components['schemas']['UpdateUserDto'];
export type UpdateUserRole = components['schemas']['UpdateUserRoleDto'];
export type UpdateLoyalty = components['schemas']['UpdateLoyaltyDto'];
export type ChangePassword = components['schemas']['ChangePasswordDto'];

// Book types
export type Book = components['schemas']['BookDto'];
export type BookDetail = components['schemas']['BookDetailDto'];
export type CreateBook = components['schemas']['CreateBookDto'];
export type UpdateBook = components['schemas']['UpdateBookDto'];
export type BookMetadata = components['schemas']['BookMetadata'];
export type BookSearchFilter = components['schemas']['BookSearchFilterDto'];

// Order types
export type Order = components['schemas']['OrderDto'];
export type OrderDetail = components['schemas']['OrderDetailDto'];
export type OrderItem = components['schemas']['OrderItemDto'];
export type CreateOrder = components['schemas']['CreateOrderDto'];
export type CreateOrderItem = components['schemas']['CreateOrderItemDto'];
export type UpdateOrderStatus = components['schemas']['UpdateOrderStatusDto'];

// Genre types
export type Genre = components['schemas']['GenreDto'];
export type CreateGenre = components['schemas']['CreateGenreDto'];
export type UpdateGenre = components['schemas']['UpdateGenreDto'];
export type GenreStatistics = components['schemas']['GenreStatisticsDto'];

// Auth types
export type LoginRequest = components['schemas']['LoginRequestDto'];
export type RegisterRequest = components['schemas']['RegisterRequestDto'];
export type AuthResponse = components['schemas']['AuthResponseDto'];

// Dashboard types
export type DashboardMetrics = components['schemas']['DashboardMetricsDto'];

// Pagination types
export type PageUser = components['schemas']['PageUserDto'];
export type PageBook = components['schemas']['PageBookDto'];
export type PageOrder = components['schemas']['PageOrderDto'];

// Cart types (client-side only)
export interface CartItem {
  book: Book;
  quantity: number;
  format?: string;
}
