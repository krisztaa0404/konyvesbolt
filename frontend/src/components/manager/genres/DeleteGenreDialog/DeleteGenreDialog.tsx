import { DeleteConfirmDialog } from '@components/manager/common/DeleteConfirmDialog';

interface DeleteGenreDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  genreName: string;
  isPending: boolean;
}

export const DeleteGenreDialog = ({
  open,
  onClose,
  onConfirm,
  genreName,
  isPending,
}: DeleteGenreDialogProps) => {
  return (
    <DeleteConfirmDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      entityName={genreName}
      entityType="Genre"
      isPending={isPending}
      warningMessage="Warning: If this genre has associated books, deletion may fail."
    />
  );
};
