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
  Genre,
  CreateGenre,
  UpdateGenre,
  GenreFilter,
  PageGenre,
  PageSeasonalDiscount,
  SeasonalDiscount,
  CreateSeasonalDiscount,
  UpdateSeasonalDiscount,
  DiscountScopeType,
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

/**
 * Parameters for getAllGenres with filtering and pagination
 */
export interface GetAllGenresParams {
  filter?: GenreFilter;
  pageable?: Pageable;
}

/**
 * Parameters for getAllDiscounts with filtering and pagination
 */
export interface GetAllDiscountsParams {
  filter?: {
    name?: string;
    isActive?: boolean;
    scopeType?: DiscountScopeType;
    activeAt?: string;
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

  /**
   * Get all genres with pagination and filtering
   */
  async getAllGenres(params?: GetAllGenresParams): Promise<PageGenre> {
    const response = await apiClient.get<PageGenre>('/genres', {
      params: {
        ...params?.filter,
        page: params?.pageable?.page ?? 0,
        size: params?.pageable?.size ?? 20,
        sort: params?.pageable?.sort ?? ['name,asc'],
      },
    });
    return response.data;
  },

  /**
   * Create a new genre (manager only)
   */
  async createGenre(genre: CreateGenre): Promise<Genre> {
    const response = await apiClient.post<Genre>('/genres', genre);
    return response.data;
  },

  /**
   * Update a genre (manager only)
   */
  async updateGenre(genreId: string, genre: UpdateGenre): Promise<Genre> {
    const response = await apiClient.put<Genre>(`/genres/${genreId}`, genre);
    return response.data;
  },

  /**
   * Delete a genre (manager only)
   */
  async deleteGenre(genreId: string): Promise<void> {
    await apiClient.delete(`/genres/${genreId}`);
  },

  /**
   * Get all discounts with pagination and filtering
   */
  async getAllDiscounts(params?: GetAllDiscountsParams): Promise<PageSeasonalDiscount> {
    const response = await apiClient.get<PageSeasonalDiscount>('/seasonal-discounts', {
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
   * Get a specific discount by ID
   */
  async getDiscountById(discountId: string): Promise<SeasonalDiscount> {
    const response = await apiClient.get<SeasonalDiscount>(`/seasonal-discounts/${discountId}`);
    return response.data;
  },

  /**
   * Create a new discount (manager only)
   */
  async createDiscount(discount: CreateSeasonalDiscount): Promise<SeasonalDiscount> {
    const response = await apiClient.post<SeasonalDiscount>('/seasonal-discounts', discount);
    return response.data;
  },

  /**
   * Update a discount (manager only)
   */
  async updateDiscount(
    discountId: string,
    discount: UpdateSeasonalDiscount
  ): Promise<SeasonalDiscount> {
    const response = await apiClient.put<SeasonalDiscount>(
      `/seasonal-discounts/${discountId}`,
      discount
    );
    return response.data;
  },

  /**
   * Deactivate a discount (manager only)
   */
  async deactivateDiscount(discountId: string): Promise<void> {
    await apiClient.patch(`/seasonal-discounts/${discountId}/deactivate`);
  },

  /**
   * Activate a discount (manager only)
   */
  async activateDiscount(discountId: string): Promise<void> {
    await apiClient.patch(`/seasonal-discounts/${discountId}/activate`);
  },

  /**
   * Delete a discount (manager only)
   */
  async deleteDiscount(discountId: string): Promise<void> {
    await apiClient.delete(`/seasonal-discounts/${discountId}`);
  },
};
