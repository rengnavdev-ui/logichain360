import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ToastNotification = ({ notifications = [], onDismiss }) => {
  // Use a ref to track timers to clear them on unmount
  const timersRef = React.useRef({});

  useEffect(() => {
    notifications.forEach((notification) => {
      // Only set timer if not already set for this ID
      if (notification.autoDismiss !== false && !timersRef.current[notification.id]) {
        timersRef.current[notification.id] = setTimeout(() => {
          if (onDismiss) onDismiss(notification.id);
          delete timersRef.current[notification.id];
        }, notification.duration || 5000);
      }
    });

    // Cleanup function
    return () => {
      Object.values(timersRef.current).forEach(clearTimeout);
      timersRef.current = {};
    };
  }, [notifications, onDismiss]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Info';
    }
  };

  if (!notifications || notifications.length === 0) return null;

  return (
    <div
      className="toast-container"
      style={{
        position: 'fixed',
        top: '80px',
        right: '24px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '380px'
      }}
    >
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`toast-item ${notification.type || 'info'}`}
          style={{
            background: '#1A1F3A',
            border: `1px solid ${notification.type === 'success' ? '#00C853' :
                notification.type === 'warning' ? '#FFB300' :
                  notification.type === 'error' ? '#FF5252' : 'rgba(255, 255, 255, 0.1)'
              }`,
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            color: '#fff',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            minWidth: '300px',
            animation: 'slideIn 0.3s ease-out'
          }}
        >
          <Icon
            name={getIcon(notification.type)}
            size={20}
            color={
              notification.type === 'success' ? '#00C853' :
                notification.type === 'warning' ? '#FFB300' :
                  notification.type === 'error' ? '#FF5252' : '#00E5FF'
            }
          />
          <div className="flex-1">
            {notification.title && (
              <h4 className="font-semibold text-sm mb-1">{notification.title}</h4>
            )}
            <p className="text-sm text-gray-300">{notification.message}</p>
          </div>
          <button
            onClick={() => onDismiss && onDismiss(notification.id)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ToastNotification;