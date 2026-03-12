/**
 * Auth session service
 * Encapsulates store interactions and logout side effects
 */
import { useAuthStore } from '@store/authStore';

export const authSessionService = {
  updateSession(accessToken: string, refreshToken: string) {
    useAuthStore.getState().updateTokens(accessToken, refreshToken);
  },

  invalidateSession() {
    useAuthStore.getState().logout();
    window.dispatchEvent(new Event('auth:logout'));
  },
};
