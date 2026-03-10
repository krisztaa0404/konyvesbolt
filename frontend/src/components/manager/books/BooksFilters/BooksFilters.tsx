import { useState, useEffect } from 'react';
import { InputLabel, MenuItem, Select, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { useDebounce } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';
import { useBookFilterStore } from '@store/manager/managerFilterStore';
import { FiltersContainer, SearchField, FilterControl } from '@layout/manager/ManagerFilterLayout.sc';

interface BooksFiltersProps {
  sortValue: string;
  onSortChange: (value: string) => void;
}

const stockStatusOptions = [
  { value: '', label: 'All Books' },
  { value: 'IN_STOCK', label: 'In Stock' },
  { value: 'LOW_STOCK', label: 'Low Stock' },
  { value: 'OUT_OF_STOCK', label: 'Out of Stock' },
];

const sortOptions = [
  { value: 'createdAt,desc', label: 'Date Added: Newest First' },
  { value: 'createdAt,asc', label: 'Date Added: Oldest First' },
  { value: 'title,asc', label: 'Title: A-Z' },
  { value: 'title,desc', label: 'Title: Z-A' },
  { value: 'price,desc', label: 'Price: High to Low' },
  { value: 'price,asc', label: 'Price: Low to High' },
  { value: 'stockQuantity,asc', label: 'Stock: Low to High' },
  { value: 'stockQuantity,desc', label: 'Stock: High to Low' },
];

export const BooksFilters = ({ sortValue, onSortChange }: BooksFiltersProps) => {
  const { searchTerm, statusFilter, setSearchTerm, updateStatusFilter } = useBookFilterStore(
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
        placeholder="Search by Title, Author, or ISBN"
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
        <InputLabel>Stock Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={e => updateStatusFilter(e.target.value)}
          label="Stock Status"
        >
          {stockStatusOptions.map(option => (
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
