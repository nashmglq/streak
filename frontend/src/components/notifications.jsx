import React, { useEffect, useRef } from 'react';
import { useSocket } from '../utils/utils';

const NotificationManager = () => {
  const { socket, isConnected } = useSocket();
  const notificationRef = useRef(null);
  const notificationShownRef = useRef(false);

  useEffect(() => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && notificationRef.current) {
        notificationRef.current.close();
        notificationRef.current = null;
        notificationShownRef.current = false;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!socket || !isConnected) return;

    const handleNotification = (data) => {
      if (document.visibilityState !== 'visible' && data.requiresAttention && !notificationShownRef.current) {
        showBrowserNotification(data.title, data.message);
      }
    };

    socket.on('midnightNotification', handleNotification);

    return () => {
      socket.off('midnightNotification', handleNotification);
    };
  }, [socket, isConnected]);

  const showBrowserNotification = (title, message) => {
    if (!('Notification' in window)) {
      return;
    }
    
    if (Notification.permission === 'granted') {
      notificationRef.current = new Notification(title, {
        body: message,
        icon: '/favicon.ico'
      });
      
      notificationShownRef.current = true;
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          showBrowserNotification(title, message);
        }
      });
    }
  };

  return null;
};

export default NotificationManager;