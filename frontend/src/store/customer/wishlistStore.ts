import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Book } from '@types';

export interface WishlistItem {
  book: Book;
  createdAt: Date;
}

interface WishlistState {
  items: WishlistItem[];

  // Actions
  addItem: (book: Book) => void;
  removeItem: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  clearWishlist: () => void;

  // Computed
  getTotalItems: () => number;
  getItemByBookId: (bookId: string) => WishlistItem | undefined;
}

export const useWishlistStore = create<WishlistState>()(
  persist<WishlistState>(
    (set, get) => ({
      items: [],

      addItem: (book: Book) => {
        const { items } = get();

        const exists = items.some(item => item.book.id === book.id);
        if (exists) {
          return;
        }

        const newItem: WishlistItem = {
          book,
          createdAt: new Date(),
        };

        set({ items: [...items, newItem] });
      },

      removeItem: (bookId: string) => {
        set(state => ({
          items: state.items.filter(item => item.book.id !== bookId),
        }));
      },

      isInWishlist: (bookId: string) => {
        const { items } = get();
        return items.some(item => item.book.id === bookId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.length;
      },

      getItemByBookId: (bookId: string) => {
        return get().items.find(item => item.book.id === bookId);
      },
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
