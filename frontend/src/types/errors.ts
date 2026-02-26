/**
 * Error types for API error handling
 */

/**
 * Standard API error structure
 */
export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}
