import { Typography, Button, Box } from '@mui/material';
import {
  Home as HomeIcon,
  MenuBook as BooksIcon,
  PageviewOutlined as PageIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@router/routes';
import { NotFoundContainer, ButtonGroup } from './NotFoundPage.sc';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <NotFoundContainer>
      <PageIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.7 }} />
      <Typography variant="h4" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        The page you're looking for doesn't exist. It may have been moved or deleted.
      </Typography>
      <Box sx={{ maxWidth: 500 }}>
        <Typography variant="body2" color="text.secondary">
          You can start browsing from our homepage or check out our collection of books.
        </Typography>
      </Box>
      <ButtonGroup>
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate(ROUTES.HOME)}
        >
          Go to Home
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<BooksIcon />}
          onClick={() => navigate(ROUTES.BROWSE_BOOKS)}
        >
          Browse Books
        </Button>
      </ButtonGroup>
    </NotFoundContainer>
  );
};
