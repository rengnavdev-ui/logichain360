import React from 'react';

const RoutePolyline = ({ vehicle }) => {
    // Mock route data relative to vehicle location
    if (!vehicle || vehicle?.status !== 'On Route') return null;

    return (
        <svg className="absolute inset-0 pointer-events-none w-full h-full opacity-60">
            <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
                    <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="1" />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.5" />
                </linearGradient>
            </defs>
            <path
                d={`M ${vehicle?.location?.lat * 12} ${vehicle?.location?.lng * 8} L ${vehicle?.location?.lat * 12 + 100} ${vehicle?.location?.lng * 8 - 50} L ${vehicle?.location?.lat * 12 + 200} ${vehicle?.location?.lng * 8 + 20}`}
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 12"
                className="animate-route-flow"
            />
        </svg>
    );
};

export default RoutePolyline;
