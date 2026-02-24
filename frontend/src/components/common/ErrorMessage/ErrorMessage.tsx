import { AlertTitle } from '@mui/material';
import { ErrorContainer, StyledAlert } from './ErrorMessage.sc';

interface ErrorMessageProps {
  title?: string;
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
}

export const ErrorMessage = ({ title, message, severity = 'error' }: ErrorMessageProps) => {
  return (
    <ErrorContainer>
      <StyledAlert severity={severity}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </StyledAlert>
    </ErrorContainer>
  );
};
