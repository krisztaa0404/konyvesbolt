import { DeleteConfirmDialog } from '@components/manager/common/DeleteConfirmDialog';

interface DeleteDiscountDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  discountName: string;
  isPending: boolean;
}

export const DeleteDiscountDialog = ({
  open,
  onClose,
  onConfirm,
  discountName,
  isPending,
}: DeleteDiscountDialogProps) => {
  return (
    <DeleteConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      entityName={discountName}
      entityType="Discount"
      isPending={isPending}
      warningMessage="Warning: This action cannot be undone."
      additionalInfo="Note: Orders that used this discount will retain their discount information for historical purposes."
    />
  );
};
