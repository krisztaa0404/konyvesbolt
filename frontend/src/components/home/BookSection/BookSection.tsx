import { Typography, Button } from '@mui/material';
import { ArrowForward as ArrowIcon } from '@mui/icons-material';
import { BookCard } from '@components/common/BookCard/BookCard';
import { BookCardSkeleton } from '@components/common/BookCard/BookCardSkeleton';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import type { Book } from '@types';
import { SectionContainer, SectionHeader, BooksGrid } from './BookSection.sc';

interface BookSectionProps {
  title: string;
  books: Book[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  showSalesCount?: boolean;
  viewAllLink?: string;
  onViewAll?: () => void;
}

export const BookSection = ({
  title,
  books,
  isLoading,
  isError,
  error,
  showSalesCount = false,
  viewAllLink,
  onViewAll,
}: BookSectionProps) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
        {(viewAllLink || onViewAll) && !isLoading && !isError && (
          <Button
            endIcon={<ArrowIcon />}
            onClick={onViewAll}
          >
            View All
          </Button>
        )}
      </SectionHeader>
      {isError ? (
        <ErrorMessage message={error?.message || 'Failed to load books'} />
      ) : (
        <BooksGrid>
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <BookCardSkeleton key={index} />
            ))
          ) : books && books.length > 0 ? (
            books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                showSalesCount={showSalesCount}
              />
            ))
          ) : null}
        </BooksGrid>
      )}
    </SectionContainer>
  );
};
