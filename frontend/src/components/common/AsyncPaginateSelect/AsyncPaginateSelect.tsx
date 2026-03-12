import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { FormControl, FormHelperText, Typography } from '@mui/material';
import { AsyncPaginate } from 'react-select-async-paginate';
import type { GroupBase, MultiValue, OptionsOrGroups } from 'react-select';
import { getReactSelectStyles } from './AsyncPaginateSelect.sc';

export interface OptionType {
  label: string;
  value: string;
  data?: unknown;
}

interface AsyncPaginateSelectProps {
  loadOptions: (
    search: string,
    loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
    additional?: { page: number }
  ) => Promise<{
    options: OptionsOrGroups<OptionType, GroupBase<OptionType>>;
    hasMore: boolean;
    additional: { page: number };
  }>;
  value: string[] | null;
  onChange: (ids: string[]) => void;
  label?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  initialOptions?: OptionType[];
}

export const AsyncPaginateSelect = ({
  loadOptions,
  value,
  onChange,
  label,
  error = false,
  helperText,
  disabled = false,
  placeholder = 'Type to search...',
  required = false,
  initialOptions = [],
}: AsyncPaginateSelectProps) => {
  const theme = useTheme();
  const customStyles = useMemo(() => getReactSelectStyles(theme, error), [theme, error]);

  const optionsCache = useRef<Map<string, OptionType>>(new Map());
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<OptionType>>([]);

  useEffect(() => {
    initialOptions.forEach(option => {
      optionsCache.current.set(option.value, option);
    });
  }, [initialOptions]);

  const loadOptionsWithCache = useCallback(
    async (
      search: string,
      loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
      additional?: { page: number }
    ) => {
      const result = await loadOptions(search, loadedOptions, additional);

      (result.options as OptionType[]).forEach(option => {
        optionsCache.current.set(option.value, option);
      });

      return result;
    },
    [loadOptions]
  );

  useEffect(() => {
    if (!value || value.length === 0) {
      setSelectedOptions([]);
      return;
    }

    const options = value.map(id => {
      const cached = optionsCache.current.get(id);
      if (cached) {
        return cached;
      }
      return { label: id, value: id };
    });

    setSelectedOptions(options);
  }, [value]);

  const handleChange = (newValue: MultiValue<OptionType> | null) => {
    if (newValue) {
      (newValue as OptionType[]).forEach(option => {
        optionsCache.current.set(option.value, option);
      });
    }

    const ids = newValue ? (newValue as OptionType[]).map(option => option.value) : [];
    onChange(ids);
  };

  return (
    <FormControl fullWidth error={error} disabled={disabled}>
      {label && (
        <Typography
          variant="body2"
          sx={{
            mb: 0.5,
            color: error ? 'error.main' : 'text.secondary',
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        >
          {label}
          {required && ' *'}
        </Typography>
      )}
      <AsyncPaginate
        value={selectedOptions}
        loadOptions={loadOptionsWithCache}
        onChange={handleChange}
        isMulti
        placeholder={placeholder}
        isDisabled={disabled}
        styles={customStyles}
        debounceTimeout={300}
        additional={{ page: 0 }}
        closeMenuOnSelect={false}
        isClearable
        noOptionsMessage={() => 'No options found'}
        loadingMessage={() => 'Loading...'}
      />
      {helperText && (
        <FormHelperText error={error} sx={{ ml: 0, mt: 0.5 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};
