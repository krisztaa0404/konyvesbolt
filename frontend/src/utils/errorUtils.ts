/**
 * Error handling utilities
 */
import type { ApiError } from '@types';

/**
 * Extract a user-friendly error message from an API error
 * @param error - The error object (unknown type from catch block)
 * @param defaultMessage - Fallback message if no error message is found
 * @returns A user-friendly error message string
 */
export const getErrorMessage = (error: unknown, defaultMessage = 'An error occurred'): string => {
  if (!error) {
    return defaultMessage;
  }

  const apiError = error as ApiError;

  // Try to get message from response.data.message (Axios error format)
  if (apiError.response?.data?.message) {
    return apiError.response.data.message;
  }

  // Try to get message from error.message (standard Error format)
  if (apiError.message) {
    return apiError.message;
  }

  return defaultMessage;
};
