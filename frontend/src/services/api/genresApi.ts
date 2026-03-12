/**
 * Genres API service
 */
import { apiClient } from './apiClient';
import type { Genre, GenreStatistics, PageGenre } from '@types';

interface GetGenresParams {
  name?: string;
  page?: number;
  size?: number;
}

export const genresApi = {
  async getGenreStatistics(): Promise<GenreStatistics[]> {
    const response = await apiClient.get<GenreStatistics[]>('/genres/statistics');
    return response.data;
  },

  async getGenres(params?: GetGenresParams): Promise<PageGenre> {
    const response = await apiClient.get<PageGenre>('/genres', { params });
    return response.data;
  },

  async getGenre(id: string): Promise<Genre> {
    const response = await apiClient.get<Genre>(`/genres/${id}`);
    return response.data;
  },
};
