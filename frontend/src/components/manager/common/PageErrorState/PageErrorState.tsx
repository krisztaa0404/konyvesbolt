import { Typography, Button } from '@mui/material';
import { ErrorMessage } from '@components/common/ErrorMessage/ErrorMessage';
import { PageContainer, PageHeader } from '@layout/manager/ManagerPageLayout.sc';

interface PageErrorStateProps {
  title: string;
  message: string;
  onRetry: () => void;
}

export const PageErrorState = ({ title, message, onRetry }: PageErrorStateProps) => {
  return (
    <PageContainer>
      <PageHeader>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
      </PageHeader>
      <ErrorMessage message={message} severity="error" />
      <Button variant="contained" onClick={onRetry} sx={{ mt: 2 }}>
        Retry
      </Button>
    </PageContainer>
  );
};
