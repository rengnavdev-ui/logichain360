import React from 'react';

const GeofenceZone = () => {
    // Mock geofence zones
    const zones = [
        { id: 1, center: { lat: 19.0760, lng: 72.8777 }, radius: '5km', type: 'Exclusion' },
        { id: 2, center: { lat: 28.6139, lng: 77.2090 }, radius: '3km', type: 'Delivery' }
    ];

    return (
        <div className="absolute inset-0 pointer-events-none">
            {zones?.map(zone => (
                <div 
                    key={zone?.id}
                    className={`absolute rounded-full border-2 border-dashed ${
                        zone?.type === 'Exclusion' ? 'bg-error/10 border-error/30' : 'bg-primary/10 border-primary/30'
                    }`}
                    style={{
                        width: '300px',
                        height: '300px',
                        left: zone?.center?.lat * 10 + '%',
                        top: zone?.center?.lng * 5 + '%',
                        transform: 'translate(-50%, -50%)',
                        backdropFilter: 'blur(2px)'
                    }}
                >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-surface/80 border border-border text-[10px] whitespace-nowrap">
                        {zone?.type} Zone
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GeofenceZone;