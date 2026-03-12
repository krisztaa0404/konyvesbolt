/**
 * Error types for API error handling
 */

// Base backend error response structure
export interface BackendErrorResponse {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  validationErrors?: Record<string, string> | null;
}

// Enhanced API error wrapping Axios error
export interface ApiError {
  originalError: unknown;
  backendError?: BackendErrorResponse;
  statusCode?: number;
  type: ErrorType;
  message: string;
  validationErrors?: Record<string, string>;
  requestPath?: string;
  timestamp?: string;
}

// Error categories
export enum ErrorType {
  NETWORK = 'NETWORK',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  NOT_FOUND = 'NOT_FOUND',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN',
}
