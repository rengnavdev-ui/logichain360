import React from 'react';
import { Circle, Tooltip } from 'react-leaflet';

const GeofenceZone = () => {
    // Mock geofence zones
    const zones = [
        { id: 1, center: [19.0760, 72.8777], radius: 2000, type: 'Exclusion', color: '#ff4d4d' },
        { id: 2, center: [28.6139, 77.2090], radius: 3000, type: 'Delivery', color: '#3b82f6' }
    ];

    return (
        <>
            {zones?.map(zone => (
                <Circle
                    key={zone.id}
                    center={zone.center}
                    radius={zone.radius}
                    pathOptions={{
                        color: zone.color,
                        fillColor: zone.color,
                        fillOpacity: 0.1,
                        dashArray: '5, 10'
                    }}
                >
                    <Tooltip direction="top" opacity={0.8}>
                        <span className="font-bold">{zone.type} Zone</span>
                    </Tooltip>
                </Circle>
            ))}
        </>
    );
};

export default GeofenceZone;