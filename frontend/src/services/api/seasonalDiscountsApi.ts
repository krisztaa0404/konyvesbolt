/**
 * Seasonal Discounts API service
 */
import { apiClient } from './apiClient';
import type { SeasonalDiscount } from '@types';

export const seasonalDiscountsApi = {
  async getActiveSeasonalDiscounts(): Promise<SeasonalDiscount[]> {
    const response = await apiClient.get<SeasonalDiscount[]>('/seasonal-discounts/active');
    return response.data;
  },
};
