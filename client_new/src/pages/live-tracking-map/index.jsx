import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import QuickActionButton from '../../components/ui/QuickActionButton';
import ToastNotification from '../../components/ui/ToastNotification';
import FleetSummaryPanel from './components/FleetSummaryPanel';
import MapControls from './components/MapControls';
import VehicleDetailsPanel from './components/VehicleDetailsPanel';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { socket } from '../../utils/socket';
import { renderToString } from 'react-dom/server';
import Icon from '../../components/AppIcon';
import LiveTrackingFeaturesModal from './components/LiveTrackingFeaturesModal';

const LiveTrackingMap = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});
  const [showFeaturesModal, setShowFeaturesModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showGeofences, setShowGeofences] = useState(true);
  const [mapZoom, setMapZoom] = useState(11);
  const [activeVehicles, setActiveVehicles] = useState([
    {
      id: 'VH-001',
      type: 'Heavy Truck',
      driver: 'Rajesh Kumar',
      status: 'On Route',
      location: { lat: 19.0760, lng: 72.8777 },
      speed: '65 km/h',
      fuel: '78%',
      lastUpdate: 'Live',
      destination: 'Delhi Hub',
      eta: '4:30 PM'
    },
    {
      id: 'VH-002',
      type: 'Medium Van',
      driver: 'Amit Sharma',
      status: 'Idle',
      location: { lat: 28.6139, lng: 77.2090 },
      speed: '0 km/h',
      fuel: '45%',
      lastUpdate: '5 mins ago',
      destination: 'Local Delivery',
      eta: 'N/A'
    },
    {
      id: 'VH-003',
      type: 'Heavy Truck',
      driver: 'Vikram Singh',
      status: 'On Route',
      location: { lat: 12.9716, lng: 77.5946 }, // Bangalore
      speed: '55 km/h',
      fuel: '62%',
      lastUpdate: 'Live',
      destination: 'Chennai Port',
      eta: '8:45 PM'
    }
  ]);

  // Initialize Map
  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: true
      }).setView([20.5937, 78.9629], 5);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      }).addTo(mapInstance.current);

      L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.current);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  // Handle Vehicle Selection / Pan
  useEffect(() => {
    if (selectedVehicle && mapInstance.current) {
      mapInstance.current.panTo([selectedVehicle.location.lat, selectedVehicle.location.lng]);
    }
  }, [selectedVehicle]);

  // Sync Zoom
  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.setZoom(mapZoom);
    }
  }, [mapZoom]);

  const connectionPolylineRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  // ... (Map Initialization)

  // Draw Connection between first two vehicles
  useEffect(() => {
    if (!mapInstance.current || activeVehicles.length < 2) return;

    const v1 = activeVehicles[0];
    const v2 = activeVehicles[1];

    if (activeVehicles[0].location && activeVehicles[1].location) {
      const latlngs = [
        [v1.location.lat, v1.location.lng],
        [v2.location.lat, v2.location.lng]
      ];

      if (connectionPolylineRef.current) {
        connectionPolylineRef.current.setLatLngs(latlngs);
      } else {
        connectionPolylineRef.current = L.polyline(latlngs, {
          color: '#3b82f6',
          weight: 3,
          opacity: 0.6,
          dashArray: '10, 10'
        }).addTo(mapInstance.current);
      }
    }
  }, [activeVehicles]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        mapInstance.current.flyTo([lat, lon], 12);
        addNotification({ type: 'success', title: 'Location Found', message: `Moved to ${data[0].display_name.split(',')[0]}` });
        setSearchQuery('');
      } else {
        addNotification({ type: 'error', title: 'Not Found', message: 'Location not found' });
      }
    } catch (error) {
      console.error('Search error:', error);
      addNotification({ type: 'error', title: 'Error', message: 'Search failed' });
    }
  };

  // Update Markers
  useEffect(() => {
    if (!mapInstance.current) return;

    activeVehicles.forEach(vehicle => {
      // ... (existing marker logic remains same)
      const { id, location, status, type } = vehicle;

      if (markersRef.current[id]) {
        markersRef.current[id].setLatLng([location.lat, location.lng]);
      } else {
        const iconHtml = renderToString(
          <div className="relative">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-gray-200 text-primary shadow-lg hover:scale-110 transition-transform" style={{ transform: 'translate(-50%, -50%)' }}>
              <Icon name={type === 'Heavy Truck' ? 'Truck' : 'Bus'} size={20} color="#2563eb" />
            </div>
            <div className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-white ${status === 'On Route' ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ transform: 'translate(0, -100%)' }} />
          </div>
        );

        const customIcon = L.divIcon({
          html: iconHtml,
          className: 'custom-div-icon',
          iconSize: [0, 0],
          iconAnchor: [0, 0]
        });

        const marker = L.marker([location.lat, location.lng], { icon: customIcon })
          .addTo(mapInstance.current)
          .bindTooltip(id, { permanent: false, direction: 'top', offset: [0, -20], className: 'bg-white text-black px-2 py-1 rounded shadow text-xs font-bold' })
          .on('click', () => handleVehicleSelect(vehicle));

        markersRef.current[id] = marker;
      }
    });
  }, [activeVehicles]);

  // Socket Integration
  useEffect(() => {
    socket.on('gps:update', (data) => {
      setActiveVehicles(prev => {
        const index = prev.findIndex(v => v.id === data.driverId || v.id === data.vehicleId);

        if (index !== -1) {
          // Update existing
          const newVehicles = [...prev];
          newVehicles[index] = {
            ...newVehicles[index],
            location: { lat: data.lat, lng: data.lng },
            speed: `${Math.round(data.speed)} km/h`,
            heading: data.heading,
            lastUpdate: 'Just now'
          };
          return newVehicles;
        } else {
          // Add new vehicle dynamically
          return [...prev, {
            id: data.vehicleId || data.driverId,
            type: data.vehicleType || 'Heavy Truck',
            driver: data.driverName || 'Unknown Driver',
            status: 'On Route',
            location: { lat: data.lat, lng: data.lng },
            speed: `${Math.round(data.speed)} km/h`,
            fuel: `${Math.floor(Math.random() * 30) + 50}%`, // Mock fuel for new ones
            lastUpdate: 'Just now',
            destination: data.destination || 'Roaming',
            eta: 'Calculating...'
          }];
        }
      });
    });

    return () => {
      socket.off('gps:update');
    };
  }, []);

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    addNotification({
      type: 'info',
      title: 'Vehicle Selected',
      message: `Tracking ${vehicle?.id}`
    });
  };

  const addNotification = (notif) => {
    setNotifications(prev => [...prev, { id: Date.now(), ...notif, duration: 3000 }]);
  };

  return (
    <>
      <Helmet>
        <title>Live Tracking - NexLogica</title>
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <RoleBasedNavigation userRole="manager" connectionStatus="connected" />
        <div className="flex-1 flex flex-col md:flex-row pt-16 h-[calc(100vh-64px)] overflow-hidden">
          <div className="w-full md:w-80 lg:w-96 border-r border-border bg-surface overflow-y-auto hidden md:block">
            <FleetSummaryPanel
              vehicles={activeVehicles}
              onSelectVehicle={handleVehicleSelect}
              selectedVehicleId={selectedVehicle?.id}
            />
          </div>
          <div className="relative flex-1">
            <div ref={mapRef} className="absolute inset-0 z-0 bg-[#0f1115]" />

            {/* Search Bar */}
            <div className="absolute top-6 left-6 z-[1000] w-full max-w-sm hidden md:block">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search location (e.g., Delhi)..."
                  className="w-full pl-10 pr-4 py-3 bg-white text-gray-900 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon name="Search" size={18} />
                </div>
              </form>
            </div>

            <div className="absolute top-6 right-6 z-[1000]">
              <MapControls
                zoom={mapZoom}
                onZoomChange={setMapZoom}
                showGeofences={showGeofences}
                onToggleGeofences={() => setShowGeofences(!showGeofences)}
              />
            </div>

            {selectedVehicle && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-[1000]">
                <VehicleDetailsPanel
                  vehicle={selectedVehicle}
                  onClose={() => setSelectedVehicle(null)}
                />
              </div>
            )}
          </div>
        </div>
        <QuickActionButton userRole="manager" onAction={(a) => addNotification({ type: 'success', title: 'Action', message: a })} />
        <ToastNotification
          notifications={notifications}
          onDismiss={(id) => setNotifications(prev => prev?.filter(n => n?.id !== id))}
        />
      </div>
    </>
  );
};

export default LiveTrackingMap;
