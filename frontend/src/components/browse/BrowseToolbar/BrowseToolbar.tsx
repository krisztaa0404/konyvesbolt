import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  IconButton,
  type SelectChangeEvent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';
import { useFilterStore, type ViewMode } from '@store/filterStore';
import {
  ToolbarContainer,
  TopRow,
  SearchContainer,
  ControlsContainer,
  ResultsRow,
} from './BrowseToolbar.sc';

interface BrowseToolbarProps {
  resultCount: number;
  sort?: string;
  onSortChange: (sort: string) => void;
}

const sortOptions = [
  { value: 'createdAt,desc', label: 'Newest First' },
  { value: 'price,asc', label: 'Price: Low to High' },
  { value: 'price,desc', label: 'Price: High to Low' },
  { value: 'title,asc', label: 'Title: A-Z' },
  { value: 'salesCount,desc', label: 'Most Popular' },
];

export const BrowseToolbar: React.FC<BrowseToolbarProps> = ({
  resultCount,
  sort = 'createdAt,desc',
  onSortChange,
}) => {
  const { viewMode, setViewMode, searchTerm, setSearchTerm } = useFilterStore(
    useShallow(state => ({
      viewMode: state.viewMode,
      setViewMode: state.setViewMode,
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

  const handleSortChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value);
  };

  const handleViewModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: ViewMode | null
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  const handleClearSearch = () => {
    setLocalSearchTerm('');
    setSearchTerm('');
  };

  return (
    <ToolbarContainer>
      <TopRow>
        <SearchContainer>
          <TextField
            fullWidth
            placeholder="Search books..."
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
                  <IconButton size="small" onClick={handleClearSearch}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </SearchContainer>

        <ControlsContainer>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} onChange={handleSortChange} label="Sort By">
              {sortOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="view mode"
            size="small"
          >
            <ToggleButton value="grid" aria-label="grid view">
              <GridViewIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list view">
              <ViewListIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </ControlsContainer>
      </TopRow>

      <ResultsRow>
        <Typography variant="body2" color="text.secondary">
          Showing {resultCount} {resultCount === 1 ? 'result' : 'results'}
        </Typography>
      </ResultsRow>
    </ToolbarContainer>
  );
};
