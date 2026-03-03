import React from 'react';
import { Typography } from '@mui/material';
import type { Book } from '@types';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { RankedBookCard } from '@components/home/RankedBookCard/RankedBookCard';
import { RankedBookCardSkeleton } from '@components/home/RankedBookCard/RankedBookCardSkeleton';
import {
  SectionContainer,
  SectionHeader,
  BooksContainer,
  ViewAllButtonContainer,
  ViewAllButton,
} from './RankedBooksSection.sc';

interface RankedBooksSectionProps {
  title: string;
  books: Book[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  onViewAll?: () => void;
  viewAllButtonText?: string;
}

export const RankedBooksSection: React.FC<RankedBooksSectionProps> = ({
  title,
  books,
  isLoading,
  isError,
  error,
  onViewAll,
  viewAllButtonText = 'View Complete List',
}) => {
  if (isLoading) {
    return (
      <SectionContainer>
        <SectionHeader>
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
        </SectionHeader>
        <BooksContainer>
          {Array.from({ length: 5 }).map((_, index) => (
            <RankedBookCardSkeleton key={index} />
          ))}
        </BooksContainer>
      </SectionContainer>
    );
  }

  if (isError) {
    return (
      <SectionContainer>
        <SectionHeader>
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
        </SectionHeader>
        <ErrorMessage message={error?.message || 'Failed to load books'} />
      </SectionContainer>
    );
  }

  if (!books || books.length === 0) {
    return (
      <SectionContainer>
        <SectionHeader>
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
        </SectionHeader>
        <Typography variant="body1" color="text.secondary" align="center">
          No books available
        </Typography>
      </SectionContainer>
    );
  }

  const topFiveBooks = books.slice(0, 5);

  return (
    <SectionContainer>
      <SectionHeader>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
      </SectionHeader>
      <BooksContainer>
        {topFiveBooks.map((book, index) => (
          <RankedBookCard key={book.id} book={book} rank={index + 1} />
        ))}
      </BooksContainer>
      {onViewAll && (
        <ViewAllButtonContainer>
          <ViewAllButton variant="outlined" onClick={onViewAll}>
            {viewAllButtonText}
          </ViewAllButton>
        </ViewAllButtonContainer>
      )}
    </SectionContainer>
  );
};
