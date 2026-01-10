import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queuedUpdates, setQueuedUpdates] = useState(3);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed top-20 left-4 right-4 md:left-auto md:right-6 md:w-80 z-[1030] bg-warning/10 backdrop-blur-sm border border-warning rounded-xl p-3 md:p-4 shadow-glow-lg">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center flex-shrink-0">
          <Icon name="WifiOff" size={20} color="var(--color-warning)" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm md:text-base font-semibold text-foreground mb-1">Offline Mode</p>
          <p className="text-xs md:text-sm text-muted-foreground mb-2">
            You're currently offline. Updates will sync when connection is restored.
          </p>
          {queuedUpdates > 0 && (
            <div className="flex items-center gap-2 text-xs text-warning">
              <Icon name="Clock" size={14} />
              <span>{queuedUpdates} updates queued</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfflineIndicator;