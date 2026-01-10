import React from 'react';
import Icon from '../../../components/AppIcon';

const LiveFleetMonitor = ({ fleetData }) => {
  const getAlertColor = (type) => {
    const colors = {
      'delay': 'text-warning bg-warning/10 border-warning/30',
      'issue': 'text-error bg-error/10 border-error/30',
      'info': 'text-primary bg-primary/10 border-primary/30'
    };
    return colors?.[type] || colors?.['info'];
  };

  const getAlertIcon = (type) => {
    const icons = {
      'delay': 'Clock',
      'issue': 'AlertTriangle',
      'info': 'Info'
    };
    return icons?.[type] || 'Info';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon name="Radio" size={20} color="var(--color-primary)" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Live Fleet Monitor</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs md:text-sm text-success font-medium">Live</span>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="p-3 md:p-4 bg-surface rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Truck" size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">Active Vehicles</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-foreground">{fleetData?.activeVehicles}</p>
        </div>

        <div className="p-3 md:p-4 bg-surface rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Navigation" size={16} className="text-success" />
            <span className="text-xs text-muted-foreground">On Route</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-foreground">{fleetData?.onRoute}</p>
        </div>

        <div className="p-3 md:p-4 bg-surface rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-xs text-muted-foreground">Alerts</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-foreground">{fleetData?.alerts}</p>
        </div>

        <div className="p-3 md:p-4 bg-surface rounded-xl border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Zap" size={16} className="text-secondary" />
            <span className="text-xs text-muted-foreground">Avg Speed</span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-foreground">{fleetData?.avgSpeed}<span className="text-sm text-muted-foreground ml-1">km/h</span></p>
        </div>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-custom">
        <h4 className="text-sm font-semibold text-foreground mb-3">Recent Alerts</h4>
        {fleetData?.recentAlerts?.map((alert) => (
          <div 
            key={alert?.id}
            className={`p-4 rounded-xl border ${getAlertColor(alert?.type)}`}
          >
            <div className="flex items-start gap-3">
              <Icon name={getAlertIcon(alert?.type)} size={20} className="flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h5 className="text-sm font-semibold text-foreground">{alert?.title}</h5>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{alert?.time}</span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground mb-2">{alert?.message}</p>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={12} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{alert?.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveFleetMonitor;