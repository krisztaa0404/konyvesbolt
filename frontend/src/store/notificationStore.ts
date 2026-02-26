/**
 * Notification store for global toast messages
 */
import { create } from 'zustand';
import type { Notification, NotificationType } from '@types';

interface NotificationState {
  notifications: Notification[];
  addNotification: (message: string, type?: NotificationType) => string;
  removeNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>(set => ({
  notifications: [],

  addNotification: (message: string, type: NotificationType = 'success') => {
    const id = `${Date.now()}-${Math.random()}`;
    set(state => ({
      notifications: [...state.notifications, { id, message, type }],
    }));
    return id;
  },

  removeNotification: (id: string) => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id),
    }));
  },
}));
