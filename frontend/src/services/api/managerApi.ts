/**
 * Manager API service
 * Handles manager-specific endpoints (dashboard, admin operations)
 */
import { apiClient } from './apiClient';
import type { DashboardMetrics, PageOrder } from '@types';

export const managerApi = {
  /**
   * Get dashboard metrics for manager overview
   */
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    const response = await apiClient.get<DashboardMetrics>('/manager/dashboard/metrics');
    return response.data;
  },

  /**
   * Get all orders with pagination (manager view)
   */
  async getAllOrders(page: number = 0, size: number = 20): Promise<PageOrder> {
    const response = await apiClient.get<PageOrder>('/orders', {
      params: { page, size, sort: 'orderDate,desc' },
    });
    return response.data;
  },
};
