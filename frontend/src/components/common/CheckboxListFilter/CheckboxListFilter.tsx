import { useState } from 'react';
import {
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { LoadingSpinner } from '@components/common/LoadingSpinner';
import { ErrorMessage } from '@components/common/ErrorMessage';
import {
  FilterContainer,
  FilterHeader,
  CheckboxList,
  ToggleButton,
  SelectAllButton,
} from './CheckboxListFilter.sc';

export interface CheckboxListItem {
  id: string;
  label: string;
}

export interface CheckboxListFilterProps<T extends CheckboxListItem> {
  items: T[];
  selectedIds: string[];
  onChange: (selectedIds: string[]) => void;
  label?: string;
  loading?: boolean;
  error?: string;
  initialVisibleCount?: number;
  enableSelectAll?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export const CheckboxListFilter = <T extends CheckboxListItem>({
  items,
  selectedIds,
  onChange,
  label,
  loading = false,
  error,
  initialVisibleCount = 10,
  enableSelectAll = true,
  searchable = false,
  searchPlaceholder = 'Search...',
}: CheckboxListFilterProps<T>) => {
  const [showAll, setShowAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = searchTerm
    ? items.filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : items;

  const visibleItems = showAll ? filteredItems : filteredItems.slice(0, initialVisibleCount);
  const hasMore = filteredItems.length > initialVisibleCount;
  const allSelected = filteredItems.length > 0 && selectedIds.length === filteredItems.length;

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const handleSelectAll = () => {
    onChange(allSelected ? [] : filteredItems.map(item => item.id));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setShowAll(false);
  };

  if (loading) {
    return <LoadingSpinner size={24} />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (items.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        No options available
      </Typography>
    );
  }

  return (
    <FilterContainer>
      {label && (
        <FilterHeader>
          <Typography variant="body2" fontWeight={500}>
            {label}
          </Typography>
          {enableSelectAll && (
            <SelectAllButton onClick={handleSelectAll} size="small">
              {allSelected ? 'Deselect All' : 'Select All'}
            </SelectAllButton>
          )}
        </FilterHeader>
      )}

      {searchable && (
        <TextField
          size="small"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: searchTerm && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setSearchTerm('')}
                  edge="end"
                  aria-label="clear search"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ mb: 1 }}
        />
      )}

      <CheckboxList>
        {visibleItems.map(item => (
          <FormControlLabel
            key={item.id}
            control={
              <Checkbox
                checked={selectedIds.includes(item.id)}
                onChange={() => handleToggle(item.id)}
                size="small"
              />
            }
            label={item.label}
          />
        ))}
      </CheckboxList>

      {hasMore && (
        <ToggleButton
          variant="text"
          size="small"
          onClick={() => setShowAll(!showAll)}
          endIcon={showAll ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          {showAll ? 'Show Less' : `Show All (${filteredItems.length})`}
        </ToggleButton>
      )}
    </FilterContainer>
  );
};
