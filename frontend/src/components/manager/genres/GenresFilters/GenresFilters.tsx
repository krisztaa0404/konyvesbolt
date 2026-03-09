import { useState, useEffect } from 'react';
import { InputLabel, MenuItem, Select, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { useDebounce } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';
import { useGenreFilterStore } from '@store/manager/managerFilterStore';
import { FiltersContainer, SearchField, FilterControl } from './GenresFilters.sc';

interface GenresFiltersProps {
  sortValue: string;
  onSortChange: (value: string) => void;
}

const sortOptions = [
  { value: 'name,asc', label: 'Name: A-Z' },
  { value: 'name,desc', label: 'Name: Z-A' },
];

export const GenresFilters = ({ sortValue, onSortChange }: GenresFiltersProps) => {
  const { searchTerm, setSearchTerm } = useGenreFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
      setSearchTerm: state.setSearchTerm,
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
        placeholder="Search by genre name"
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
