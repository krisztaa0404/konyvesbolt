/**
 * Seasonal Discounts API service
 */
import { apiClient } from './apiClient';
import type { SeasonalDiscount } from '@types';

export const seasonalDiscountsApi = {
  async getActiveSeasonalDiscounts(signal?: AbortSignal): Promise<SeasonalDiscount[]> {
    const response = await apiClient.get<SeasonalDiscount[]>('/seasonal-discounts/active', {
      signal,
    });
    return response.data;
  },
};
