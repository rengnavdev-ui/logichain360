import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import QuickActionButton from '../../components/ui/QuickActionButton';
import ToastNotification from '../../components/ui/ToastNotification';
import FleetSummaryPanel from './components/FleetSummaryPanel';
import MapControls from './components/MapControls';
import GeofenceZone from './components/GeofenceZone';
import VehicleMarker from './components/VehicleMarker';
import VehicleDetailsPanel from './components/VehicleDetailsPanel';
import RoutePolyline from './components/RoutePolyline';
import Icon from '../../components/AppIcon';

const LiveTrackingMap = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showGeofences, setShowGeofences] = useState(true);
  const [mapZoom, setMapZoom] = useState(12);
  const [activeVehicles, setActiveVehicles] = useState([
    {
      id: 'VH-001',
      type: 'Heavy Truck',
      driver: 'Rajesh Kumar',
      status: 'On Route',
      location: { lat: 19.0760, lng: 72.8777 }, // Mumbai
      speed: '65 km/h',
      fuel: '78%',
      lastUpdate: '2 mins ago',
      destination: 'Delhi Hub',
      eta: '4:30 PM'
    },
    {
      id: 'VH-002',
      type: 'Medium Van',
      driver: 'Amit Sharma',
      status: 'Idle',
      location: { lat: 28.6139, lng: 77.2090 }, // Delhi
      speed: '0 km/h',
      fuel: '45%',
      lastUpdate: '5 mins ago',
      destination: 'Local Delivery',
      eta: 'N/A'
    }
  ]);

  useEffect(() => {
    const welcomeNotification = {
      id: Date.now(),
      type: 'success',
      title: 'Live Tracking Active',
      message: 'Fleet monitoring system is operational',
      duration: 5000
    };
    setNotifications([welcomeNotification]);

    // Simulate vehicle movement
    const movementInterval = setInterval(() => {
      setActiveVehicles(prev => prev?.map(v => {
        if (v?.status === 'On Route') {
          return {
            ...v,
            location: {
              lat: v?.location?.lat + (Math.random() - 0.5) * 0.01,
              lng: v?.location?.lng + (Math.random() - 0.5) * 0.01
            }
          };
        }
        return v;
      }));
    }, 5000);

    return () => clearInterval(movementInterval);
  }, []);

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    addNotification({
      type: 'info',
      title: 'Vehicle Selected',
      message: `Tracking ${vehicle?.id} - ${vehicle?.driver}`
    });
  };

  const addNotification = (notif) => {
    setNotifications(prev => [...prev, { id: Date.now(), ...notif, duration: 3000 }]);
  };

  const handleQuickAction = (action) => {
    addNotification({
        type: 'success',
        title: 'Action Triggered',
        message: `Command "${action}" sent to fleet`
    });
  };

  return (
    <>
      <Helmet>
        <title>Live Tracking Map - LogiChain360</title>
        <meta name="description" content="Real-time fleet tracking, geofencing, and advanced route monitoring with AI-powered ETA predictions and automated alerts." />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <RoleBasedNavigation userRole="manager" connectionStatus="connected" />
        
        <div className="flex-1 flex flex-col md:flex-row pt-16">
          {/* Sidebar */}
          <div className="w-full md:w-80 lg:w-96 border-r border-border bg-surface overflow-y-auto hidden md:block">
            <FleetSummaryPanel 
                vehicles={activeVehicles} 
                onSelectVehicle={handleVehicleSelect}
                selectedVehicleId={selectedVehicle?.id}
            />
          </div>

          {/* Map Area */}
          <div className="relative flex-1 bg-muted/20">
            {/* Mock Map Background */}
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/72.8777,19.0760,11/1200x800?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTAwMHozNnByOHN3bm53Z3oifQ.r_6P71J1f_6v0rk6Mdf-7g')] bg-cover bg-center opacity-40 grayscale pointer-events-none" />
            
            {/* Map Interactive Components */}
            <div className="absolute inset-0 overflow-hidden">
                {activeVehicles?.map(v => (
                    <VehicleMarker 
                        key={v?.id} 
                        vehicle={v} 
                        onClick={() => handleVehicleSelect(v)}
                        isSelected={selectedVehicle?.id === v?.id}
                    />
                ))}
                
                {showGeofences && <GeofenceZone />}
                {selectedVehicle && <RoutePolyline vehicle={selectedVehicle} />}
            </div>

            {/* Map Overlays */}
            <div className="absolute top-6 right-6">
              <MapControls 
                zoom={mapZoom} 
                onZoomChange={setMapZoom} 
                showGeofences={showGeofences}
                onToggleGeofences={() => setShowGeofences(!showGeofences)}
              />
            </div>

            {selectedVehicle && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl">
                <VehicleDetailsPanel 
                    vehicle={selectedVehicle} 
                    onClose={() => setSelectedVehicle(null)} 
                />
              </div>
            )}
          </div>
        </div>

        <QuickActionButton userRole="manager" onAction={handleQuickAction} />
        <ToastNotification 
            notifications={notifications} 
            onDismiss={(id) => setNotifications(prev => prev?.filter(n => n?.id !== id))} 
        />
      </div>
    </>
  );
};

export default LiveTrackingMap;
