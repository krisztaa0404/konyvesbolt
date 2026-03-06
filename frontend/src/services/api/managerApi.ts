/**
 * Manager API service
 * Handles manager-specific endpoints (dashboard, admin operations)
 */
import { apiClient } from './apiClient';
import type {
  DashboardMetrics,
  PageOrder,
  Pageable,
  OrderFilter,
  OrderDetail,
  OrderStatus,
  PageBook,
  Book,
  CreateBook,
  UpdateBook,
} from '@types';

/**
 * Parameters for getAllOrders with filtering and pagination
 */
export interface GetAllOrdersParams {
  filter?: OrderFilter;
  pageable?: Pageable;
}

/**
 * Parameters for getAllBooks with filtering and pagination
 */
export interface GetAllBooksParams {
  filter?: {
    search?: string;
    stockStatus?: string;
  };
  pageable?: Pageable;
}

export const managerApi = {
  /**
   * Get dashboard metrics for manager overview
   */
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const response = await apiClient.get<DashboardMetrics>('/manager/dashboard/metrics');
    return response.data;
  },

  /**
   * Get all orders with pagination and filtering (manager view)
   */
  async getAllOrders(params?: GetAllOrdersParams): Promise<PageOrder> {
    const response = await apiClient.get<PageOrder>('/orders', {
      params: {
        ...params?.filter,
        page: params?.pageable?.page ?? 0,
        size: params?.pageable?.size ?? 20,
        sort: params?.pageable?.sort ?? ['orderDate,desc'],
      },
    });
    return response.data;
  },

  /**
   * Get detailed information for a specific order (manager view)
   */
  async getOrderById(orderId: string): Promise<OrderDetail> {
    const response = await apiClient.get<OrderDetail>(`/orders/${orderId}`);
    return response.data;
  },

  /**
   * Update order status (manager only)
   */
  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<OrderDetail> {
    const response = await apiClient.put<OrderDetail>(`/orders/${orderId}/status`, { status });
    return response.data;
  },

  /**
   * Get all books with pagination and filtering (manager view)
   */
  async getAllBooks(params?: GetAllBooksParams): Promise<PageBook> {
    const response = await apiClient.get<PageBook>('/books', {
      params: {
        ...params?.filter,
        page: params?.pageable?.page ?? 0,
        size: params?.pageable?.size ?? 20,
        sort: params?.pageable?.sort ?? ['createdAt,desc'],
      },
    });
    return response.data;
  },

  /**
   * Delete a book (manager only)
   */
  async deleteBook(bookId: string): Promise<void> {
    await apiClient.delete(`/books/${bookId}`);
  },

  /**
   * Create a new book (manager only)
   */
  async createBook(book: CreateBook): Promise<Book> {
    const response = await apiClient.post<Book>('/books', book);
    return response.data;
  },

  /**
   * Update a book (manager only)
   */
  async updateBook(bookId: string, book: UpdateBook): Promise<Book> {
    const response = await apiClient.put<Book>(`/books/${bookId}`, book);
    return response.data;
  },
};
