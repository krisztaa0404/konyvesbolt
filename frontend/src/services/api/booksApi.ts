/**
 * Books API service
 */
import { apiClient } from './apiClient';
import type { Book, BookDetail, PageBook, BrowseBooksParams } from '@types';

export const booksApi = {
  async getNewestBooks(size: number = 10, signal?: AbortSignal): Promise<PageBook> {
    const response = await apiClient.get<PageBook>('/books/newest', {
      params: { size },
      signal,
    });
    return response.data;
  },

  async getTopWeeklyBooks(limit: number = 10, signal?: AbortSignal): Promise<Book[]> {
    const response = await apiClient.get<Book[]>('/books/top-weekly', {
      params: { limit },
      signal,
    });
    return response.data;
  },

  async getTopMonthlyBooks(limit: number = 10, signal?: AbortSignal): Promise<Book[]> {
    const response = await apiClient.get<Book[]>('/books/top-monthly', {
      params: { limit },
      signal,
    });
    return response.data;
  },

  async getBook(id: string, signal?: AbortSignal): Promise<BookDetail> {
    const response = await apiClient.get<BookDetail>(`/books/${id}`, {
      signal,
    });
    return response.data;
  },

  async getBookRecommendations(
    id: string,
    limit: number = 6,
    signal?: AbortSignal
  ): Promise<Book[]> {
    const response = await apiClient.get<Book[]>(`/books/${id}/recommendations`, {
      params: { limit },
      signal,
    });
    return response.data;
  },

  async getBooksWithFilters(params: BrowseBooksParams, signal?: AbortSignal): Promise<PageBook> {
    const response = await apiClient.get<PageBook>('/books', {
      params,
      signal,
    });
    return response.data;
  },
};
