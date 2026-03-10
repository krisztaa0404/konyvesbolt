import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useBook } from '@hooks/useBook';
import { useCreateBook } from '@hooks/useCreateBook';
import { useUpdateBook } from '@hooks/useUpdateBook';
import { useDeleteBook } from '@hooks/useDeleteBook';
import { createBookSchema, type CreateBookFormData } from '@schemas/bookSchemas';
import { LoadingSpinner } from '@components/common/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { BookBasicInfoSection } from '@components/manager/books/BookBasicInfoSection';
import { BookPricingSection } from '@components/manager/books/BookPricingSection';
import { BookClassificationSection } from '@components/manager/books/BookClassificationSection';
import { BookDetailsSection } from '@components/manager/books/BookDetailsSection';
import { BookMetadataSection } from '@components/manager/books/BookMetadataSection';
import { PageBreadcrumbs } from '@components/manager/common/PageBreadcrumbs';
import { ROUTES } from '@router/routes';
import {
  PageContainer,
  PageHeader,
  HeaderContent,
  FormContainer,
  FormActions,
} from './AddEditBookPage.sc';

export const AddEditBookPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const {
    data: bookData,
    isLoading: isLoadingBook,
    isError: isBookError,
    error: bookError,
  } = useBook(id || '');

  const { mutate: createBook, isPending: isCreating } = useCreateBook();
  const { mutate: updateBook, isPending: isUpdating } = useUpdateBook();
  const { mutate: deleteBook, isPending: isDeleting } = useDeleteBook();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<CreateBookFormData>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: '',
      authors: [],
      isbn: '',
      publisher: '',
      publicationYear: new Date().getFullYear(),
      price: 0,
      stockQuantity: 0,
      availableFormats: [],
      genreIds: [],
      pageCount: null,
      description: '',
      tags: [],
      metadata: {
        language: '',
        dimensions: '',
        coverImageUrl: '',
        readingAge: '',
        bestsellerRanks: '',
        seriesName: '',
        seriesPosition: null,
        rating: null,
      },
    },
  });

  const coverImageUrl = watch('metadata.coverImageUrl');

  useEffect(() => {
    if (isEdit && bookData) {
      reset({
        title: bookData.title,
        authors: bookData.authors,
        isbn: bookData.isbn,
        publisher: bookData.publisher,
        publicationYear: bookData.publicationYear,
        price: bookData.price,
        stockQuantity: bookData.stockQuantity,
        availableFormats: bookData.availableFormats,
        genreIds: bookData.genres?.map(g => g.id) || [],
        pageCount: bookData.pageCount || null,
        description: bookData.description || '',
        tags: bookData.tags || [],
        metadata: {
          language: bookData.metadata?.language || '',
          dimensions: bookData.metadata?.dimensions || '',
          coverImageUrl: bookData.metadata?.coverImageUrl || '',
          readingAge: bookData.metadata?.readingAge || '',
          bestsellerRanks: bookData.metadata?.bestsellerRanks || '',
          seriesName: bookData.metadata?.seriesName || '',
          seriesPosition: bookData.metadata?.seriesPosition ?? null,
          rating: bookData.metadata?.rating ?? null,
        },
      });
    }
  }, [isEdit, bookData, reset]);

  const onSubmit = (data: CreateBookFormData) => {
    const cleanedData = {
      ...data,
      authors: data.authors.filter(a => a.trim()),
      tags: data.tags?.filter(t => t.trim()) || undefined,
      pageCount: data.pageCount ?? undefined,
      description: data.description || undefined,
      metadata: {
        language: data.metadata?.language?.trim() || undefined,
        dimensions: data.metadata?.dimensions?.trim() || undefined,
        coverImageUrl: data.metadata?.coverImageUrl?.trim() || undefined,
        readingAge: data.metadata?.readingAge?.trim() || undefined,
        bestsellerRanks: data.metadata?.bestsellerRanks?.trim() || undefined,
        seriesName: data.metadata?.seriesName?.trim() || undefined,
        seriesPosition: data.metadata?.seriesPosition ?? undefined,
        rating: data.metadata?.rating ?? undefined,
      },
    };

    if (isEdit && id) {
      updateBook({ bookId: id, book: cleanedData });
    } else {
      createBook(cleanedData);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setCancelDialogOpen(true);
    } else {
      navigate(ROUTES.MANAGER_BOOKS);
    }
  };

  const handleDelete = () => {
    if (id) {
      deleteBook(id);
      setDeleteDialogOpen(false);
    }
  };

  if (isEdit && isLoadingBook) {
    return (
      <PageContainer>
        <LoadingSpinner />
      </PageContainer>
    );
  }

  if (isEdit && isBookError) {
    return (
      <PageContainer>
        <PageHeader>
          <Typography variant="h4">Edit Book</Typography>
        </PageHeader>
        <ErrorMessage
          message={(bookError as Error)?.message || 'Failed to load book data'}
          severity="error"
        />
        <Button variant="contained" onClick={() => navigate(ROUTES.MANAGER_BOOKS)} sx={{ mt: 2 }}>
          Back to Books
        </Button>
      </PageContainer>
    );
  }

  const isPending = isCreating || isUpdating || isDeleting;

  return (
    <PageContainer>
      <PageBreadcrumbs
        items={[
          { label: 'Books', path: ROUTES.MANAGER_BOOKS },
          { label: isEdit ? 'Edit Book' : 'Add New Book' },
        ]}
      />

      <PageHeader>
        <HeaderContent>
          <div>
            <Typography variant="h4" gutterBottom>
              {isEdit ? 'Edit Book' : 'Add New Book'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {isEdit ? 'Update book information' : 'Create a new book entry'}
            </Typography>
          </div>
          {isEdit && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => setDeleteDialogOpen(true)}
              disabled={isPending}
            >
              Delete Book
            </Button>
          )}
        </HeaderContent>
      </PageHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormContainer>
          <BookBasicInfoSection control={control} errors={errors} disabled={isPending} />
          <BookPricingSection control={control} errors={errors} disabled={isPending} />
          <BookClassificationSection control={control} errors={errors} disabled={isPending} />
          <BookDetailsSection
            control={control}
            errors={errors}
            coverImageUrl={coverImageUrl}
            disabled={isPending}
          />
          <BookMetadataSection control={control} errors={errors} disabled={isPending} />

          <FormActions>
            <Button variant="outlined" onClick={handleCancel} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isPending}>
              {isPending ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Saving...
                </>
              ) : isEdit ? (
                'Update Book'
              ) : (
                'Create Book'
              )}
            </Button>
          </FormActions>
        </FormContainer>
      </form>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Book</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "{bookData?.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" disabled={isPending} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have unsaved changes. Are you sure you want to leave?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelDialogOpen(false)}>Stay</Button>
          <Button onClick={() => navigate(ROUTES.MANAGER_BOOKS)} color="warning" autoFocus>
            Leave
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};
