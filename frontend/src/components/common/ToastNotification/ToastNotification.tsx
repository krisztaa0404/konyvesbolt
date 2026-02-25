import { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useNotificationStore } from '@store/notificationStore';
import type { Notification } from '@types';

const AUTO_DISMISS_DURATION = 3000;

const ToastItem = ({ notification, index }: { notification: Notification; index: number }) => {
  const { removeNotification } = useNotificationStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(notification.id);
    }, AUTO_DISMISS_DURATION);

    return () => clearTimeout(timer);
  }, [notification.id, removeNotification]);

  const handleClose = () => {
    removeNotification(notification.id);
  };

  return (
    <Snackbar
      key={notification.id}
      open={true}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      style={{ bottom: `${index * 70 + 24}px` }}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={notification.type}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export const ToastNotification = () => {
  const { notifications } = useNotificationStore();

  return (
    <>
      {notifications.map((notification, index) => (
        <ToastItem key={notification.id} notification={notification} index={index} />
      ))}
    </>
  );
};
