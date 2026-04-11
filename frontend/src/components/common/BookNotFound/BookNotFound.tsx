import { Typography, Button } from '@mui/material';
import {
  Home as HomeIcon,
  MenuBook as BooksIcon,
  SearchOff as SearchOffIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/routes';
import { NotFoundContainer, ButtonGroup } from './BookNotFound.sc';

export const BookNotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <SearchOffIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.7 }} />
      <Typography variant="h4" gutterBottom>
        Book Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Sorry, we couldn't find the book you're looking for. It may have been removed or is no
        longer available.
      </Typography>
      <ButtonGroup>
        <Button
          variant="contained"
          size="large"
          startIcon={<BooksIcon />}
          onClick={() => navigate(ROUTES.BROWSE_BOOKS)}
        >
          Browse All Books
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate(ROUTES.HOME)}
        >
          Go to Home
        </Button>
      </ButtonGroup>
    </NotFoundContainer>
  );
};
