import { BookCard } from '@components/common/BookCard/BookCard';
import { BookCardSkeleton } from '@components/common/BookCard/BookCardSkeleton';
import type { Book } from '@types';
import { GridContainer } from './BookGrid.sc';

interface BookGridProps {
  books: Book[];
  loading?: boolean;
}

export const BookGrid: React.FC<BookGridProps> = ({ books, loading = false }) => {
  if (loading) {
    return (
      <GridContainer>
        {Array.from({ length: 20 }).map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      {books.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </GridContainer>
  );
};
