/**
 * Address utilities for parsing and formatting address data
 */
import type { AddressDto } from '@types';

export const parseAddress = (addressData: AddressDto | AddressDto[] | undefined): AddressDto => {
  const defaultAddress: AddressDto = {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  };

  if (!addressData) {
    return defaultAddress;
  }

  try {
    if (Array.isArray(addressData)) {
      if (addressData.length === 0) {
        return defaultAddress;
      }
      return addressData.find((addr: AddressDto) => addr.isDefault) || addressData[0];
    }

    return {
      street: addressData.street || '',
      city: addressData.city || '',
      state: addressData.state || '',
      postalCode: addressData.postalCode || '',
      country: addressData.country || '',
      type: addressData.type ?? '',
      isDefault: addressData.isDefault ?? true,
    };
  } catch (e) {
    console.error('Failed to parse address data:', e);
  }

  return defaultAddress;
};

/**
 * Format address to AddressDto format
 * Converts frontend snake_case to backend camelCase
 */
export const formatAddressDto = (address: Partial<AddressDto>): AddressDto => {
  return {
    street: address.street || '',
    city: address.city || '',
    state: address.state || '',
    postalCode: address.postalCode || '',
    country: address.country || '',
    type: address.type || 'BILLING',
    phone: address.phone,
  };
};
