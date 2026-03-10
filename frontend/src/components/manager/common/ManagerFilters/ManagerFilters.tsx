import { useState, useEffect } from 'react';
import { InputLabel, MenuItem, Select, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { useDebounce } from 'use-debounce';
import {
  FiltersContainer,
  SearchField,
  FilterControl,
} from '@layout/manager/ManagerFilterLayout.sc';

interface FilterOption {
  value: string;
  label: string;
}

interface ManagerFiltersConfig {
  searchPlaceholder: string;
  statusOptions?: FilterOption[];
  sortOptions: FilterOption[];
  statusLabel?: string;
}

interface ManagerFiltersProps {
  config: ManagerFiltersConfig;
  searchTerm: string;
  statusFilter?: string;
  onSearchChange: (term: string) => void;
  onStatusChange?: (status: string) => void;
  sortValue: string;
  onSortChange: (value: string) => void;
}

export const ManagerFilters = ({
  config,
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange,
  sortValue,
  onSortChange,
}: ManagerFiltersProps) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [debouncedSearchTerm] = useDebounce(localSearchTerm, 500);

  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  useEffect(() => {
    if (searchTerm === '') {
      setLocalSearchTerm('');
    }
  }, [searchTerm]);

  return (
    <FiltersContainer>
      <SearchField
        placeholder={config.searchPlaceholder}
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

      {config.statusOptions && onStatusChange && (
        <FilterControl size="small">
          <InputLabel>{config.statusLabel || 'Status'}</InputLabel>
          <Select
            value={statusFilter || ''}
            onChange={e => onStatusChange(e.target.value)}
            label={config.statusLabel || 'Status'}
          >
            {config.statusOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FilterControl>
      )}

      <FilterControl size="small">
        <InputLabel>Sort By</InputLabel>
        <Select value={sortValue} onChange={e => onSortChange(e.target.value)} label="Sort By">
          {config.sortOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FilterControl>
    </FiltersContainer>
  );
};
