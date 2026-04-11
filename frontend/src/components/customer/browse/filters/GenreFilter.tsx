import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { CheckboxListFilter, type CheckboxListItem } from '@components/common/CheckboxListFilter';
import { useGenres } from '@hooks/useGenres';

interface GenreFilterProps {
  value: string[];
  onChange: (genreIds: string[]) => void;
  initialGenreNames?: Record<string, string>;
}

interface GenreItem extends CheckboxListItem {
  id: string;
  label: string;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  value,
  onChange,
  initialGenreNames = {},
}) => {
  const [localValue, setLocalValue] = useState<string[]>(value);
  const [debouncedValue] = useDebounce(localValue, 300);

  const { data, isLoading, isError } = useGenres({
    page: 0,
    size: 150,
  });

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const genreItems: GenreItem[] = (data?.content || []).map(genre => ({
    id: genre.id || '',
    label: genre.name || initialGenreNames[genre.id || ''] || genre.id || '',
  }));

  return (
    <Box>
      <CheckboxListFilter
        items={genreItems}
        selectedIds={localValue}
        onChange={setLocalValue}
        label="Genres"
        loading={isLoading}
        error={isError ? 'Failed to load genres' : undefined}
        initialVisibleCount={10}
        enableSelectAll={true}
        searchable={true}
        searchPlaceholder="Search genres..."
      />
    </Box>
  );
};
