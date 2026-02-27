import { useState, useEffect, useMemo, useCallback, useRef, useLayoutEffect } from 'react';
import { Autocomplete, TextField, Checkbox, Chip, Box, CircularProgress, Typography } from '@mui/material';
import type { AutocompleteRenderOptionState, AutocompleteRenderInputParams } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useDebounce } from 'use-debounce';
import { useGenres } from '@hooks/useGenres';
import type { Genre } from '@types';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface GenreFilterProps {
  value: string[];
  onChange: (genreIds: string[]) => void;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({ value, onChange }) => {
  const [searchText, setSearchText] = useState('');
  const [debouncedSearch] = useDebounce(searchText, 300);
  const [page, setPage] = useState(0);
  const [allGenres, setAllGenres] = useState<Genre[]>([]);

  const listboxRef = useRef<HTMLUListElement | null>(null);
  const scrollPositionRef = useRef(0);
  const isLoadingMoreRef = useRef(false);

  const [localValue, setLocalValue] = useState<string[]>(value);
  const [debouncedValue] = useDebounce(localValue, 300);

  const { data: genresPage, isLoading } = useGenres({
    search: debouncedSearch,
    page: page,
    size: 10,
  });

  useEffect(() => {
    setPage(0);
    setAllGenres([]);
  }, [debouncedSearch]);

  useEffect(() => {
    if (genresPage?.content) {
      if (page === 0) {
        setAllGenres(genresPage.content);
        isLoadingMoreRef.current = false;
      } else {
        setAllGenres(prev => [...prev, ...(genresPage.content || [])]);
      }
    }
  }, [genresPage, page]);

  // Restore scroll position after new items are loaded
  useLayoutEffect(() => {
    if (isLoadingMoreRef.current && listboxRef.current && scrollPositionRef.current > 0) {
      listboxRef.current.scrollTop = scrollPositionRef.current;
      isLoadingMoreRef.current = false;
    }
  }, [allGenres]);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const selectedGenres = useMemo(
    () => allGenres.filter(genre => localValue.includes(genre.id || '')),
    [allGenres, localValue]
  );

  const hasMore = useMemo(() => {
    if (!genresPage?.page) return false;
    const currentPage = genresPage.page.number || 0;
    const totalPages = genresPage.page.totalPages || 0;
    return currentPage < totalPages - 1;
  }, [genresPage]);

  const handleChange = useCallback(
    (_event: React.SyntheticEvent, newValue: Genre[]) => {
      setLocalValue(newValue.map(genre => genre.id || ''));
    },
    []
  );

  const renderOption = useCallback(
    (props: React.HTMLAttributes<HTMLLIElement>, option: Genre, state: AutocompleteRenderOptionState) => {
      return (
        <li {...props} key={option.id}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={state.selected}
          />
          {option.name}
        </li>
      );
    },
    []
  );

  const renderTags = useCallback(
    (tagValue: Genre[], getTagProps: (params: { index: number }) => object) =>
      tagValue.map((option, index) => {
        const { key, ...chipProps } = getTagProps({ index }) as { key: string };
        return <Chip key={option.id} label={option.name} {...chipProps} size="small" />;
      }),
    []
  );

  const renderInput = useCallback(
    (params: AutocompleteRenderInputParams) => (
      <TextField
        {...params}
        label="Genres"
        placeholder={selectedGenres.length === 0 ? 'Search genres...' : ''}
      />
    ),
    [selectedGenres.length]
  );

  const ListboxComponent = useCallback(
    (props: React.HTMLAttributes<HTMLElement>) => {
      const { children, ...other } = props;

      const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
        const listboxNode = event.currentTarget;
        const position = listboxNode.scrollTop + listboxNode.clientHeight;
        const bottom = listboxNode.scrollHeight - 10; // 10px threshold

        if (position >= bottom && hasMore && !isLoading) {
          scrollPositionRef.current = listboxNode.scrollTop;
          isLoadingMoreRef.current = true;
          setPage(prev => prev + 1);
        }
      };

      return (
        <ul
          {...other}
          ref={listboxRef}
          onScroll={handleScroll}
          style={{ maxHeight: 400, overflow: 'auto' }}
        >
          {children}
          {isLoading && page > 0 && (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress size={24} />
            </Box>
          )}
          {!isLoading && hasMore && (
            <Box display="flex" justifyContent="center" p={1}>
              <Typography variant="caption" color="text.secondary">
                Scroll for more...
              </Typography>
            </Box>
          )}
        </ul>
      );
    },
    [hasMore, isLoading, page]
  );

  return (
    <Box>
      <Autocomplete
        multiple
        options={allGenres}
        disableCloseOnSelect
        loading={isLoading && page === 0}
        value={selectedGenres}
        onChange={handleChange}
        inputValue={searchText}
        onInputChange={(_event, value, reason) => {
          if (reason === 'input') {
            setSearchText(value);
          }
        }}
        getOptionLabel={option => option.name || ''}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderOption={renderOption}
        renderTags={renderTags}
        renderInput={renderInput}
        filterOptions={x => x}
        ListboxComponent={ListboxComponent}
        slots={{}}
        slotProps={{
          popper: {
            placement: 'bottom-start',
          },
        }}
      />
    </Box>
  );
};
