import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NavigationMap = ({ delivery }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const mapUrl = `https://www.google.com/maps?q=${delivery?.destinationCoords?.lat},${delivery?.destinationCoords?.lng}&z=14&output=embed`;

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`bg-card rounded-2xl border border-border overflow-hidden shadow-glow-md ${isFullscreen ? 'fixed inset-0 z-[1040] rounded-none' : ''}`}>
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon name="Navigation" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground">Navigation</h3>
            <p className="text-xs md:text-sm text-muted-foreground">Turn-by-turn directions</p>
          </div>
        </div>
        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
          aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          <Icon name={isFullscreen ? 'Minimize2' : 'Maximize2'} size={18} />
        </button>
      </div>
      <div className={`relative ${isFullscreen ? 'h-[calc(100vh-80px)]' : 'h-64 md:h-80 lg:h-96'}`}>
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Delivery Navigation Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
          className="border-0"
        />

        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
          <div className="bg-surface/95 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-border shadow-glow-md">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Navigation2" size={18} color="var(--color-primary)" />
              <p className="text-sm md:text-base font-medium text-foreground">Next Turn</p>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Turn right onto MG Road in 500m
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-surface/95 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Distance</p>
              <p className="text-sm md:text-base font-semibold text-foreground">{delivery?.distance}</p>
            </div>
            <div className="bg-surface/95 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">ETA</p>
              <p className="text-sm md:text-base font-semibold text-primary">{delivery?.eta}</p>
            </div>
            <div className="bg-surface/95 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Traffic</p>
              <p className="text-sm md:text-base font-semibold text-warning">Moderate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMap;