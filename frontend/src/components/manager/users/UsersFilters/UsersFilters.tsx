import { useState, useEffect } from 'react';
import { InputLabel, MenuItem, Select, InputAdornment, IconButton } from '@mui/material';
import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { useDebounce } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';
import { useUserFilterStore } from '@store/manager/managerFilterStore';
import {
  FiltersContainer,
  SearchField,
  FilterControl,
} from '@layout/manager/ManagerFilterLayout.sc';
import {
  userRoleOptions,
  userLoyaltyOptions,
  userSortOptions,
} from '@constants/managerFilterConfigs';

interface UsersFiltersProps {
  sortValue: string;
  onSortChange: (value: string) => void;
}

export const UsersFilters = ({ sortValue, onSortChange }: UsersFiltersProps) => {
  const {
    searchTerm,
    roleFilter,
    loyaltyFilter,
    setSearchTerm,
    updateRoleFilter,
    updateLoyaltyFilter,
  } = useUserFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
      roleFilter: state.roleFilter,
      loyaltyFilter: state.loyaltyFilter,
      setSearchTerm: state.setSearchTerm,
      updateRoleFilter: state.updateRoleFilter,
      updateLoyaltyFilter: state.updateLoyaltyFilter,
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

  const handleLoyaltyChange = (value: string) => {
    if (value === '') {
      updateLoyaltyFilter(undefined);
    } else {
      updateLoyaltyFilter(value === 'true');
    }
  };

  return (
    <FiltersContainer>
      <SearchField
        placeholder="Search by Name or Email"
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
        <InputLabel>Role</InputLabel>
        <Select
          value={roleFilter || ''}
          onChange={e => updateRoleFilter(e.target.value)}
          label="Role"
        >
          {userRoleOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FilterControl>

      <FilterControl size="small">
        <InputLabel>Loyalty Status</InputLabel>
        <Select
          value={loyaltyFilter === undefined ? '' : loyaltyFilter.toString()}
          onChange={e => handleLoyaltyChange(e.target.value)}
          label="Loyalty Status"
        >
          {userLoyaltyOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FilterControl>

      <FilterControl size="small">
        <InputLabel>Sort By</InputLabel>
        <Select value={sortValue} onChange={e => onSortChange(e.target.value)} label="Sort By">
          {userSortOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FilterControl>
    </FiltersContainer>
  );
};
