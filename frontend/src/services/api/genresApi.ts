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
  async getGenreStatistics(signal?: AbortSignal): Promise<GenreStatistics[]> {
    const response = await apiClient.get<GenreStatistics[]>('/genres/statistics', {
      signal,
    });
    return response.data;
  },

  async getGenres(params?: GetGenresParams, signal?: AbortSignal): Promise<PageGenre> {
    const response = await apiClient.get<PageGenre>('/genres', {
      params,
      signal,
    });
    return response.data;
  },

  async getGenre(id: string, signal?: AbortSignal): Promise<Genre> {
    const response = await apiClient.get<Genre>(`/genres/${id}`, {
      signal,
    });
    return response.data;
  },
};
