import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  IconButton,
  Box,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createGenreSchema,
  updateGenreSchema,
  type CreateGenreFormData,
  type UpdateGenreFormData,
} from '@schemas/genreSchemas';
import { useCreateGenre } from '@hooks/useCreateGenre';
import { useUpdateGenre } from '@hooks/useUpdateGenre';
import type { Genre, CreateGenre, UpdateGenre } from '@types';
import { FormContent, FieldContainer } from './GenreFormDialog.sc';

interface GenreFormDialogProps {
  open: boolean;
  onClose: () => void;
  genre?: Genre | null;
}

export const GenreFormDialog = ({ open, onClose, genre }: GenreFormDialogProps) => {
  const isEditMode = !!genre;
  const createGenre = useCreateGenre();
  const updateGenre = useUpdateGenre();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGenreFormData | UpdateGenreFormData>({
    resolver: zodResolver(isEditMode ? updateGenreSchema : createGenreSchema),
    defaultValues: {
      name: genre?.name || '',
      description: genre?.description || '',
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: genre?.name || '',
        description: genre?.description || '',
      });
    }
  }, [open, genre, reset]);

  const onSubmit = (data: CreateGenreFormData | UpdateGenreFormData) => {
    const hasDescription = data.description && data.description.trim() !== '';

    const apiData = {
      name: data.name,
      ...(hasDescription && { description: data.description }),
    };

    if (isEditMode && genre?.id) {
      updateGenre.mutate(
        { genreId: genre.id, genre: apiData as UpdateGenre },
        {
          onSuccess: () => {
            reset();
            onClose();
          },
        }
      );
    } else {
      createGenre.mutate(apiData as CreateGenre, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const isPending = createGenre.isPending || updateGenre.isPending;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>{isEditMode ? 'Edit Genre' : 'Add New Genre'}</span>
          <IconButton aria-label="close" onClick={handleClose} disabled={isPending} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FormContent>
            <FieldContainer>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    required
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={isPending}
                  />
                )}
              />
            </FieldContainer>

            <FieldContainer>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    fullWidth
                    multiline
                    rows={3}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    disabled={isPending}
                    value={field.value || ''}
                  />
                )}
              />
            </FieldContainer>
          </FormContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            startIcon={isPending && <CircularProgress size={20} />}
          >
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
