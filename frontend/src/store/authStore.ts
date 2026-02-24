/**
 * Authentication store using Zustand
 * Manages user authentication state
 */
import { create } from 'zustand';
import { tokenStorage } from '@services/storage/tokenStorage';
import type { User } from '@types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  checkAuth: () => boolean;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  token: tokenStorage.getToken(),
  isAuthenticated: tokenStorage.hasToken(),
  isLoading: false,

  login: (token: string, user: User) => {
    tokenStorage.setToken(token);
    set({
      token,
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    tokenStorage.clearToken();
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  setUser: (user: User) => {
    set({ user });
  },

  checkAuth: () => {
    const hasToken = tokenStorage.hasToken();
    set({ isAuthenticated: hasToken });
    return hasToken;
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
}));

// Selectors for convenient access
export const selectUser = (state: AuthState) => state.user;
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
export const selectUserRole = (state: AuthState) => state.user?.role;
export const selectIsManager = (state: AuthState) =>
  state.user?.role === 'MANAGER' || state.user?.role === 'ADMIN';
export const selectIsAdmin = (state: AuthState) => state.user?.role === 'ADMIN';
