/**
 * Genres API service
 */
import { apiClient } from './apiClient';
import type { Genre, GenreStatistics } from '@types';

export const genresApi = {
  async getGenreStatistics(): Promise<GenreStatistics[]> {
    const response = await apiClient.get<GenreStatistics[]>('/genres/statistics');
    return response.data;
  },

  async getGenres(): Promise<Genre[]> {
    const response = await apiClient.get<Genre[]>('/genres');
    return response.data;
  },
};
