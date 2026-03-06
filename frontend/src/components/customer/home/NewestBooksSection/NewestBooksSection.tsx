import React from 'react';
import { Typography } from '@mui/material';
import type { Book } from '@types';
import { BookCard } from '@components/common/BookCard/BookCard';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { FeaturedBookCard } from '@components/customer/home/FeaturedBookCard/FeaturedBookCard';
import { FeaturedBookCardSkeleton } from '@components/customer/home/FeaturedBookCard/FeaturedBookCardSkeleton';
import { BookCardSkeleton } from '@components/common/BookCard/BookCardSkeleton';
import {
  SectionContainer,
  SectionHeader,
  FeaturedLayout,
  BooksGrid,
  ViewAllButton,
  ButtonContainer,
} from './NewestBooksSection.sc';

interface NewestBooksSectionProps {
  title: string;
  books: Book[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  viewAllLink?: string;
  onViewAll?: () => void;
  viewAllButtonText?: string;
}

export const NewestBooksSection: React.FC<NewestBooksSectionProps> = ({
  title,
  books,
  isLoading,
  isError,
  error,
  onViewAll,
  viewAllButtonText = 'Teljes lista',
}) => {
  // Loading state
  if (isLoading) {
    return (
      <SectionContainer>
        <SectionHeader>
          <Typography variant="h4">{title}</Typography>
        </SectionHeader>
        <FeaturedLayout>
          <FeaturedBookCardSkeleton />
          <BooksGrid>
            {Array.from({ length: 4 }).map((_, i) => (
              <BookCardSkeleton key={i} />
            ))}
          </BooksGrid>
        </FeaturedLayout>
        {onViewAll && (
          <ButtonContainer>
            <ViewAllButton variant="outlined" disabled>
              {viewAllButtonText}
            </ViewAllButton>
          </ButtonContainer>
        )}
      </SectionContainer>
    );
  }

  // Error state
  if (isError) {
    return (
      <SectionContainer>
        <SectionHeader>
          <Typography variant="h4">{title}</Typography>
        </SectionHeader>
        <ErrorMessage message={error?.message || 'Failed to load books'} />
      </SectionContainer>
    );
  }

  // Empty state
  if (!books || books.length === 0) {
    return (
      <SectionContainer>
        <SectionHeader>
          <Typography variant="h4">{title}</Typography>
        </SectionHeader>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          No books available
        </Typography>
      </SectionContainer>
    );
  }

  // Get featured book (first) and grid books (next 4)
  const featuredBook = books[0];
  const gridBooks = books.slice(1, 5);

  return (
    <SectionContainer>
      <SectionHeader>
        <Typography variant="h4">{title}</Typography>
      </SectionHeader>
      <FeaturedLayout>
        <FeaturedBookCard book={featuredBook} tagline="Barátság, sors, élet és halál" />
        {gridBooks.length > 0 && (
          <BooksGrid>
            {gridBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </BooksGrid>
        )}
      </FeaturedLayout>
      {onViewAll && (
        <ButtonContainer>
          <ViewAllButton variant="outlined" onClick={onViewAll}>
            {viewAllButtonText}
          </ViewAllButton>
        </ButtonContainer>
      )}
    </SectionContainer>
  );
};
