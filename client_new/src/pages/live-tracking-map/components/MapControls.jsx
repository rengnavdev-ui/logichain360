import React from 'react';
import Icon from '../../../components/AppIcon';

const MapControls = ({ zoom, onZoomChange, showGeofences, onToggleGeofences }) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="bg-surface/80 backdrop-blur-md border border-border rounded-xl p-1.5 flex flex-col gap-1 shadow-glow-sm">
        <button 
            onClick={() => onZoomChange(zoom + 1)}
            className="w-10 h-10 rounded-lg bg-background hover:bg-muted/30 flex items-center justify-center transition-colors border border-border"
        >
          <Icon name="Plus" size={20} />
        </button>
        <button 
            onClick={() => onZoomChange(Math.max(1, zoom - 1))}
            className="w-10 h-10 rounded-lg bg-background hover:bg-muted/30 flex items-center justify-center transition-colors border border-border"
        >
          <Icon name="Minus" size={20} />
        </button>
      </div>

      <div className="bg-surface/80 backdrop-blur-md border border-border rounded-xl p-1.5 flex flex-col gap-1 shadow-glow-sm">
        <button 
            onClick={onToggleGeofences}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors border ${
                showGeofences ? 'bg-primary/20 border-primary text-primary' : 'bg-background border-border hover:bg-muted/30'
            }`}
            title="Toggle Geofences"
        >
          <Icon name="Shield" size={20} />
        </button>
        <button className="w-10 h-10 rounded-lg bg-background hover:bg-muted/30 flex items-center justify-center transition-colors border border-border" title="Layer Switcher">
          <Icon name="Layers" size={20} />
        </button>
        <button className="w-10 h-10 rounded-lg bg-background hover:bg-muted/30 flex items-center justify-center transition-colors border border-border" title="Focus Fleet">
          <Icon name="Scan" size={20} />
        </button>
      </div>
      
      <div className="bg-surface/80 backdrop-blur-md border border-border rounded-xl p-1.5 shadow-glow-sm">
        <button className="w-10 h-10 rounded-lg bg-background hover:bg-muted/30 flex items-center justify-center transition-colors border border-border" title="Traffic Layer">
          <Icon name="Zap" size={20} color="var(--color-warning)" />
        </button>
      </div>
    </div>
  );
};

export default MapControls;