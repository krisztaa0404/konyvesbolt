/**
 * Refresh token storage utilities
 * Manages refresh token in localStorage
 */

const REFRESH_TOKEN_KEY = 'refresh_token';

export const refreshTokenStorage = {
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  clearRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  hasRefreshToken(): boolean {
    return !!this.getRefreshToken();
  },
};
