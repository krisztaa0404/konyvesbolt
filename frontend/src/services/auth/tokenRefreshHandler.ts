/**
 * Token refresh handler
 * Manages automatic token refresh on 401 responses
 */
import { authApi } from './authApi';
import { refreshTokenStorage } from './refreshTokenStorage';
import { authSessionService } from './authSessionService';
import type { RefreshTokenResponse } from '@types';

let refreshPromise: Promise<string | null> | null = null;

let queue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function resolveQueue(error: unknown | null, token?: string) {
  queue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else if (token) resolve(token);
  });

  queue = [];
}

function assertRefreshResponse(res: RefreshTokenResponse) {
  if (!res.accessToken || !res.refreshToken) {
    throw new Error('Invalid refresh response');
  }
}

export async function attemptTokenRefresh(): Promise<string | null> {
  const refreshToken = refreshTokenStorage.getRefreshToken();

  if (!refreshToken) {
    return null;
  }

  if (refreshPromise) {
    return new Promise((resolve, reject) => {
      queue.push({ resolve, reject });
    });
  }

  refreshPromise = (async () => {
    try {
      const response = await authApi.refreshToken(refreshToken);

      assertRefreshResponse(response);

      const { accessToken, refreshToken: newRefresh } = response;

      authSessionService.updateSession(accessToken!, newRefresh!);

      resolveQueue(null, accessToken!);

      return accessToken!;
    } catch (error) {
      console.error('Token refresh failed:', error);

      resolveQueue(error);

      authSessionService.invalidateSession();

      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}
