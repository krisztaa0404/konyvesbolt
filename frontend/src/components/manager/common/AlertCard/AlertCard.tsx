import { Typography, Badge } from '@mui/material';
import { AlertStyledCard, IconContainer, ContentContainer } from './AlertCard.sc';

interface AlertCardProps {
  title: string;
  count: number;
  severity: 'warning' | 'error';
  icon: React.ReactNode;
  onClick: () => void;
}

export const AlertCard = ({ title, count, severity, icon, onClick }: AlertCardProps) => {
  return (
    <AlertStyledCard
      $severity={severity}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${title}: ${count} items`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      <IconContainer $severity={severity}>
        <Badge badgeContent={count} color={severity} max={99}>
          {icon}
        </Badge>
      </IconContainer>
      <ContentContainer>
        <Typography variant="h6" fontWeight={600}>
          {count}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </ContentContainer>
    </AlertStyledCard>
  );
};
