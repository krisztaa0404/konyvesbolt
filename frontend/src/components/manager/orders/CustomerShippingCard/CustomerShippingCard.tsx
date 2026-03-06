import { Typography, Divider, Box } from '@mui/material';
import { parseAddress } from '@utils/addressUtils';
import type { AddressDto, User } from '@types';
import { SectionCard, AddressBlock } from './CustomerShippingCard.sc';

interface CustomerShippingCardProps {
  user?: User;
  shippingAddress?: AddressDto;
}

export const CustomerShippingCard = ({ user, shippingAddress }: CustomerShippingCardProps) => {
  const address = parseAddress(shippingAddress);

  return (
    <SectionCard>
      <Typography variant="h6" gutterBottom>
        Customer & Shipping Information
      </Typography>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Customer Details
          </Typography>
          <AddressBlock>
            <Typography variant="body2">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2">{user?.email}</Typography>
            {user?.phone && <Typography variant="body2">{user.phone}</Typography>}
          </AddressBlock>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Shipping Address
          </Typography>
          <AddressBlock>
            <Typography variant="body2">{address.street}</Typography>
            <Typography variant="body2">
              {address.city}
              {address.state && `, ${address.state}`} {address.postalCode}
            </Typography>
            <Typography variant="body2">{address.country}</Typography>
            {(address.phone || user?.phone) && (
              <Typography variant="body2">Phone: {address.phone || user?.phone}</Typography>
            )}
          </AddressBlock>
        </Box>
      </Box>
    </SectionCard>
  );
};
