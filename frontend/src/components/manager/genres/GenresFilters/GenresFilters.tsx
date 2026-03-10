import { useShallow } from 'zustand/react/shallow';
import { useGenreFilterStore } from '@store/manager/managerFilterStore';
import { ManagerFilters } from '@components/manager/common/ManagerFilters';
import { genreSortOptions } from '@constants/managerFilterConfigs';

interface GenresFiltersProps {
  sortValue: string;
  onSortChange: (value: string) => void;
}

export const GenresFilters = ({ sortValue, onSortChange }: GenresFiltersProps) => {
  const { searchTerm, setSearchTerm } = useGenreFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
      setSearchTerm: state.setSearchTerm,
    }))
  );

  return (
    <ManagerFilters
      config={{
        searchPlaceholder: 'Search by genre name',
        sortOptions: genreSortOptions,
      }}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      sortValue={sortValue}
      onSortChange={onSortChange}
    />
  );
};
