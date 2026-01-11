import React from 'react';
import { Polyline } from 'react-leaflet';

const RoutePolyline = ({ vehicle }) => {
    // In a real app, this would be the history of locations
    // For now, we'll mock a small path behind the vehicle
    if (!vehicle || vehicle?.status !== 'On Route') return null;

    const mockedHistory = [
        [vehicle.location.lat - 0.01, vehicle.location.lng - 0.01],
        [vehicle.location.lat - 0.005, vehicle.location.lng - 0.002],
        [vehicle.location.lat, vehicle.location.lng]
    ];

    return (
        <Polyline
            positions={mockedHistory}
            pathOptions={{
                color: 'var(--color-primary)',
                weight: 4,
                opacity: 0.6,
                dashArray: '10, 10'
            }}
        />
    );
};

export default RoutePolyline;
