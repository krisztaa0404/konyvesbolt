import { AlertTitle } from '@mui/material';
import type { SxProps, Theme } from '@mui/system';
import { ErrorContainer, StyledAlert } from './ErrorMessage.sc';

interface ErrorMessageProps {
  title?: string;
  message: string;
  severity?: 'error' | 'warning' | 'info' | 'success';
  sx?: SxProps<Theme>;
}

export const ErrorMessage = ({ title, message, severity = 'error', sx }: ErrorMessageProps) => {
  return (
    <ErrorContainer sx={sx}>
      <StyledAlert severity={severity}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </StyledAlert>
    </ErrorContainer>
  );
};
