import { create } from 'zustand';

export type ViewMode = 'grid' | 'list';

export interface BrowseFilters {
  genreIds?: string[];
  priceMin?: number;
  priceMax?: number;
  author?: string;
  yearFrom?: number;
  yearTo?: number;
  inStock?: boolean;
}

interface FilterState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  filters: BrowseFilters;
  searchTerm: string;

  updateFilters: (updates: Partial<BrowseFilters>) => void;
  clearFilters: () => void;
  setSearchTerm: (term: string) => void;
  getActiveFilterCount: () => number;
}

export const useFilterStore = create<FilterState>((set, get) => ({
  viewMode: 'grid' as ViewMode,
  setViewMode: mode => set({ viewMode: mode }),

  filters: {},
  searchTerm: '',

  updateFilters: updates =>
    set(state => ({
      filters: { ...state.filters, ...updates },
    })),

  clearFilters: () =>
    set({
      filters: {},
    }),

  setSearchTerm: term => set({ searchTerm: term }),

  getActiveFilterCount: () => {
    const filters = get().filters;
    return [
      filters.genreIds && filters.genreIds.length > 0,
      filters.priceMin !== undefined,
      filters.priceMax !== undefined,
      filters.author,
      filters.yearFrom !== undefined,
      filters.yearTo !== undefined,
      filters.inStock,
    ].filter(Boolean).length;
  },
}));
