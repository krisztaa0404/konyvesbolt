/**
 * Authentication store using Zustand
 * Manages user authentication state with persistence
 */
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { tokenStorage } from '@services/auth/tokenStorage';
import { refreshTokenStorage } from '@services/auth/refreshTokenStorage';
import type { User } from '@types';

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (token: string, refreshToken: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  checkAuth: () => boolean;
  setLoading: (loading: boolean) => void;
  updateTokens: (accessToken: string, refreshToken: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set): AuthState => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      login: (token: string, refreshToken: string, user: User) => {
        tokenStorage.setToken(token);
        refreshTokenStorage.setRefreshToken(refreshToken);
        set({
          token,
          refreshToken,
          user,
          isAuthenticated: true,
        });
      },

      logout: () => {
        tokenStorage.clearToken();
        refreshTokenStorage.clearRefreshToken();
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },

      checkAuth: () => {
        const hasToken = tokenStorage.hasToken();
        const hasRefreshToken = refreshTokenStorage.hasRefreshToken();
        const isAuth = hasToken && hasRefreshToken;
        set({ isAuthenticated: isAuth });
        return isAuth;
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      updateTokens: (accessToken: string, refreshToken: string) => {
        tokenStorage.setToken(accessToken);
        refreshTokenStorage.setRefreshToken(refreshToken);
        set({
          token: accessToken,
          refreshToken,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Selectors for convenient access
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectUserRole = (state: AuthState) => state.user?.role;
export const selectIsManager = (state: AuthState) =>
  state.user?.role === 'MANAGER' || state.user?.role === 'ADMIN';
export const selectIsAdmin = (state: AuthState) => state.user?.role === 'ADMIN';
export const selectIsCustomer = (state: AuthState) => state.user?.role === 'USER';
