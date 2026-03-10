import { useShallow } from 'zustand/react/shallow';
import { useOrderFilterStore } from '@store/manager/managerFilterStore';
import { ManagerFilters } from '@components/manager/common/ManagerFilters';
import { orderStatusOptions, orderSortOptions } from '@constants/managerFilterConfigs';

interface OrdersFiltersProps {
  sortValue: string;
  onSortChange: (value: string) => void;
}

export const OrdersFilters = ({ sortValue, onSortChange }: OrdersFiltersProps) => {
  const { searchTerm, statusFilter, setSearchTerm, updateStatusFilter } = useOrderFilterStore(
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
        searchPlaceholder: 'Search by Order ID or Customer Email',
        statusOptions: orderStatusOptions,
        sortOptions: orderSortOptions,
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
