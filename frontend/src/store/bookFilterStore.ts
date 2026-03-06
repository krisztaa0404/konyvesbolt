import { create } from 'zustand';

interface BookFilterState {
  // Filter state
  searchTerm: string;
  statusFilter: string;

  // Actions
  setSearchTerm: (term: string) => void;
  updateStatusFilter: (status: string) => void;
  clearFilters: () => void;
}

export const useBookFilterStore = create<BookFilterState>(set => ({
  searchTerm: '',
  statusFilter: '',

  setSearchTerm: term => set({ searchTerm: term }),

  updateStatusFilter: status => set({ statusFilter: status }),

  clearFilters: () =>
    set({
      searchTerm: '',
      statusFilter: '',
    }),
}));
