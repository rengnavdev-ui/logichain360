import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { renderToString } from 'react-dom/server';

const NavigationMap = ({ delivery }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gpsStatus, setGpsStatus] = useState('GPS Active');

  // Custom Route Coords (Mocking a route)
  const routePath = [
    [19.0760, 72.8777], // Mumbai Start
    [19.0800, 72.8800],
    [19.0850, 72.8900],
    [19.0900, 72.8950],
    [19.1000, 72.9000], // Midpoint
    [19.1100, 72.9100],
    [19.1200, 72.9200],
    [19.2183, 72.9781]  // Mumbai End (Mock)
  ];

  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      // Init Map
      mapInstance.current = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView([19.0760, 72.8777], 12);

      // Dark Theme Tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: 'Map data &copy; OpenStreetMap'
      }).addTo(mapInstance.current);

      // Add Zoom Control
      L.control.zoom({ position: 'topleft' }).addTo(mapInstance.current);

      // Draw Route Polyline (Green)
      L.polyline(routePath, {
        color: '#10b981', // Emerald-500
        weight: 5,
        opacity: 0.9,
        lineJoin: 'round'
      }).addTo(mapInstance.current);

      // Start Marker
      const startIcon = L.divIcon({
        html: renderToString(
          <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg pulse-ring"></div>
        ),
        className: 'custom-div-icon',
        iconSize: [20, 20]
      });
      L.marker(routePath[0], { icon: startIcon }).addTo(mapInstance.current);

      // End Marker
      const endIcon = L.divIcon({
        html: renderToString(
          <div className="w-8 h-8 rounded-full bg-red-500 border-2 border-white shadow-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
        ),
        className: 'custom-div-icon',
        iconSize: [32, 32]
      });
      L.marker(routePath[routePath.length - 1], { icon: endIcon }).addTo(mapInstance.current);

      // Fit Bounds
      const bounds = L.latLngBounds(routePath);
      mapInstance.current.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    }
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setTimeout(() => {
      mapInstance.current?.invalidateSize();
    }, 100);
  };

  return (
    <div className={`bg-card rounded-2xl border border-border overflow-hidden shadow-glow-md flex flex-col ${isFullscreen ? 'fixed inset-0 z-[1040] rounded-none' : 'h-[500px]'}`}>

      {/* Header Controls */}
      <div className="flex items-center justify-between p-4 bg-surface/95 backdrop-blur border-b border-border z-10">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-foreground">Live Navigation</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold text-green-500 uppercase">{gpsStatus}</span>
          </div>
          <div className="bg-blue-500 px-3 py-1 rounded-full text-xs font-bold text-white">
            0 km/h
          </div>
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors ml-2"
          >
            <Icon name={isFullscreen ? 'Minimize2' : 'Maximize2'} size={18} />
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative flex-1 bg-[#1a1c23]">
        <div ref={mapRef} className="absolute inset-0 z-0" />

        {/* Navigation Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-[500]">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Next Stop</p>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">MH-Nashik Warehouse</h2>
              <p className="text-sm text-gray-300">Turn right in 200m</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">ETA</p>
              <p className="text-xl font-bold text-yellow-400 animate-pulse">Calculating...</p>
              <div className="mt-1 flex items-center justify-end gap-1">
                <span className="text-xs text-white">GPS Accuracy</span>
                <span className="text-sm font-mono font-bold text-white">4734m</span>
              </div>
              <p className="text-[10px] text-green-400 font-bold">● Good</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMap;