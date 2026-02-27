import { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';

interface YearRangeFilterProps {
  minYear?: number;
  maxYear?: number;
  onChange: (minYear?: number, maxYear?: number) => void;
}

const MIN_YEAR = 1800;
const CURRENT_YEAR = new Date().getFullYear();

export const YearRangeFilter: React.FC<YearRangeFilterProps> = ({ minYear, maxYear, onChange }) => {
  const [localMinYear, setLocalMinYear] = useState(minYear?.toString() ?? '');
  const [localMaxYear, setLocalMaxYear] = useState(maxYear?.toString() ?? '');

  useEffect(() => {
    setLocalMinYear(minYear?.toString() ?? '');
  }, [minYear]);

  useEffect(() => {
    setLocalMaxYear(maxYear?.toString() ?? '');
  }, [maxYear]);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalMinYear(event.target.value);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalMaxYear(event.target.value);
  };

  const handleMinBlur = () => {
    const value = localMinYear === '' ? undefined : Number(localMinYear);

    if (value !== undefined) {
      if (isNaN(value) || value < MIN_YEAR) {
        setLocalMinYear('');
        onChange(undefined, maxYear);
        return;
      }
      if (value > CURRENT_YEAR) {
        setLocalMinYear(CURRENT_YEAR.toString());
        onChange(CURRENT_YEAR, maxYear);
        return;
      }
      if (maxYear !== undefined && value > maxYear) {
        setLocalMinYear(maxYear.toString());
        onChange(maxYear, maxYear);
        return;
      }
    }

    onChange(value, maxYear);
  };

  const handleMaxBlur = () => {
    const value = localMaxYear === '' ? undefined : Number(localMaxYear);

    if (value !== undefined) {
      if (isNaN(value) || value > CURRENT_YEAR) {
        setLocalMaxYear('');
        onChange(minYear, undefined);
        return;
      }
      if (value < MIN_YEAR) {
        setLocalMaxYear(MIN_YEAR.toString());
        onChange(minYear, MIN_YEAR);
        return;
      }
      if (minYear !== undefined && value < minYear) {
        setLocalMaxYear(minYear.toString());
        onChange(minYear, minYear);
        return;
      }
    }

    onChange(minYear, value);
  };

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Publication Year
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="From"
          type="number"
          value={localMinYear}
          onChange={handleMinChange}
          onBlur={handleMinBlur}
          inputProps={{ min: MIN_YEAR, max: maxYear || CURRENT_YEAR }}
          size="small"
          fullWidth
          placeholder={String(MIN_YEAR)}
        />
        <TextField
          label="To"
          type="number"
          value={localMaxYear}
          onChange={handleMaxChange}
          onBlur={handleMaxBlur}
          inputProps={{ min: minYear || MIN_YEAR, max: CURRENT_YEAR }}
          size="small"
          fullWidth
          placeholder={String(CURRENT_YEAR)}
        />
      </Box>
    </Box>
  );
};
