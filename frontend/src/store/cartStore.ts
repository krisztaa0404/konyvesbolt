/**
 * Cart store using Zustand with localStorage persistence
 * Manages shopping cart state
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { normalizeBookFormat } from '@utils/formatters';
import type { CartItem, Book, BookFormat } from '@types';

interface CartState {
  items: CartItem[];

  // Actions
  addItem: (book: Book, quantity?: number, format?: string | BookFormat) => void;
  removeItem: (bookId: string, format?: string | BookFormat) => void;
  updateQuantity: (bookId: string, quantity: number, format?: string | BookFormat) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set, get) => ({
      items: [],

      addItem: (book: Book, quantity = 1, format) => {
        const normalizedFormat = format ? normalizeBookFormat(format) : undefined;

        set(state => {
          const existingItem = state.items.find(
            item => item.book.id === book.id && item.format === normalizedFormat
          );

          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.book.id === book.id && item.format === normalizedFormat
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            return {
              items: [...state.items, { book, quantity, format: normalizedFormat }],
            };
          }
        });
      },

      removeItem: (bookId: string, format?: string | BookFormat) => {
        const normalizedFormat = format ? normalizeBookFormat(format) : undefined;
        set(state => ({
          items: state.items.filter(
            item => !(item.book.id === bookId && item.format === normalizedFormat)
          ),
        }));
      },

      updateQuantity: (bookId: string, quantity: number, format?: string | BookFormat) => {
        const normalizedFormat = format ? normalizeBookFormat(format) : undefined;
        if (quantity <= 0) {
          get().removeItem(bookId, normalizedFormat);
          return;
        }

        set(state => ({
          items: state.items.map(item =>
            item.book.id === bookId && item.format === normalizedFormat
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.book.price || 0) * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
