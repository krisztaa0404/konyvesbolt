import { useState, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useDebounce } from 'use-debounce';

interface AuthorFilterProps {
  value: string;
  onChange: (author: string) => void;
}

export const AuthorFilter: React.FC<AuthorFilterProps> = ({ value, onChange }) => {
  const [localAuthor, setLocalAuthor] = useState(value);
  const [debouncedAuthor] = useDebounce(localAuthor, 500);

  useEffect(() => {
    onChange(debouncedAuthor);
  }, [debouncedAuthor, onChange]);

  useEffect(() => {
    if (value === '') {
      setLocalAuthor('');
    }
  }, [value]);

  const handleClear = () => {
    setLocalAuthor('');
    onChange('');
  };

  return (
    <TextField
      label="Search by Author"
      value={localAuthor}
      onChange={e => setLocalAuthor(e.target.value)}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: localAuthor && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} edge="end" size="small">
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
