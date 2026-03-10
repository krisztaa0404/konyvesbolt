/**
 * Adapters for react-select-async-paginate to work with API services
 */
import { booksApi } from '@services/api/booksApi';
import { genresApi } from '@services/api/genresApi';
import type { OptionType } from '@components/common/AsyncPaginateSelect';
import type { GroupBase, OptionsOrGroups } from 'react-select';

export async function loadBooksOptions(
  search: string,
  _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
  additional?: { page: number }
): Promise<{
  options: OptionsOrGroups<OptionType, GroupBase<OptionType>>;
  hasMore: boolean;
  additional: { page: number };
}> {
  const page = additional?.page ?? 0;

  const response = await booksApi.getBooksWithFilters({
    search: search || undefined,
    page,
    size: 50,
  });

  return {
    options: (response.content ?? []).map(book => ({
      label: book.title || '',
      value: book.id || '',
      data: book,
    })),
    hasMore: (response.page?.number ?? 0) < (response.page?.totalPages ?? 0) - 1,
    additional: { page: page + 1 },
  };
}

export async function loadGenresOptions(
  search: string,
  _loadedOptions: OptionsOrGroups<OptionType, GroupBase<OptionType>>,
  additional?: { page: number }
): Promise<{
  options: OptionsOrGroups<OptionType, GroupBase<OptionType>>;
  hasMore: boolean;
  additional: { page: number };
}> {
  const page = additional?.page ?? 0;

  const response = await genresApi.getGenres({
    name: search || undefined,
    page,
    size: 50,
  });

  return {
    options: (response.content ?? []).map(genre => ({
      label: genre.name || '',
      value: genre.id || '',
      data: genre,
    })),
    hasMore: (response.page?.number ?? 0) < (response.page?.totalPages ?? 0) - 1,
    additional: { page: page + 1 },
  };
}
