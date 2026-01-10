import React from 'react';

const StatusIndicator = ({ status = 'connected', showLabel = true, className = '' }) => {
  const statusConfig = {
    connected: {
      label: 'Connected',
      className: 'navbar-status-indicator connected',
    },
    disconnected: {
      label: 'Disconnected',
      className: 'navbar-status-indicator disconnected',
    },
    syncing: {
      label: 'Syncing...',
      className: 'navbar-status-indicator syncing',
    },
  };

  const config = statusConfig?.[status] || statusConfig?.connected;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={config?.className} />
      {showLabel && (
        <span className="text-sm text-muted-foreground">
          {config?.label}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;