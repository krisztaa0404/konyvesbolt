import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/routes';
import { formatNumber } from '@utils/formatters';
import type { GenreStatistics } from '@types';
import { StyledCard, StyledCardContent, StatNumber } from './GenreStatisticsCard.sc';

interface GenreStatisticsCardProps {
  genre: GenreStatistics;
}

export const GenreStatisticsCard = ({ genre }: GenreStatisticsCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${ROUTES.BROWSE_BOOKS}?genre=${genre.genreId}`);
  };

  return (
    <StyledCard onClick={handleClick}>
      <StyledCardContent>
        <Typography variant="h6" component="h3">
          {genre.genreName}
        </Typography>
        <StatNumber>{formatNumber(genre.bookCount ?? 0)}</StatNumber>
        <Typography variant="body2" color="text.secondary">
          Books Available
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {formatNumber(genre.totalSales ?? 0)} Sold
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
};
