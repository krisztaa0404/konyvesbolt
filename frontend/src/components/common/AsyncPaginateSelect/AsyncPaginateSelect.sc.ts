import type { Theme } from '@mui/material/styles';
import type { StylesConfig, GroupBase } from 'react-select';
import type { OptionType } from './AsyncPaginateSelect';

export const getReactSelectStyles = (
  theme: Theme,
  error: boolean
): StylesConfig<OptionType, boolean, GroupBase<OptionType>> => ({
  control: (base, state) => ({
    ...base,
    minHeight: '56px',
    borderRadius: '8px',
    borderColor: error
      ? theme.palette.error.main
      : state.isFocused
        ? theme.palette.primary.main
        : 'rgba(0, 0, 0, 0.23)',
    borderWidth: state.isFocused ? '2px' : '1px',
    backgroundColor: theme.palette.background.default,
    fontFamily: theme.typography.fontFamily,
    fontSize: '1rem',
    boxShadow: state.isFocused ? `0 0 0 1px ${theme.palette.primary.main}` : 'none',
    '&:hover': {
      borderColor: error
        ? theme.palette.error.main
        : state.isFocused
          ? theme.palette.primary.main
          : 'rgba(0, 0, 0, 0.87)',
    },
  }),
  valueContainer: base => ({
    ...base,
    padding: '8px 14px',
    gap: '4px',
  }),
  multiValue: base => ({
    ...base,
    backgroundColor: theme.palette.primary.main,
    borderRadius: '16px',
    color: theme.palette.primary.contrastText,
    padding: '2px 4px',
  }),
  multiValueLabel: base => ({
    ...base,
    color: theme.palette.primary.contrastText,
    fontSize: '0.875rem',
    padding: '2px 6px',
  }),
  multiValueRemove: base => ({
    ...base,
    color: theme.palette.primary.contrastText,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText,
    },
  }),
  placeholder: base => ({
    ...base,
    color: theme.palette.text.secondary,
  }),
  input: base => ({
    ...base,
    color: theme.palette.text.primary,
    fontSize: '1rem',
  }),
  menu: base => ({
    ...base,
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginTop: '4px',
    overflow: 'hidden',
    zIndex: 9999,
  }),
  menuList: base => ({
    ...base,
    padding: '4px',
    maxHeight: '300px',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? theme.palette.primary.main
      : state.isFocused
        ? theme.palette.action.hover
        : 'transparent',
    color: state.isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
    cursor: 'pointer',
    padding: '10px 12px',
    fontSize: '1rem',
    borderRadius: '4px',
    margin: '2px 0',
    '&:active': {
      backgroundColor: theme.palette.primary.light,
    },
  }),
  loadingIndicator: base => ({
    ...base,
    color: theme.palette.primary.main,
  }),
  dropdownIndicator: base => ({
    ...base,
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
  }),
  clearIndicator: base => ({
    ...base,
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.error.main,
    },
  }),
  noOptionsMessage: base => ({
    ...base,
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    padding: '12px',
  }),
  loadingMessage: base => ({
    ...base,
    color: theme.palette.text.secondary,
    fontSize: '0.875rem',
    padding: '12px',
  }),
});
