/**
 * Books API service
 */
import { apiClient } from './apiClient';
import type { Book, BookDetail, PageBook } from '@types';

export const booksApi = {
  async getNewestBooks(size: number = 10): Promise<PageBook> {
    const response = await apiClient.get<PageBook>('/books/newest', {
      params: { size },
    });
    return response.data;
  },

  async getTopWeeklyBooks(limit: number = 10): Promise<Book[]> {
    const response = await apiClient.get<Book[]>('/books/top-weekly', {
      params: { limit },
    });
    return response.data;
  },

  async getTopMonthlyBooks(limit: number = 10): Promise<Book[]> {
    const response = await apiClient.get<Book[]>('/books/top-monthly', {
      params: { limit },
    });
    return response.data;
  },

  async getBook(id: string): Promise<BookDetail> {
    const response = await apiClient.get<BookDetail>(`/books/${id}`);
    return response.data;
  },

  async getBookRecommendations(id: string, limit: number = 6): Promise<Book[]> {
    const response = await apiClient.get<Book[]>(`/books/${id}/recommendations`, {
      params: { limit },
    });
    return response.data;
  },
};
