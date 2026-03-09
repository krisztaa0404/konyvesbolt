import { create } from 'zustand';

interface GenreFilterState {
  // Filter state
  searchTerm: string;

  // Actions
  setSearchTerm: (term: string) => void;
  clearFilters: () => void;
}

export const useGenreFilterStore = create<GenreFilterState>(set => ({
  searchTerm: '',

  setSearchTerm: term => set({ searchTerm: term }),

  clearFilters: () =>
    set({
      searchTerm: '',
    }),
}));
