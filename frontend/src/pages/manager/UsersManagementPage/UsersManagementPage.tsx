import { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useShallow } from 'zustand/react/shallow';
import { useAllUsers } from '@hooks/useAllUsers';
import { useUserFilterStore } from '@store/manager/managerFilterStore';
import { useAuthStore, selectIsAdmin } from '@store/authStore';
import { UsersFilters } from '@components/manager/users/UsersFilters';
import { UsersTable } from '@components/manager/users/UsersTable';
import { CreateUserDialog } from '@components/manager/users/CreateUserDialog';
import { EditUserRoleDialog } from '@components/manager/users/EditUserRoleDialog';
import { EditUserLoyaltyDialog } from '@components/manager/users/EditUserLoyaltyDialog';
import { PageErrorState } from '@components/manager/common/PageErrorState';
import type { User } from '@types';
import {
  PageContainer,
  PageHeader,
  HeaderContent,
  FiltersContainer,
  TableWrapper,
} from '@layout/manager/ManagerPageLayout.sc';

export const UsersManagementPage = () => {
  const [page, setPage] = useState(0);
  const [sortValue, setSortValue] = useState('registrationDate,desc');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [loyaltyDialogOpen, setLoyaltyDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const isAdmin = useAuthStore(selectIsAdmin);

  const { searchTerm, roleFilter, loyaltyFilter } = useUserFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
      roleFilter: state.roleFilter,
      loyaltyFilter: state.loyaltyFilter,
    }))
  );

  useEffect(() => {
    setPage(0);
  }, [searchTerm, roleFilter, loyaltyFilter]);

  const { data, isLoading, isError, error, refetch } = useAllUsers({
    page,
    size: 20,
    sort: sortValue,
  });

  const handleAddNew = () => {
    setCreateDialogOpen(true);
  };

  const handleEditRole = (user: User) => {
    setSelectedUser(user);
    setRoleDialogOpen(true);
  };

  const handleEditLoyalty = (user: User) => {
    setSelectedUser(user);
    setLoyaltyDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setCreateDialogOpen(false);
  };

  const handleCloseRoleDialog = () => {
    setRoleDialogOpen(false);
    setSelectedUser(null);
  };

  const handleCloseLoyaltyDialog = () => {
    setLoyaltyDialogOpen(false);
    setSelectedUser(null);
  };

  if (isError && !isLoading) {
    return (
      <PageErrorState
        title="User Management"
        message={(error as Error)?.message || 'Failed to load users'}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <HeaderContent>
          <div>
            <Typography variant="h4" gutterBottom>
              User Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage user accounts, roles, and loyalty memberships
            </Typography>
          </div>
          {isAdmin && (
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNew}>
              Add New User
            </Button>
          )}
        </HeaderContent>
      </PageHeader>

      <FiltersContainer>
        <UsersFilters sortValue={sortValue} onSortChange={setSortValue} />
      </FiltersContainer>

      <TableWrapper>
        <UsersTable
          data={data}
          isLoading={isLoading}
          page={page}
          onPageChange={setPage}
          onEditRole={handleEditRole}
          onEditLoyalty={handleEditLoyalty}
        />
      </TableWrapper>

      <CreateUserDialog open={createDialogOpen} onClose={handleCloseCreateDialog} />

      <EditUserRoleDialog
        open={roleDialogOpen}
        onClose={handleCloseRoleDialog}
        user={selectedUser}
      />

      <EditUserLoyaltyDialog
        open={loyaltyDialogOpen}
        onClose={handleCloseLoyaltyDialog}
        user={selectedUser}
      />
    </PageContainer>
  );
};
