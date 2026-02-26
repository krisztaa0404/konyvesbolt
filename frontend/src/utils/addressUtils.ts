/**
 * Address utilities for parsing and formatting address data
 */
import type { Address } from '@types';

export const parseAddress = (addressData: unknown): Address => {
  const defaultAddress: Address = {
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  };

  if (!addressData) {
    return defaultAddress;
  }

  try {
    if (typeof addressData === 'object') {
      const data = addressData as Record<string, unknown>;

      if ('street' in data || 'city' in data) {
        return {
          street: String(data.street || ''),
          city: String(data.city || ''),
          state: String(data.state || ''),
          postal_code: String(data.postal_code || data.postalCode || ''), // Handle both formats
          country: String(data.country || ''),
          type: data.type ? String(data.type) : undefined,
          is_default:
            data.is_default !== undefined
              ? Boolean(data.is_default)
              : data.isDefault !== undefined
                ? Boolean(data.isDefault)
                : undefined,
        };
      }

      const values = Object.values(data);
      if (values.length > 0 && typeof values[0] === 'object') {
        const firstValue = values[0] as Record<string, unknown>;
        return {
          street: String(firstValue.street || ''),
          city: String(firstValue.city || ''),
          state: String(firstValue.state || ''),
          postal_code: String(firstValue.postal_code || firstValue.postalCode || ''),
          country: String(firstValue.country || ''),
          type: firstValue.type ? String(firstValue.type) : undefined,
          is_default:
            firstValue.is_default !== undefined
              ? Boolean(firstValue.is_default)
              : firstValue.isDefault !== undefined
                ? Boolean(firstValue.isDefault)
                : undefined,
        };
      }
    }

    // Fallback: try parsing as JSON string
    if (typeof addressData === 'string') {
      const parsed = JSON.parse(addressData);
      if (Array.isArray(parsed)) {
        return parseAddress(parsed[0]);
      }
      if (typeof parsed === 'object') {
        return parseAddress(parsed);
      }
    }
  } catch (e) {
    console.error('Failed to parse address data:', e);
  }

  return defaultAddress;
};

/**
 * Format address data as a Map for the backend
 * Returns an object with address type as key (e.g., { billing: {...} })
 * Uses camelCase property names to match backend expectations
 */
export const formatAddressAsMap = (
  address: Partial<Address>
): { [key: string]: Record<string, never> } => {
  const addressType = address.type || 'billing';
  return {
    [addressType]: {
      street: address.street || '',
      city: address.city || '',
      state: address.state || '',
      postalCode: address.postal_code || '', // Use camelCase for backend
      country: address.country || '',
      type: addressType,
      isDefault: address.is_default !== undefined ? address.is_default : true, // Use camelCase for backend
    } as unknown as Record<string, never>,
  };
};
