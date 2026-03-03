import { useNavigate } from 'react-router-dom';
import { ListAlt, MenuBook, People } from '@mui/icons-material';
import { ROUTES } from '@router/routes';
import { ActionsContainer, ActionButton } from './QuickActions.sc';

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <ActionsContainer>
      <ActionButton
        variant="contained"
        size="large"
        startIcon={<ListAlt />}
        onClick={() => navigate(ROUTES.MANAGER_ORDERS)}
      >
        View All Orders
      </ActionButton>
      <ActionButton
        variant="contained"
        size="large"
        startIcon={<MenuBook />}
        onClick={() => navigate(ROUTES.MANAGER_BOOKS)}
      >
        Manage Books
      </ActionButton>
      <ActionButton
        variant="contained"
        size="large"
        startIcon={<People />}
        onClick={() => navigate(ROUTES.MANAGER_USERS)}
      >
        Manage Users
      </ActionButton>
    </ActionsContainer>
  );
};
