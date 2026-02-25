/**
 * Cart store using Zustand with localStorage persistence
 * Manages shopping cart state
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem, Book } from '@types';

interface CartState {
  items: CartItem[];

  // Actions
  addItem: (book: Book, quantity?: number, format?: string) => void;
  removeItem: (bookId: string, format?: string) => void;
  updateQuantity: (bookId: string, quantity: number, format?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist<CartState>(
    (set, get) => ({
      items: [],

      addItem: (book: Book, quantity = 1, format) => {
        set(state => {
          const existingItem = state.items.find(
            item => item.book.id === book.id && item.format === format
          );

          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.book.id === book.id && item.format === format
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            // Add new item
            return {
              items: [...state.items, { book, quantity, format }],
            };
          }
        });
      },

      removeItem: (bookId: string, format?: string) => {
        set(state => ({
          items: state.items.filter(
            item => !(item.book.id === bookId && item.format === format)
          ),
        }));
      },

      updateQuantity: (bookId: string, quantity: number, format?: string) => {
        if (quantity <= 0) {
          get().removeItem(bookId, format);
          return;
        }

        set(state => ({
          items: state.items.map(item =>
            item.book.id === bookId && item.format === format ? { ...item, quantity } : item
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
