import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { AsyncPaginateSelect } from '@components/common/AsyncPaginateSelect';
import { loadGenresOptions } from '@utils/selectAdapters';

interface GenreFilterProps {
  value: string[];
  onChange: (genreIds: string[]) => void;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState<string[]>(value);
  const [debouncedValue] = useDebounce(localValue, 300);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  return (
    <Box>
      <AsyncPaginateSelect
        loadOptions={loadGenresOptions}
        value={localValue}
        onChange={setLocalValue}
        label="Genres"
        placeholder="Search genres..."
      />
    </Box>
  );
};
