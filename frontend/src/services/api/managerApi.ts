/**
 * Manager API service
 * Handles manager-specific endpoints (dashboard, admin operations)
 */
import { apiClient } from './apiClient';
import type {DashboardMetrics, PageOrder, Pageable, OrderFilter} from '@types';

/**
 * Parameters for getAllOrders with filtering and pagination
 */
export interface GetAllOrdersParams {
  filter?: OrderFilter
  pageable?: Pageable
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
};
