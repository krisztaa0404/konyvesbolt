import { useState, useEffect } from 'react';
import { Typography, Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useShallow } from 'zustand/react/shallow';
import { useAllDiscounts } from '@hooks/useAllDiscounts';
import { useDeleteDiscount } from '@hooks/useDeleteDiscount';
import { useActivateDiscount } from '@hooks/useActivateDiscount';
import { useDeactivateDiscount } from '@hooks/useDeactivateDiscount';
import { useDiscountFilterStore } from '@store/manager/managerFilterStore';
import { DiscountsFilters } from '@components/manager/discounts/DiscountsFilters';
import { DiscountsTable } from '@components/manager/discounts/DiscountsTable';
import { DiscountFormDialog } from '@components/manager/discounts/DiscountFormDialog';
import { DeleteDiscountDialog } from '@components/manager/discounts/DeleteDiscountDialog';
import { PageErrorState } from '@components/manager/common/PageErrorState';
import type { SeasonalDiscount } from '@types';
import {
  PageContainer,
  PageHeader,
  HeaderContent,
  FiltersContainer,
  TableWrapper,
} from '@layout/manager/ManagerPageLayout.sc';

export const ManageDiscountsPage = () => {
  const [page, setPage] = useState(0);
  const [sortValue, setSortValue] = useState('createdAt,desc');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<SeasonalDiscount | null>(null);
  const [discountToDelete, setDiscountToDelete] = useState<{ id: string; name: string } | null>(
    null
  );

  const { searchTerm, statusFilter } = useDiscountFilterStore(
    useShallow(state => ({
      searchTerm: state.searchTerm,
      statusFilter: state.statusFilter,
    }))
  );

  useEffect(() => {
    setPage(0);
  }, [searchTerm, statusFilter]);

  const { data, isLoading, isError, error, refetch } = useAllDiscounts({
    page,
    size: 20,
    sort: sortValue,
  });

  const deleteDiscount = useDeleteDiscount();
  const activateDiscount = useActivateDiscount();
  const deactivateDiscount = useDeactivateDiscount();

  const handleAddNew = () => {
    setSelectedDiscount(null);
    setDialogOpen(true);
  };

  const handleEdit = (discount: SeasonalDiscount) => {
    setSelectedDiscount(discount);
    setDialogOpen(true);
  };

  const handleActivate = (discountId: string) => {
    activateDiscount.mutate(discountId);
  };

  const handleDeactivate = (discountId: string) => {
    deactivateDiscount.mutate(discountId);
  };

  const handleDelete = (discountId: string, discountName: string) => {
    setDiscountToDelete({ id: discountId, name: discountName });
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (discountToDelete) {
      deleteDiscount.mutate(discountToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setDiscountToDelete(null);
        },
      });
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedDiscount(null);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDiscountToDelete(null);
  };

  if (isError && !isLoading) {
    return (
      <PageErrorState
        title="Discount Management"
        message={(error as Error)?.message || 'Failed to load discounts'}
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
              Discount Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create and manage seasonal discounts
            </Typography>
          </div>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNew}>
            Add New Discount
          </Button>
        </HeaderContent>
      </PageHeader>

      <FiltersContainer>
        <DiscountsFilters sortValue={sortValue} onSortChange={setSortValue} />
      </FiltersContainer>

      <TableWrapper>
        <DiscountsTable
          data={data}
          isLoading={isLoading}
          page={page}
          onPageChange={setPage}
          onEdit={handleEdit}
          onActivate={handleActivate}
          onDeactivate={handleDeactivate}
          onDelete={handleDelete}
          onAddNew={handleAddNew}
        />
      </TableWrapper>

      <DiscountFormDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        discount={selectedDiscount}
      />

      <DeleteDiscountDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        discountName={discountToDelete?.name || ''}
        isPending={deleteDiscount.isPending}
      />
    </PageContainer>
  );
};
