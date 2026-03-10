import { create } from 'zustand';

interface ManagerFilterState<T extends string = string> {
  searchTerm: string;
  statusFilter?: T;
  setSearchTerm: (term: string) => void;
  updateStatusFilter: (status?: string) => void;
  clearFilters: () => void;
}

/**
 * Creates a Zustand store for manager-side filtering.
 * Generic factory for books, orders, genres, etc.
 */
export const createManagerFilterStore = <T extends string = string>() =>
  create<ManagerFilterState<T>>((set) => ({
    searchTerm: '',
    statusFilter: undefined,

    setSearchTerm: (term: string) => set({ searchTerm: term }),

    updateStatusFilter: (status?: string) =>
      set({ statusFilter: (status && status !== '' ? status : undefined) as T | undefined }),

    clearFilters: () => set({ searchTerm: '', statusFilter: undefined }),
  }));

// Specific store instances
export const useBookFilterStore = createManagerFilterStore<
  'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK'
>();

export const useOrderFilterStore = createManagerFilterStore<
  'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
>();

export const useGenreFilterStore = createManagerFilterStore();

export const useDiscountFilterStore = createManagerFilterStore<
  'ACTIVE' | 'INACTIVE' | 'EXPIRED'
>();
