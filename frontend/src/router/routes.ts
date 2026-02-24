/**
 * Route constants
 * Centralized location for all application routes
 */

// Public routes
export const ROUTES = {
  HOME: '/',
  BROWSE_BOOKS: '/books',
  BOOK_DETAIL: '/books/:id',
  BESTSELLERS: '/bestsellers',
  LOGIN: '/login',
  REGISTER: '/register',

  // Protected customer routes
  CART: '/cart',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
  ORDER_CONFIRMATION: '/orders/:id/confirmation',

  // Manager routes
  MANAGER_DASHBOARD: '/manager',
  MANAGER_ORDERS: '/manager/orders',
  MANAGER_ORDER_DETAIL: '/manager/orders/:id',
  MANAGER_BOOKS: '/manager/books',
  MANAGER_ADD_BOOK: '/manager/books/new',
  MANAGER_EDIT_BOOK: '/manager/books/:id/edit',
  MANAGER_USERS: '/manager/users',
} as const;

// Helper functions to generate routes with parameters
export const getBookDetailRoute = (id: string) => `/books/${id}`;
export const getOrderConfirmationRoute = (id: string) => `/orders/${id}/confirmation`;
export const getManagerOrderDetailRoute = (id: string) => `/manager/orders/${id}`;
export const getManagerEditBookRoute = (id: string) => `/manager/books/${id}/edit`;
