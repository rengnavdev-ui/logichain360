import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';
import Icon from '../../../components/AppIcon';

const VehicleMarker = ({ vehicle, onClick, isSelected }) => {
    const createCustomIcon = () => {
        const iconHtml = renderToString(
            <div className={`relative group`}>
                {/* Pulsing background for active vehicles */}
                {vehicle?.status === 'On Route' && (
                    <div className="absolute inset-x-0 -inset-y-0 w-10 h-10 rounded-xl bg-primary/20 animate-ping -translate-x-1/2 -translate-y-1/2" />
                )}

                {/* Marker Body */}
                <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 -translate-x-1/2 -translate-y-1/2
            ${isSelected
                        ? 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.5)] scale-110'
                        : 'bg-[#1a1c23] border border-white/10 text-gray-400 hover:border-primary/50 hover:scale-105'}
        `}>
                    <Icon name={vehicle?.type === 'Heavy Truck' ? 'Truck' : 'Bus'} size={20} />
                </div>

                {/* Status Dot */}
                <div className={`
            absolute top-3 right-3 w-3 h-3 rounded-full border-2 border-[#1a1c23] translate-x-1/2 -translate-y-1/2
            ${vehicle?.status === 'On Route' ? 'bg-green-500' : 'bg-yellow-500'}
        `} />
            </div>
        );

        return L.divIcon({
            html: iconHtml,
            className: 'custom-vehicle-icon',
            iconSize: [0, 0], // Handled by CSS/Inner DIV
            iconAnchor: [0, 0],
        });
    };

    return (
        <Marker
            position={[vehicle.location.lat, vehicle.location.lng]}
            icon={createCustomIcon()}
            eventHandlers={{ click: onClick }}
        >
            <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent={isSelected}>
                <div className="bg-surface border border-border px-2 py-1 rounded text-[10px] font-bold">
                    {vehicle.id}
                </div>
            </Tooltip>
        </Marker>
    );
};

export default VehicleMarker;
