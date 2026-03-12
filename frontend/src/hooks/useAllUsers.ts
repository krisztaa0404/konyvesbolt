import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { useShallow } from 'zustand/react/shallow';
import { managerApi, type GetAllUsersParams } from '@services/api/managerApi';
import { useUserFilterStore } from '@store/manager/managerFilterStore';

interface UseAllUsersParams {
  page: number;
  size: number;
  sort: string;
}

export const useAllUsers = ({ page, size, sort }: UseAllUsersParams) => {
  const { searchTerm, roleFilter, loyaltyFilter } = useUserFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
      roleFilter: state.roleFilter,
      loyaltyFilter: state.loyaltyFilter,
    }))
  );

  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const params: GetAllUsersParams = useMemo(
    () => ({
      filter: {
        search: debouncedSearchTerm || undefined,
        role: roleFilter || undefined,
        isLoyaltyMember: loyaltyFilter,
      },
      pageable: {
        page,
        size,
        sort: [sort],
      },
    }),
    [debouncedSearchTerm, roleFilter, loyaltyFilter, page, size, sort]
  );

  const cleanParams = useMemo(
    () => ({
      filter: Object.fromEntries(
        Object.entries(params.filter || {}).filter(
          ([, value]) => value !== null && value !== undefined
        )
      ),
      pageable: params.pageable,
    }),
    [params]
  );

  return useQuery({
    queryKey: ['users', 'all', cleanParams],
    queryFn: ({ signal }) => managerApi.getAllUsers(params, signal),
    placeholderData: previousData => previousData,
  });
};
