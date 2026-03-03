import { StyledCard, IconContainer, ValueText, LabelText } from './MetricCard.sc';

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

export const MetricCard = ({ title, value, icon, color = 'primary' }: MetricCardProps) => {
  return (
    <StyledCard>
      <IconContainer $color={color}>{icon}</IconContainer>
      <ValueText variant="h3">{value}</ValueText>
      <LabelText variant="body2" color="text.secondary">
        {title}
      </LabelText>
    </StyledCard>
  );
};
