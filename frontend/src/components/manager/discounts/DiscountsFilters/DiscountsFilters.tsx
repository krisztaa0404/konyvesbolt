import { useState, useEffect } from 'react';
import { InputLabel, MenuItem, Select, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { useDebounce } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';
import { useDiscountFilterStore } from '@store/manager/managerFilterStore';
import { FiltersContainer, SearchField, FilterControl } from '@layout/manager/ManagerFilterLayout.sc';

interface DiscountsFiltersProps {
  sortValue: string;
  onSortChange: (value: string) => void;
}

const sortOptions = [
  { value: 'createdAt,desc', label: 'Date Created (Newest First)' },
  { value: 'createdAt,asc', label: 'Date Created (Oldest First)' },
  { value: 'name,asc', label: 'Name (A-Z)' },
  { value: 'name,desc', label: 'Name (Z-A)' },
  { value: 'percentage,desc', label: 'Percentage (High to Low)' },
  { value: 'percentage,asc', label: 'Percentage (Low to High)' },
  { value: 'validFrom,desc', label: 'Valid From (Newest First)' },
  { value: 'validFrom,asc', label: 'Valid From (Oldest First)' },
];

const statusOptions = [
  { value: '', label: 'All Statuses' },
  { value: 'ACTIVE', label: 'Active' },
  { value: 'INACTIVE', label: 'Inactive' },
  { value: 'EXPIRED', label: 'Expired' },
];

export const DiscountsFilters = ({ sortValue, onSortChange }: DiscountsFiltersProps) => {
  const { searchTerm, statusFilter, setSearchTerm, updateStatusFilter } = useDiscountFilterStore(
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
        placeholder="Search by discount name"
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
          value={statusFilter || ''}
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
