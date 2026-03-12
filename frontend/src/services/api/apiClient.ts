/**
 * Axios API client with authentication interceptors
 */
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';
import { tokenStorage } from '@services/auth/tokenStorage';
import { attemptTokenRefresh } from '@services/auth/tokenRefreshHandler';

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: params => {
      return qs.stringify(params, {
        arrayFormat: 'repeat',
        skipNulls: true,
        allowDots: true,
      });
    },
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Auth endpoints that should not trigger token refresh
const AUTH_ENDPOINTS = ['/auth/login', '/auth/register', '/auth/refresh'];

apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      if (AUTH_ENDPOINTS.some(endpoint => originalRequest.url?.includes(endpoint))) {
        return Promise.reject(error);
      }

      const newAccessToken = await attemptTokenRefresh();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } else {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
