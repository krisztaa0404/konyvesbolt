import { StyledStatusChip } from './StatusChip.sc';

interface StatusChipProps {
  status: string;
  size?: 'small' | 'medium';
}

export const StatusChip = ({ status, size = 'small' }: StatusChipProps) => {
  return <StyledStatusChip $status={status} label={status} size={size} />;
};
