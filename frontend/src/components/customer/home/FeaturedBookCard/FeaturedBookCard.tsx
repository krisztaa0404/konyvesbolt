import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Book } from '@types';
import { getBookDetailRoute } from '@router/routes';
import {
  FeaturedContainer,
  BookCoverWrapper,
  BookCover,
  Tagline,
  CTAButton,
} from './FeaturedBookCard.sc';

interface FeaturedBookCardProps {
  book: Book;
  tagline?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const FeaturedBookCard: React.FC<FeaturedBookCardProps> = ({
  book,
  tagline,
  buttonText = 'Interested',
  onButtonClick,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (book.id) {
      navigate(getBookDetailRoute(book.id));
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onButtonClick) {
      onButtonClick();
    } else if (book.id) {
      navigate(getBookDetailRoute(book.id));
    }
  };

  return (
    <FeaturedContainer onClick={handleCardClick}>
      <BookCoverWrapper>
        <BookCover
          src={book.coverImageUrl || '/placeholder-book.jpg'}
          alt={book.title}
          onError={e => {
            e.currentTarget.src = '/placeholder-book.jpg';
          }}
        />
      </BookCoverWrapper>
      {tagline && <Tagline variant="body1">{tagline}</Tagline>}
      <CTAButton variant="contained" color="primary" onClick={handleButtonClick}>
        {buttonText}
      </CTAButton>
    </FeaturedContainer>
  );
};
