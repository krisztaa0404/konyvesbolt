import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { useAllOrders } from '@hooks/useAllOrders';
import { useOrderFilterStore } from '@store/manager/managerFilterStore';
import { OrdersFilters } from '@components/manager/orders/OrdersFilters';
import { OrdersTable } from '@components/manager/orders/OrdersTable';
import { PageErrorState } from '@components/manager/common/PageErrorState';
import {
  PageContainer,
  PageHeader,
  HeaderContent,
  FiltersContainer,
  TableWrapper,
} from '@layout/manager/ManagerPageLayout.sc';

export const AllOrdersPage = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [sortValue, setSortValue] = useState('orderDate,desc');

  const { searchTerm, statusFilter, updateStatusFilter } = useOrderFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
      statusFilter: state.statusFilter,
      updateStatusFilter: state.updateStatusFilter,
    }))
  );

  useEffect(() => {
    const statusParam = searchParams.get('status');
    if (statusParam && statusParam !== statusFilter) {
      updateStatusFilter(statusParam);
    }
  }, [searchParams, statusFilter, updateStatusFilter]);

  useEffect(() => {
    setPage(0);
  }, [searchTerm, statusFilter]);

  const { data, isLoading, isError, error, refetch } = useAllOrders({
    page,
    size: 20,
    sort: sortValue,
  });

  if (isError && !isLoading) {
    return (
      <PageErrorState
        title="Order Management"
        message={(error as Error)?.message || 'Failed to load orders'}
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
              Order Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              View and manage all orders
            </Typography>
          </div>
        </HeaderContent>
      </PageHeader>

      <FiltersContainer>
        <OrdersFilters sortValue={sortValue} onSortChange={setSortValue} />
      </FiltersContainer>

      <TableWrapper>
        <OrdersTable data={data} isLoading={isLoading} page={page} onPageChange={setPage} />
      </TableWrapper>
    </PageContainer>
  );
};
