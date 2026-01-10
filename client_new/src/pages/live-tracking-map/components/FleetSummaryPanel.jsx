import React from 'react';
import Icon from '../../../components/AppIcon';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const FleetSummaryPanel = ({ vehicles, onSelectVehicle, selectedVehicleId }) => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Icon name="Activity" color="var(--color-primary)" />
          Fleet Overview
        </h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-background border border-border rounded-xl p-3">
            <p className="text-xs text-muted-foreground mb-1">On Route</p>
            <p className="text-xl font-bold text-success">{vehicles?.filter(v => v?.status === 'On Route')?.length}</p>
          </div>
          <div className="bg-background border border-border rounded-xl p-3">
            <p className="text-xs text-muted-foreground mb-1">Maintenance</p>
            <p className="text-xl font-bold text-warning">1</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Vehicles</h3>
        <div className="space-y-3">
          {vehicles?.map(vehicle => (
            <button
              key={vehicle?.id}
              onClick={() => onSelectVehicle(vehicle)}
              className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                selectedVehicleId === vehicle?.id 
                ? 'bg-primary/10 border-primary ring-1 ring-primary' 
                : 'bg-background border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center">
                    <Icon name="Truck" size={16} color={selectedVehicleId === vehicle?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{vehicle?.id}</p>
                    <p className="text-xs text-muted-foreground">{vehicle?.driver}</p>
                  </div>
                </div>
                <StatusIndicator 
                    status={vehicle?.status === 'On Route' ? 'success' : 'warning'} 
                    label={vehicle?.status}
                    size="sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Navigation" size={10} />
                  {vehicle?.destination}
                </div>
                <div className="flex items-center gap-1 justify-end">
                  <Icon name="Clock" size={10} />
                  ETA: {vehicle?.eta}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface-secondary/50 rounded-xl p-4 border border-border">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Icon name="Bell" size={14} color="var(--color-secondary)" />
            Recent Alerts
        </h4>
        <div className="space-y-3">
          <div className="flex gap-3 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Geofence Breach - VH-004</p>
              <p className="text-muted-foreground">Okhla Industrial Area • 10m ago</p>
            </div>
          </div>
          <div className="flex gap-3 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-warning mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Low Fuel Alert - VH-001</p>
              <p className="text-muted-foreground">NH-48 Corridor • 25m ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetSummaryPanel;