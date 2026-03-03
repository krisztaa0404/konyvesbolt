import { FormControlLabel, Switch } from '@mui/material';

interface StockFilterProps {
  checked: boolean;
  onChange: (inStock: boolean) => void;
}

export const StockFilter: React.FC<StockFilterProps> = ({ checked, onChange }) => {
  return (
    <FormControlLabel
      control={<Switch checked={checked} onChange={e => onChange(e.target.checked)} />}
      label="In Stock Only"
    />
  );
};
