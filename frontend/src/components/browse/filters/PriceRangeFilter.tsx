import { Box, Slider, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';

interface PriceRangeFilterProps {
  minPrice?: number;
  maxPrice?: number;
  onChange: (minPrice?: number, maxPrice?: number) => void;
}

const MIN_RANGE = 0;
const MAX_RANGE = 200;

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  minPrice,
  maxPrice,
  onChange,
}) => {
  const [localRange, setLocalRange] = useState<[number, number]>([
    minPrice ?? MIN_RANGE,
    maxPrice ?? MAX_RANGE,
  ]);

  useEffect(() => {
    setLocalRange([minPrice ?? MIN_RANGE, maxPrice ?? MAX_RANGE]);
  }, [minPrice, maxPrice]);

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    const range = newValue as [number, number];
    setLocalRange(range);
  };

  const handleSliderCommit = (
    _event: Event | React.SyntheticEvent,
    newValue: number | number[]
  ) => {
    const range = newValue as [number, number];
    onChange(
      range[0] === MIN_RANGE ? undefined : range[0],
      range[1] === MAX_RANGE ? undefined : range[1]
    );
  };

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? MIN_RANGE : Number(event.target.value);
    const newMin = Math.max(MIN_RANGE, Math.min(value, localRange[1]));
    const newRange: [number, number] = [newMin, localRange[1]];
    setLocalRange(newRange);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === '' ? MAX_RANGE : Number(event.target.value);
    const newMax = Math.min(MAX_RANGE, Math.max(value, localRange[0]));
    const newRange: [number, number] = [localRange[0], newMax];
    setLocalRange(newRange);
  };

  const handleTextBlur = () => {
    onChange(
      localRange[0] === MIN_RANGE ? undefined : localRange[0],
      localRange[1] === MAX_RANGE ? undefined : localRange[1]
    );
  };

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Price Range
      </Typography>
      <Slider
        value={localRange}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderCommit}
        valueLabelDisplay="auto"
        valueLabelFormat={value => `$${value}`}
        min={MIN_RANGE}
        max={MAX_RANGE}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Min"
          type="number"
          value={localRange[0]}
          onChange={handleMinChange}
          onBlur={handleTextBlur}
          inputProps={{ min: MIN_RANGE, max: localRange[1] }}
          size="small"
          fullWidth
        />
        <TextField
          label="Max"
          type="number"
          value={localRange[1]}
          onChange={handleMaxChange}
          onBlur={handleTextBlur}
          inputProps={{ min: localRange[0], max: MAX_RANGE }}
          size="small"
          fullWidth
        />
      </Box>
    </Box>
  );
};
