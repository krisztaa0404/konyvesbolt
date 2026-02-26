/**
 * Orders API service
 * Handles fetching user orders
 */
import { apiClient } from './apiClient';
import type { OrderDetail, PageOrder } from '@types';

export const ordersApi = {
  /**
   * Get current user's orders with pagination
   */
  async getMyOrders(page: number = 0, size: number = 20): Promise<PageOrder> {
    const response = await apiClient.get<PageOrder>('/orders/my-orders', {
      params: { page, size },
    });
    return response.data;
  },

  /**
   * Get detailed information for a specific order
   */
  async getMyOrderById(orderId: string): Promise<OrderDetail> {
    const response = await apiClient.get<OrderDetail>(`/orders/my-orders/${orderId}`);
    return response.data;
  },
};
