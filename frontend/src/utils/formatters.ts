import { format, parseISO } from 'date-fns';

export const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || amount === null) {
    return '$0.00';
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: string | Date | undefined): string => {
  if (!date) {
    return '';
  }
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
};

export const formatDateTime = (date: string | Date | undefined): string => {
  if (!date) {
    return '';
  }
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy HH:mm');
};

export const formatDateLong = (date: string | Date | undefined): string => {
  if (!date) {
    return '';
  }
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMMM dd, yyyy');
};

export const formatTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'HH:mm:ss');
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const truncateText = (text: string | undefined, maxLength: number = 50): string => {
  if (!text) {
    return '';
  }
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - 3) + '...';
};

export const formatOrderId = (orderId: string | undefined): string => {
  if (!orderId) {
    return 'Order #N/A';
  }
  return `Order #${orderId.substring(0, 8).toUpperCase()}`;
};
