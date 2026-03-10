import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  Typography,
  Skeleton,
  Pagination,
  IconButton,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Edit as EditIcon,
  AdminPanelSettings as AdminIcon,
  CardMembership as LoyaltyIcon,
} from '@mui/icons-material';
import { useAuthStore, selectIsAdmin } from '@store/authStore';
import { formatCurrency, formatDate } from '@utils/formatters';
import type { PageUser, User } from '@types';
import {
  StyledTableContainer,
  StyledTableCell,
  EmptyStateContainer,
  PaginationContainer,
} from '@layout/manager/ManagerTableLayout.sc';

interface UsersTableProps {
  data?: PageUser;
  isLoading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  onEditRole: (user: User) => void;
  onEditLoyalty: (user: User) => void;
}

export const UsersTable = ({
  data,
  isLoading,
  page,
  onPageChange,
  onEditRole,
  onEditLoyalty,
}: UsersTableProps) => {
  const isAdmin = useAuthStore(selectIsAdmin);

  const handlePaginationChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value - 1);
  };

  const getRoleChipColor = (role: string | undefined) => {
    switch (role) {
      case 'ADMIN':
        return 'error';
      case 'MANAGER':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Loyalty</StyledTableCell>
              <StyledTableCell>Discount %</StyledTableCell>
              <StyledTableCell>Total Spent</StyledTableCell>
              <StyledTableCell>Registration</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <StyledTableCell>
                  <Skeleton width={150} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={200} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={80} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={100} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={60} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={80} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton width={100} />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Skeleton width={100} />
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    );
  }

  const users = data?.content || [];
  const totalPages = data?.page?.totalPages || 0;

  if (users.length === 0) {
    return (
      <StyledTableContainer>
        <EmptyStateContainer>
          <Typography variant="body1" color="text.secondary">
            No users found
          </Typography>
        </EmptyStateContainer>
      </StyledTableContainer>
    );
  }

  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Role</StyledTableCell>
            <StyledTableCell>Loyalty</StyledTableCell>
            <StyledTableCell>Discount %</StyledTableCell>
            <StyledTableCell>Total Spent</StyledTableCell>
            <StyledTableCell>Registration</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id} hover>
              <StyledTableCell>
                <Typography variant="body2" fontWeight={600}>
                  {user.firstName} {user.lastName}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="body2">{user.email}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Chip label={user.role} color={getRoleChipColor(user.role)} size="small" />
              </StyledTableCell>
              <StyledTableCell>
                {user.isLoyaltyMember ? (
                  <Chip icon={<LoyaltyIcon />} label="Member" color="success" size="small" />
                ) : (
                  <Chip label="Regular" size="small" />
                )}
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="body2">
                  {user.isLoyaltyMember && user.loyaltyDiscountPercent !== undefined
                    ? `${user.loyaltyDiscountPercent}%`
                    : '—'}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="body2">
                  {user.role === 'USER' ? formatCurrency(user.totalSpent) : '—'}
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="body2">{formatDate(user.registrationDate)}</Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                {isAdmin && (
                  <Tooltip title="Edit Role">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onEditRole(user)}
                      disabled={!user.id}
                    >
                      <AdminIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                {user.role === 'USER' && (
                  <Tooltip title="Edit Loyalty">
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={() => onEditLoyalty(user)}
                      disabled={!user.id}
                      sx={{ ml: 1 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <PaginationContainer>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={handlePaginationChange}
            color="primary"
            showFirstButton
            showLastButton
          />
        </PaginationContainer>
      )}
    </StyledTableContainer>
  );
};
