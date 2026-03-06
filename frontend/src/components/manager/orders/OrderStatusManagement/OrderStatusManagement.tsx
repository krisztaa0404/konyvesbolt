import { useState, useEffect } from 'react';
import {
  Typography,
  Divider,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import { OrderStatus, OrderStatusLabels } from '@types';
import { SectionCard, StatusManagementSection } from './OrderStatusManagement.sc';

interface OrderStatusManagementProps {
  currentStatus?: OrderStatus;
  onStatusUpdate: (newStatus: OrderStatus) => Promise<void>;
  isUpdating: boolean;
}

export const OrderStatusManagement = ({
  currentStatus,
  onStatusUpdate,
  isUpdating,
}: OrderStatusManagementProps) => {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null);

  useEffect(() => {
    if (currentStatus) {
      setSelectedStatus(currentStatus);
    }
  }, [currentStatus]);

  const handleUpdate = async () => {
    if (selectedStatus && selectedStatus !== currentStatus) {
      await onStatusUpdate(selectedStatus);
    }
  };

  const isStatusChanged = selectedStatus !== currentStatus;

  return (
    <SectionCard>
      <StatusManagementSection>
        <Typography variant="h6" gutterBottom>
          Update Order Status
        </Typography>
        <Divider />
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={selectedStatus || ''}
            label="Status"
            onChange={e => setSelectedStatus(e.target.value as OrderStatus)}
            disabled={isUpdating}
          >
            {Object.values(OrderStatus).map(status => (
              <MenuItem key={status} value={status}>
                {OrderStatusLabels[status]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          fullWidth
          onClick={handleUpdate}
          disabled={!isStatusChanged || isUpdating}
          startIcon={isUpdating ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isUpdating ? 'Updating...' : 'Update Status'}
        </Button>
      </StatusManagementSection>
    </SectionCard>
  );
};
