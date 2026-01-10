import React from 'react';
import Icon from '../../../components/AppIcon';

const VehicleMarker = ({ vehicle, onClick, isSelected }) => {
  return (
    <div 
        className="absolute cursor-pointer transition-all duration-500 ease-in-out z-10"
        style={{
            left: `${vehicle?.location?.lat * 10}%`,
            top: `${vehicle?.location?.lng * 5}%`,
            transform: 'translate(-50%, -50%)'
        }}
        onClick={onClick}
    >
        <div className={`relative group`}>
            {/* Pulsing background for active vehicles */}
            {vehicle?.status === 'On Route' && (
                <div className="absolute inset-0 w-full h-full rounded-full bg-primary/20 animate-ping" />
            )}
            
            {/* Marker Body */}
            <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                ${isSelected 
                    ? 'bg-primary text-primary-foreground shadow-glow-md scale-110' 
                    : 'bg-surface border border-border text-muted-foreground hover:border-primary/50 hover:scale-105'}
            `}>
                <Icon name={vehicle?.type === 'Heavy Truck' ? 'Truck' : 'Bus'} size={20} />
            </div>

            {/* Label */}
            <div className={`
                absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-surface/90 border border-border shadow-sm
                text-[10px] font-bold whitespace-nowrap transition-opacity duration-200
                ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
            `}>
                {vehicle?.id}
            </div>
            
            {/* Status Dot */}
            <div className={`
                absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface
                ${vehicle?.status === 'On Route' ? 'bg-success' : 'bg-warning'}
            `} />
        </div>
    </div>
  );
};

export default VehicleMarker;
