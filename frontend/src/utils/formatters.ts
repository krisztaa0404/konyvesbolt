import { format, parseISO } from 'date-fns';
import type { BookFormat } from '@types';

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

/**
 * Formats date as numeric MM/DD/YYYY
 */
export const formatDateNumeric = (dateString?: string): string => {
  if (!dateString) return '—';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
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

export const formatDateRange = (from?: string, to?: string): string => {
  if (!from || !to) return '';
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const fromMonth = fromDate.toLocaleDateString('en-US', { month: 'long' });
  const toMonth = toDate.toLocaleDateString('en-US', { month: 'long' });
  const fromDay = fromDate.getDate();
  const toDay = toDate.getDate();
  const year = toDate.getFullYear();

  // If same month, show: "March 21-25, 2026"
  if (fromMonth === toMonth) {
    return `${fromMonth} ${fromDay}-${toDay}, ${year}`;
  }

  // If different months, show: "March 21 - June 20, 2026"
  return `${fromMonth} ${fromDay} - ${toMonth} ${toDay}, ${year}`;
};

export const formatBookFormat = (format: BookFormat | string | undefined): string => {
  if (!format) return 'Physical';

  const formatMap: Record<string, string> = {
    physical: 'Physical',
    ebook: 'E-Book',
    audiobook: 'Audiobook',
  };

  return formatMap[format.toLowerCase()] || format;
};

/**
 * Normalizes book formats to API-compatible values
 */
export const normalizeBookFormat = (format: string | undefined): BookFormat => {
  if (!format) return 'physical';

  const normalized = format.toLowerCase();

  if (normalized === 'hardcover' || normalized === 'paperback') {
    return 'physical';
  }
  if (normalized === 'ebook') {
    return 'ebook';
  }
  if (normalized === 'audiobook') {
    return 'audiobook';
  }

  return 'physical';
};

/**
 * Converts ISO datetime string to HTML datetime-local input format (YYYY-MM-DDTHH:mm)
 */
export const toDatetimeLocal = (date?: string): string => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Converts HTML datetime-local input format to ISO datetime string
 */
export const fromDatetimeLocal = (datetimeLocal: string): string => {
  if (!datetimeLocal) return '';
  return new Date(datetimeLocal).toISOString();
};
