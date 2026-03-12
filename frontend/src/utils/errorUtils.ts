/**
 * Error handling utilities
 */
import { AxiosError } from 'axios';
import { type ApiError, type BackendErrorResponse, ErrorType } from '@types';

/**
 * Type guard to check if error is an ApiError
 */
export function isApiError(error: unknown): error is ApiError {
  return typeof error === 'object' && error !== null && 'type' in error && 'message' in error;
}

/**
 * Type guard to check if error is a validation error with field-level errors
 */
export function isValidationError(
  error: unknown
): error is ApiError & { validationErrors: Record<string, string> } {
  return isApiError(error) && error.type === ErrorType.VALIDATION && !!error.validationErrors;
}

/**
 * Type guard for Axios errors
 */
function isAxiosError(error: unknown): error is AxiosError<BackendErrorResponse> {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    error.isAxiosError === true
  );
}

/**
 * Parses any error into a structured ApiError
 */
export function parseError(error: unknown, defaultMessage = 'An error occurred'): ApiError {
  if (isApiError(error)) {
    return error;
  }

  if (isAxiosError(error) && error.response) {
    const backendError = error.response.data as BackendErrorResponse;
    const statusCode = error.response.status;

    return {
      originalError: error,
      backendError,
      statusCode,
      type: categorizeErrorByStatus(statusCode),
      message: backendError.message || defaultMessage,
      validationErrors: backendError.validationErrors || undefined,
      requestPath: backendError.path,
      timestamp: backendError.timestamp,
    };
  }

  if (isAxiosError(error)) {
    return {
      originalError: error,
      type: ErrorType.NETWORK,
      message: error.message || 'Network error. Please check your connection.',
    };
  }

  if (error instanceof Error) {
    return {
      originalError: error,
      type: ErrorType.UNKNOWN,
      message: error.message || defaultMessage,
    };
  }

  return {
    originalError: error,
    type: ErrorType.UNKNOWN,
    message: defaultMessage,
  };
}

/**
 * Categorizes error by HTTP status code
 */
function categorizeErrorByStatus(status: number): ErrorType {
  if (status === 400) return ErrorType.VALIDATION;
  if (status === 401) return ErrorType.AUTHENTICATION;
  if (status === 403) return ErrorType.AUTHORIZATION;
  if (status === 404) return ErrorType.NOT_FOUND;
  if (status >= 500) return ErrorType.SERVER;
  return ErrorType.UNKNOWN;
}

/**
 * Gets user-friendly error message
 * @param error - The error object (unknown type from catch block)
 * @param defaultMessage - Fallback message if no error message is found
 * @returns A user-friendly error message string
 */
export function getErrorMessage(error: unknown, defaultMessage = 'An error occurred'): string {
  const apiError = parseError(error, defaultMessage);
  return apiError.message;
}
