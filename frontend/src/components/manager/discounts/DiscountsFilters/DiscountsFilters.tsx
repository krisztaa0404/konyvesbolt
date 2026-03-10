import { useShallow } from 'zustand/react/shallow';
import { useDiscountFilterStore } from '@store/manager/managerFilterStore';
import { ManagerFilters } from '@components/manager/common/ManagerFilters';
import { discountStatusOptions, discountSortOptions } from '@constants/managerFilterConfigs';

interface DiscountsFiltersProps {
  sortValue: string;
  onSortChange: (value: string) => void;
}

export const DiscountsFilters = ({ sortValue, onSortChange }: DiscountsFiltersProps) => {
  const { searchTerm, statusFilter, setSearchTerm, updateStatusFilter } = useDiscountFilterStore(
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
        searchPlaceholder: 'Search by discount name',
        statusOptions: discountStatusOptions,
        sortOptions: discountSortOptions,
        statusLabel: 'Status',
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
