import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DelayProbabilityMeter = () => {
  const [selectedShipment, setSelectedShipment] = useState(0);

  const shipments = [
    {
      id: "SHP-2025-001",
      route: "Mumbai → Delhi",
      delayProbability: 23,
      riskLevel: "low",
      factors: [
        { name: "Weather Conditions", impact: 8, status: "favorable" },
        { name: "Traffic Patterns", impact: 12, status: "moderate" },
        { name: "Historical Data", impact: 3, status: "favorable" }
      ],
      eta: "28 Dec 2025, 14:30",
      confidence: 94
    },
    {
      id: "SHP-2025-002",
      route: "Bangalore → Chennai",
      delayProbability: 67,
      riskLevel: "high",
      factors: [
        { name: "Weather Conditions", impact: 35, status: "adverse" },
        { name: "Traffic Patterns", impact: 22, status: "congested" },
        { name: "Historical Data", impact: 10, status: "moderate" }
      ],
      eta: "28 Dec 2025, 18:45",
      confidence: 89
    },
    {
      id: "SHP-2025-003",
      route: "Kolkata → Hyderabad",
      delayProbability: 45,
      riskLevel: "medium",
      factors: [
        { name: "Weather Conditions", impact: 15, status: "moderate" },
        { name: "Traffic Patterns", impact: 20, status: "moderate" },
        { name: "Historical Data", impact: 10, status: "moderate" }
      ],
      eta: "29 Dec 2025, 09:15",
      confidence: 91
    }
  ];

  const currentShipment = shipments?.[selectedShipment];

  const getRiskColor = (level) => {
    switch(level) {
      case 'low': return 'var(--color-success)';
      case 'medium': return 'var(--color-warning)';
      case 'high': return 'var(--color-error)';
      default: return 'var(--color-muted)';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'favorable': return 'text-success bg-success/10 border-success/20';
      case 'moderate': return 'text-warning bg-warning/10 border-warning/20';
      case 'adverse': return 'text-error bg-error/10 border-error/20';
      case 'congested': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-transparent';
    }
  };

  const getProgressBarColor = (status) => {
     switch(status) {
      case 'favorable': return 'bg-success';
      case 'moderate': return 'bg-warning';
      case 'adverse': return 'bg-error';
      case 'congested': return 'bg-error';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <div className="card h-full flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-2">Risk Factors Analysis</h2>
          <p className="text-sm text-muted-foreground">Real-time risk assessment powered by ML algorithms</p>
        </div>
        
        {/* Shipment Selector */}
        <div className="flex flex-wrap gap-2">
          {shipments?.map((shipment, index) => (
             <button
              key={index}
              onClick={() => setSelectedShipment(index)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                selectedShipment === index
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-surface text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
              }`}
            >
              Shipment {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div key={currentShipment?.id} className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full animate-in fade-in slide-in-from-bottom-2 duration-500">
        
        {/* Left Column: Gauge + Metadata (5 cols) */}
        <div className="lg:col-span-5 flex flex-col border-b lg:border-b-0 lg:border-r border-border/50 pb-4 lg:pb-0 lg:pr-4">
            
            {/* Risk Gauge - Compact */}
            <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="var(--color-muted)" strokeWidth="6" className="opacity-20" />
                        <circle 
                            cx="50" cy="50" r="45" fill="none" 
                            stroke={getRiskColor(currentShipment?.riskLevel)} 
                            strokeWidth="6" 
                            strokeDasharray={`${currentShipment?.delayProbability * 2.83} 283`}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                            style={{ filter: `drop-shadow(0 0 4px ${getRiskColor(currentShipment?.riskLevel)})` }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold tracking-tight" style={{ color: getRiskColor(currentShipment?.riskLevel) }}>
                            {currentShipment?.delayProbability}%
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest mt-1 px-2 py-0.5 rounded-full bg-surface border border-border text-muted-foreground">
                            {currentShipment?.riskLevel} Risk
                        </span>
                    </div>
                </div>
            </div>

            {/* Metadata Divider */}
            <div className="w-full h-px bg-border/50 my-2" />

            {/* Shipment Metadata - Compact & Aligned */}
            <div className="w-full space-y-2 px-1">
                <div className="flex items-center justify-between gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                        <Icon name="Package" size={14} className="opacity-70" />
                        <span className="font-medium">Shipment ID</span>
                    </div>
                    <span className="font-mono font-bold truncate">{currentShipment?.id}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                        <Icon name="Route" size={14} className="opacity-70" />
                        <span className="font-medium">Route</span>
                    </div>
                    <span className="font-bold truncate text-right">{currentShipment?.route}</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-sm">
                     <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                        <Icon name="Clock" size={14} className="opacity-70" />
                        <span className="font-medium">ETA</span>
                    </div>
                    <span className="font-bold text-primary truncate min-w-0">{currentShipment?.eta}</span>
                </div>
                 <div className="flex items-center justify-between gap-2 text-sm">
                     <div className="flex items-center gap-2 text-muted-foreground shrink-0">
                        <Icon name="Target" size={14} className="opacity-70" />
                        <span className="font-medium">AI Confidence</span>
                    </div>
                    <span className="font-bold text-success">{currentShipment?.confidence}%</span>
                </div>
            </div>
        </div>

        {/* Right Column: Factors + Recommendation (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-3 h-full">
            
            {/* Risk Factor Cards - Compact */}
            <div className="flex flex-col gap-2">
                {currentShipment?.factors?.map((factor, index) => (
                    <div key={index} className="bg-muted/30 border border-border/50 rounded-lg p-2.5 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="font-semibold text-xs truncate pr-2">{factor.name}</span>
                            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border shrink-0 ${getStatusColor(factor.status)}`}>
                                {factor.status}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-surface rounded-full overflow-hidden border border-border/30">
                                <div 
                                    className={`h-full rounded-full transition-all duration-1000 ${getProgressBarColor(factor.status)}`} 
                                    style={{ width: `${factor.impact}%` }}
                                />
                            </div>
                            <span className="text-[10px] font-bold w-6 text-right tabular-nums">{factor.impact}%</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* AI Recommendation Panel - Compact */}
            <div className="mt-auto bg-gradient-to-br from-primary/5 to-purple-500/5 border border-primary/20 rounded-xl p-3 relative overflow-hidden group">
                <div className="flex gap-3 relative z-10 items-start">
                    <div className="w-8 h-8 rounded-lg bg-surface border border-primary/20 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                        <Icon name="Lightbulb" size={16} className="text-primary animate-pulse" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-primary mb-0.5">AI Recommendation</h4>
                        <p className="text-xs text-foreground/90 leading-relaxed font-medium">
                           {currentShipment?.riskLevel === 'high' 
                            ? "Reroute immediately via NH-48 to avoid severe weather delays. Est savings: 2.5h."
                            : currentShipment?.riskLevel === 'medium'
                            ? "Traffic density increasing. Monitor closely; minor adjustment recommended."
                            : "Conditions optimal. Continue on current route. No actions required."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DelayProbabilityMeter;