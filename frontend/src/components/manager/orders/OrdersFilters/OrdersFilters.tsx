import { useState, useEffect } from 'react';
import { InputLabel, MenuItem, Select, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { useDebounce } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';
import { OrderStatus } from '@types';
import { useOrderFilterStore } from '@store/manager/managerFilterStore';
import { FiltersContainer, SearchField, FilterControl } from '@layout/manager/ManagerFilterLayout.sc';

interface OrdersFiltersProps {
  sortValue: string;
  onSortChange: (value: string) => void;
}

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: OrderStatus.PENDING, label: 'Pending' },
  { value: OrderStatus.PAID, label: 'Paid' },
  { value: OrderStatus.SHIPPED, label: 'Shipped' },
  { value: OrderStatus.DELIVERED, label: 'Delivered' },
  { value: OrderStatus.CANCELLED, label: 'Cancelled' },
];

const sortOptions = [
  { value: 'orderDate,desc', label: 'Date: Newest First' },
  { value: 'orderDate,asc', label: 'Date: Oldest First' },
  { value: 'totalAmount,desc', label: 'Total: High to Low' },
  { value: 'totalAmount,asc', label: 'Total: Low to High' },
  { value: 'status,asc', label: 'Status: A-Z' },
];

export const OrdersFilters = ({ sortValue, onSortChange }: OrdersFiltersProps) => {
  const { searchTerm, statusFilter, setSearchTerm, updateStatusFilter } = useOrderFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
      statusFilter: state.statusFilter,
      setSearchTerm: state.setSearchTerm,
      updateStatusFilter: state.updateStatusFilter,
    }))
  );

  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [debouncedSearchTerm] = useDebounce(localSearchTerm, 500);

  useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  useEffect(() => {
    if (searchTerm === '') {
      setLocalSearchTerm('');
    }
  }, [searchTerm]);

  return (
    <FiltersContainer>
      <SearchField
        placeholder="Search by Order ID or Customer Email"
        value={localSearchTerm}
        onChange={e => setLocalSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: localSearchTerm && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={() => setLocalSearchTerm('')} edge="end">
                <CloseIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        size="small"
      />

      <FilterControl size="small">
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={e => updateStatusFilter(e.target.value)}
          label="Status"
        >
          {statusOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FilterControl>

      <FilterControl size="small">
        <InputLabel>Sort By</InputLabel>
        <Select value={sortValue} onChange={e => onSortChange(e.target.value)} label="Sort By">
          {sortOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FilterControl>
    </FiltersContainer>
  );
};
