import { Skeleton } from '@mui/material';
import type { Book } from '@types';
import { BookListItem } from './BookListItem';
import { ListContainer, ListItemContainer } from './BookList.sc';

interface BookListProps {
  books: Book[];
  loading?: boolean;
}

const BookListSkeleton = () => (
  <ListItemContainer sx={{ cursor: 'default', '&:hover': { transform: 'none' } }}>
    <Skeleton variant="rectangular" width="100%" height={100} />
  </ListItemContainer>
);

export const BookList: React.FC<BookListProps> = ({ books, loading = false }) => {
  if (loading) {
    return (
      <ListContainer>
        {Array.from({ length: 20 }).map((_, index) => (
          <BookListSkeleton key={index} />
        ))}
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {books.map(book => (
        <BookListItem key={book.id} book={book} />
      ))}
    </ListContainer>
  );
};
