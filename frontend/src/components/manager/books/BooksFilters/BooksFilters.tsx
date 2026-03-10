import { useShallow } from 'zustand/react/shallow';
import { useBookFilterStore } from '@store/manager/managerFilterStore';
import { ManagerFilters } from '@components/manager/common/ManagerFilters';
import { stockStatusOptions, bookSortOptions } from '@constants/managerFilterConfigs';

interface BooksFiltersProps {
  sortValue: string;
  onSortChange: (value: string) => void;
}

export const BooksFilters = ({ sortValue, onSortChange }: BooksFiltersProps) => {
  const { searchTerm, statusFilter, setSearchTerm, updateStatusFilter } = useBookFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
      statusFilter: state.statusFilter,
      setSearchTerm: state.setSearchTerm,
      updateStatusFilter: state.updateStatusFilter,
    }))
  );

  return (
    <ManagerFilters
      config={{
        searchPlaceholder: 'Search by Title, Author, or ISBN',
        statusOptions: stockStatusOptions,
        sortOptions: bookSortOptions,
        statusLabel: 'Stock Status',
      }}
      searchTerm={searchTerm}
      statusFilter={statusFilter}
      onSearchChange={setSearchTerm}
      onStatusChange={updateStatusFilter}
      sortValue={sortValue}
      onSortChange={onSortChange}
    />
  );
};
