/**
 * Cart store using Zustand with localStorage persistence
 * Manages shopping cart state
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Book } from '@types';

interface CartState {
  items: CartItem[];

  // Actions
  addItem: (book: Book, quantity?: number, format?: string) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (book: Book, quantity = 1, format) => {
        set(state => {
          const existingItem = state.items.find(
            item => item.book.id === book.id && item.format === format
          );

          if (existingItem) {
            // Increment quantity if item already exists
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

      removeItem: (bookId: string) => {
        set(state => ({
          items: state.items.filter(item => item.book.id !== bookId),
        }));
      },

      updateQuantity: (bookId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(bookId);
          return;
        }

        set(state => ({
          items: state.items.map(item => (item.book.id === bookId ? { ...item, quantity } : item)),
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
    }
  )
);
