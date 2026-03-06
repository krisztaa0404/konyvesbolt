import { create } from 'zustand';

interface OrderFilterState {
  // Filter state
  searchTerm: string;
  statusFilter: string;

  // Actions
  setSearchTerm: (term: string) => void;
  updateStatusFilter: (status: string) => void;
  clearFilters: () => void;
}

export const useOrderFilterStore = create<OrderFilterState>((set) => ({
  searchTerm: '',
  statusFilter: '',

  setSearchTerm: (term) => set({ searchTerm: term }),

  updateStatusFilter: (status) => set({ statusFilter: status }),

  clearFilters: () =>
    set({
      searchTerm: '',
      statusFilter: '',
    }),
}));
