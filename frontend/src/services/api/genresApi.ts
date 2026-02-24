/**
 * Genres API service
 */
import { apiClient } from './apiClient';
import type { GenreStatistics } from '@types';

export const genresApi = {
  async getGenreStatistics(): Promise<GenreStatistics[]> {
    const response = await apiClient.get<GenreStatistics[]>('/genres/statistics');
    return response.data;
  },
};
