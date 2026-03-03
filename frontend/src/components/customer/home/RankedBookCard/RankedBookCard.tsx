import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import type { Book } from '@types';
import { getBookDetailRoute } from '@router/routes';
import { truncateText } from '@utils/formatters';
import {
  RankContainer,
  RankNumber,
  BookContent,
  BookImageWrapper,
  BookImage,
  BookMeta,
} from './RankedBookCard.sc';

interface RankedBookCardProps {
  book: Book;
  rank: number;
}

export const RankedBookCard: React.FC<RankedBookCardProps> = ({ book, rank }) => {
  const navigate = useNavigate();

  const coverImage = book.coverImageUrl || '/placeholder-book.jpg';

  const handleCardClick = () => {
    if (book.id) {
      navigate(getBookDetailRoute(book.id));
    }
  };

  return (
    <RankContainer onClick={handleCardClick}>
      <RankNumber>{rank}</RankNumber>
      <BookContent>
        <BookImageWrapper>
          <BookImage src={coverImage} alt={book.title} />
        </BookImageWrapper>
        <BookMeta>
          <Typography variant="h6" component="h3">
            {truncateText(book.title, 40)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.authors?.join(', ')}
          </Typography>
        </BookMeta>
      </BookContent>
    </RankContainer>
  );
};
