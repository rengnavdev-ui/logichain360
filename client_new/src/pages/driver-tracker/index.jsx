import React, { useState, useEffect, useRef } from 'react';
import { socket } from '../../utils/socket';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';

const DriverTracker = () => {
    const [isTracking, setIsTracking] = useState(false);
    const [status, setStatus] = useState('Idle');
    const [location, setLocation] = useState(null);
    const watchId = useRef(null);
    const [vehicleId, setVehicleId] = useState('REAL-GPS-01');

    useEffect(() => {
        return () => stopTracking();
    }, []);

    const startTracking = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation not supported');
            return;
        }

        setIsTracking(true);
        setStatus('Initializing GPS...');

        watchId.current = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude, speed, heading, accuracy } = position.coords;

                setLocation({ lat: latitude, lng: longitude });
                setStatus('Tracking Active');

                // Stream to server
                socket.emit('gps:stream', {
                    vehicleId: vehicleId,
                    driverId: vehicleId,
                    vehicleType: 'Real Smartphone',
                    driverName: 'You (Mobile)',
                    lat: latitude,
                    lng: longitude,
                    speed: speed ? (speed * 3.6).toFixed(1) : 0, // m/s to km/h
                    heading: heading || 0,
                    accuracy: accuracy,
                    timestamp: Date.now()
                });
            },
            (error) => {
                console.error(error);
                setStatus(`Error: ${error.message}`);
                setIsTracking(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    };

    const stopTracking = () => {
        if (watchId.current) {
            navigator.geolocation.clearWatch(watchId.current);
            watchId.current = null;
        }
        setIsTracking(false);
        setStatus('Tracking Stopped');
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <Helmet><title>Driver Tracker - NexLogica</title></Helmet>

            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <Icon name="MapPin" size={40} color="white" />
                    </div>
                    <h1 className="text-3xl font-bold">Driver Tracker</h1>
                    <p className="text-gray-400">Turn your phone into a GPS tracker</p>
                </div>

                <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 space-y-6">
                    <div>
                        <label className="block text-sm text-gray-500 mb-2">Device ID</label>
                        <input
                            type="text"
                            value={vehicleId}
                            onChange={(e) => setVehicleId(e.target.value)}
                            className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex items-center justify-between bg-black p-4 rounded-xl">
                        <span className="text-gray-400">Status</span>
                        <span className={`font-bold ${isTracking ? 'text-green-500' : 'text-yellow-500'}`}>
                            {status}
                        </span>
                    </div>

                    {location && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black p-3 rounded-lg text-center">
                                <div className="text-xs text-gray-500">Latitude</div>
                                <div className="font-mono text-sm">{location.lat.toFixed(6)}</div>
                            </div>
                            <div className="bg-black p-3 rounded-lg text-center">
                                <div className="text-xs text-gray-500">Longitude</div>
                                <div className="font-mono text-sm">{location.lng.toFixed(6)}</div>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={isTracking ? stopTracking : startTracking}
                        className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isTracking
                                ? 'bg-red-600 hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                                : 'bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                            }`}
                    >
                        {isTracking ? 'STOP TRACKING' : 'START TRACKING'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DriverTracker;
