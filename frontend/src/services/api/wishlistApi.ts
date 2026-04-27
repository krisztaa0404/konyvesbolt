import { apiClient } from './apiClient';
import type { WishlistDetail } from '@types';

export const wishlistApi = {
  async getMyWishlist(signal?: AbortSignal): Promise<WishlistDetail> {
    const response = await apiClient.get<WishlistDetail>('/wishlist', { signal });
    return response.data;
  },

  async addToWishlist(bookId: string): Promise<WishlistDetail> {
    const response = await apiClient.post<WishlistDetail>('/wishlist', { bookId });
    return response.data;
  },

  async removeFromWishlist(bookId: string): Promise<void> {
    await apiClient.delete(`/wishlist/${bookId}`);
  },

  async clearWishlist(): Promise<void> {
    await apiClient.delete('/wishlist');
  },

  async isInWishlist(bookId: string, signal?: AbortSignal): Promise<boolean> {
    const response = await apiClient.get<boolean>(`/wishlist/check/${bookId}`, { signal });
    return response.data;
  },
};
