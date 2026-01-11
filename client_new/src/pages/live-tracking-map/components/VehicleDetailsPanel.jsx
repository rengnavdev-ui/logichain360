import React from 'react';
import Icon from '../../../components/AppIcon';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const VehicleDetailsPanel = ({ vehicle, onClose }) => {
  return (
    <div className="bg-surface/90 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-glow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Icon name="Truck" size={32} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">{vehicle?.id}</h3>
            <p className="text-sm text-muted-foreground">{vehicle?.type} • {vehicle?.driver}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusIndicator status={vehicle?.status === 'On Route' ? 'success' : 'warning'} label={vehicle?.status} />
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted/30 rounded-xl transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-background border border-border rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Zap" size={14} color="var(--color-secondary)" />
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Speed</span>
          </div>
          <p className="text-lg font-bold">{vehicle?.speed}</p>
        </div>
        <div className="bg-background border border-border rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Droplets" size={14} color="var(--color-accent)" />
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Fuel</span>
          </div>
          <p className="text-lg font-bold">{vehicle?.fuel}</p>
        </div>
        <div className="bg-background border border-border rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Navigation" size={14} color="var(--color-primary)" />
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Destination</span>
          </div>
          <p className="text-lg font-bold truncate">{vehicle?.destination}</p>
        </div>
        <div className="bg-background border border-border rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Clock" size={14} color="var(--color-success)" />
            <span className="text-[10px] text-muted-foreground uppercase font-bold">ETA</span>
          </div>
          <p className="text-lg font-bold">{vehicle?.eta}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-glow-md transition-all">
          <Icon name="Phone" size={18} />
          Contact Driver
        </button>
        <button className="flex-1 bg-surface border border-border text-foreground py-2 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-muted/30 transition-all">
          <Icon name="Settings" size={18} />
          Redirect Route
        </button>
      </div>
    </div>
  );
};

export default VehicleDetailsPanel;
