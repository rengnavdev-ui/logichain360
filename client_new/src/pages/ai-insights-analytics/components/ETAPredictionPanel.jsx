import React, { useState, useMemo } from 'react';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ETAPredictionPanel = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(0);
  const [showConfidence, setShowConfidence] = useState(false);
  const [activeScenario, setActiveScenario] = useState('NORMAL'); // 'NORMAL', 'TRAFFIC', 'RAIN', 'DRIVER'
  const [expandedFactor, setExpandedFactor] = useState(null);
  
  // Simulated State for "Actions" taken on factors
  const [actionsTaken, setActionsTaken] = useState([]);

  // Mock Scenario Data Multipliers
  const SCENARIO_IMPACT = {
    NORMAL: { factor: 1, label: 'Normal Conditions' },
    TRAFFIC: { factor: 1.4, label: 'Heavy Traffic (+30m)', color: 'var(--color-warning)' },
    RAIN: { factor: 1.25, label: 'Heavy Rain (+15m)', color: 'var(--color-primary)' },
    DRIVER: { factor: 1.1, label: 'Driver Fatigue (+10m)', color: 'var(--color-secondary)' },
    OPTIMIZED: { factor: 0.85, label: 'Optimized Route (-15m)', color: 'var(--color-success)' } 
  };

  const vehicles = [
    {
      id: "MH-02-AB-1234",
      route: "Mumbai → Pune",
      currentLocation: "Lonavala",
      predictedETA: "28 Dec 2025, 16:45",
      originalETA: "28 Dec 2025, 17:30",
      confidence: 96,
      status: "on-time",
      timelinessScore: 94,
      baseData: [
        { time: "14:00", predicted: 120, actual: 118, confidence: 92 },
        { time: "14:30", predicted: 105, actual: 107, confidence: 93 },
        { time: "15:00", predicted: 90, actual: 89, confidence: 94 },
        { time: "15:30", predicted: 75, actual: 76, confidence: 95 },
        { time: "16:00", predicted: 60, actual: null, confidence: 96 },
        { time: "16:30", predicted: 45, actual: null, confidence: 96 },
        { time: "17:00", predicted: 30, actual: null, confidence: 95 },
        { time: "17:30", predicted: 15, actual: null, confidence: 94 },
        { time: "18:00", predicted: 0, actual: null, confidence: 93 }
      ],
      factors: {
        traffic: { score: 85, impact: 'Low', details: 'Congestion clearing near Pune exit.', action: 'Switch Route', actionId: 'OPTIMIZED' },
        weather: { score: 92, impact: 'None', details: 'Clear skies forecast for remaining duration.', action: 'Safety Stop', actionId: 'RAIN' }, // Simulating adding delay for safety
        driver: { score: 88, impact: 'Low', details: 'Driver in green zone. Next break in 2 hrs.', action: 'Swap Driver', actionId: 'DRIVER' },
        vehicle: { score: 95, impact: 'None', details: 'All sensors returning nominal values.', action: 'Diagnostics', actionId: 'NORMAL' }
      }
    },
    {
      id: "KA-01-CD-5678",
      route: "Bangalore → Chennai",
      currentLocation: "Hosur",
      predictedETA: "28 Dec 2025, 22:15",
      originalETA: "28 Dec 2025, 20:30",
      confidence: 89,
      status: "delayed",
      timelinessScore: 67,
      baseData: [
        { time: "18:00", predicted: 180, actual: 175, confidence: 88 },
        { time: "18:30", predicted: 165, actual: 168, confidence: 87 },
        { time: "19:00", predicted: 150, actual: 155, confidence: 88 },
        { time: "19:30", predicted: 135, actual: 142, confidence: 89 },
        { time: "20:00", predicted: 120, actual: null, confidence: 89 },
        { time: "20:30", predicted: 105, actual: null, confidence: 88 },
        { time: "21:00", predicted: 90, actual: null, confidence: 87 },
        { time: "21:30", predicted: 75, actual: null, confidence: 86 },
        { time: "22:00", predicted: 60, actual: null, confidence: 85 }
      ],
      factors: {
        traffic: { score: 62, impact: 'High', details: 'Severe congestion on NH48.', action: 'Switch Route', actionId: 'OPTIMIZED' },
        weather: { score: 58, impact: 'Medium', details: 'Heavy rain reported in Kanchipuram.', action: 'Delay Dispatch', actionId: 'RAIN' },
        driver: { score: 85, impact: 'Low', details: 'Driver performance stable.', action: 'Suggest Break', actionId: 'DRIVER' },
        vehicle: { score: 90, impact: 'None', details: 'Vehicle health optimal.', action: 'Maintenance', actionId: 'NORMAL' }
      }
    },
    // ... Keeping third vehicle as simple mock for brevity but structure remains ... 
    {
       id: "DL-03-EF-9012",
       route: "Delhi → Jaipur",
       currentLocation: "Gurgaon",
       predictedETA: "29 Dec 2025, 08:30",
       originalETA: "29 Dec 2025, 09:00",
       confidence: 93,
       status: "early",
       timelinessScore: 102,
       baseData: [
         { time: "06:00", predicted: 150, actual: 148, confidence: 91 },
         { time: "06:30", predicted: 135, actual: 132, confidence: 92 },
         { time: "07:00", predicted: 120, actual: 118, confidence: 93 },
         { time: "07:30", predicted: 105, actual: 102, confidence: 93 },
         { time: "08:00", predicted: 90, actual: null, confidence: 93 },
         { time: "08:30", predicted: 75, actual: null, confidence: 92 },
         { time: "09:00", predicted: 60, actual: null, confidence: 91 },
         { time: "09:30", predicted: 45, actual: null, confidence: 90 },
         { time: "10:00", predicted: 30, actual: null, confidence: 89 }
       ],
       factors: {
         traffic: { score: 88, impact: 'Low', details: 'Traffic flowing smoothly.', action: 'Check Alt.', actionId: 'OPTIMIZED' },
         weather: { score: 95, impact: 'None', details: 'Clear visibility.', action: 'Monitor', actionId: 'RAIN' },
         driver: { score: 92, impact: 'Low', details: 'Driver fully rested.', action: 'Log', actionId: 'DRIVER' },
         vehicle: { score: 93, impact: 'None', details: 'Optimal performance.', action: 'Check', actionId: 'NORMAL' }
       }
    }
  ];

  const currentVehicle = vehicles?.[selectedVehicle];

  // Dynamic Data Calculation based on Scenarios & Actions
  const chartData = useMemo(() => {
     if (!currentVehicle) return [];

     let multiplier = SCENARIO_IMPACT[activeScenario].factor;
     
     // Correct multiplier logic: less time remaining = improved (0.85), more time = delay (1.2)
     // BUT: 'predicted' is minutes TO destination. So higher multiplier = more minutes = delay.
     
     return currentVehicle.baseData.map(point => {
        if (point.actual !== null) {
            // Historical data stays same
            return point; 
        } else {
            // Future prediction
            const originalPredicted = point.predicted;
            const adjustedPredicted = Math.round(originalPredicted * multiplier);
            
            // Confidence Interval Calculation
            // Base uncertainty +/- 15 mins, scaled by how far in future/prediction size
            const uncertainty = Math.max(10, Math.round(adjustedPredicted * 0.2)); 

            return {
                ...point,
                predicted: adjustedPredicted,
                // Range for Area Chart
                range: [
                    Math.max(0, adjustedPredicted - uncertainty), 
                    adjustedPredicted + uncertainty
                ],
                // For custom tooltip
                scenarioDelta: adjustedPredicted - originalPredicted
            };
        }
     });
  }, [currentVehicle, activeScenario]);


  const getStatusColor = (status) => {
    switch(status) {
      case 'on-time': return 'var(--color-success)';
      case 'delayed': return 'var(--color-error)';
      case 'early': return 'var(--color-primary)';
      default: return 'var(--color-muted)';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'on-time': return 'On Time';
      case 'delayed': return 'Delayed';
      case 'early': return 'Early';
      default: return 'Unknown';
    }
  };

  const handleActionClick = (factorKey, actionId) => {
      // Simulate taking an action
      setActiveScenario(actionId);
      setActionsTaken(prev => [...prev, { 
          factor: factorKey, 
          action: currentVehicle.factors[factorKey].action, 
          time: new Date().toLocaleTimeString() 
      }]);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-xl p-4 shadow-lg z-50 animate-in fade-in zoom-in-95 duration-200">
          <p className="text-sm font-semibold mb-2">{data.time}</p>
          <div className="space-y-1">
            <p className="text-xs text-primary font-medium">Predicted: {data.predicted} min</p>
            {data.actual && (
              <p className="text-xs text-secondary">Actual: {data.actual} min</p>
            )}
            {!data.actual && showConfidence && (
                <p className="text-xs text-muted-foreground">Range: {data.range[0]} - {data.range[1]} min</p>
            )}
             {!data.actual && data.scenarioDelta !== 0 && (
                <p className={`text-xs ${data.scenarioDelta > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {data.scenarioDelta > 0 ? `+${data.scenarioDelta}m Delay` : `${data.scenarioDelta}m Improved`}
                </p>
            )}
            <div className="h-px bg-border my-2"/>
            <p className="text-xs text-muted-foreground italic">
                ML Confidence: {data.confidence}% <br/>
                <span className="opacity-70 text-[10px]">Based on {Math.floor(Math.random() * 500) + 500} similar trips</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">ETA Prediction Analytics</h2>
          <p className="text-sm md:text-base text-muted-foreground">Machine learning-powered arrival time forecasting</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {vehicles.map((vehicle, index) => (
            <button
              key={index}
              onClick={() => { setSelectedVehicle(index); setActiveScenario('NORMAL'); setActionsTaken([]); }}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-200 border ${
                selectedVehicle === index
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-surface text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
              }`}
            >
              <span className="hidden sm:inline mr-1">Vehicle</span>
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div key={currentVehicle?.id} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Same Info Cards as before, preserving layout */}
            <div className="bg-muted rounded-2xl p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center"><Icon name="Truck" size={24} color="var(--color-primary)" /></div>
                    <div><p className="text-xs md:text-sm text-muted-foreground">Vehicle ID</p><p className="text-base md:text-lg font-semibold">{currentVehicle?.id}</p></div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs md:text-sm"><Icon name="Route" size={16} color="var(--color-muted-foreground)" /><span className="text-muted-foreground">{currentVehicle?.route}</span></div>
                    <div className="flex items-center gap-2 text-xs md:text-sm"><Icon name="MapPin" size={16} color="var(--color-accent)" /><span className="text-muted-foreground">Current: {currentVehicle?.currentLocation}</span></div>
                </div>
            </div>

            <div className="bg-muted rounded-2xl p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${getStatusColor(currentVehicle?.status)}20` }}>
                         <Icon name="Clock" size={24} color={getStatusColor(currentVehicle?.status)} />
                    </div>
                    <div><p className="text-xs md:text-sm text-muted-foreground">Predicted ETA</p><p className="text-base md:text-lg font-semibold">{currentVehicle?.predictedETA}</p></div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm text-muted-foreground">Original: {currentVehicle?.originalETA}</span>
                    <span className="px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-wider" style={{ backgroundColor: `${getStatusColor(currentVehicle?.status)}20`, color: getStatusColor(currentVehicle?.status) }}>{getStatusLabel(currentVehicle?.status)}</span>
                </div>
            </div>

            <div className="bg-muted rounded-2xl p-4 md:p-6 relative overflow-hidden group">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-success/10 flex items-center justify-center"><Icon name="Target" size={24} color="var(--color-success)" /></div>
                    <div><p className="text-xs md:text-sm text-muted-foreground">ML Confidence</p><p className="text-base md:text-lg font-semibold">{currentVehicle?.confidence}%</p></div>
                </div>
                <div className="relative w-full h-2 bg-surface rounded-full overflow-hidden mb-2">
                    <div className="absolute top-0 left-0 h-full bg-success rounded-full transition-all duration-1000" style={{ width: `${currentVehicle?.confidence}%` }} />
                </div>
                
                {/* AI Trust Tooltip Overlay (Hover Only) */}
                <div className="absolute inset-x-0 bottom-0 bg-background/90 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-border">
                     <p className="text-xs font-medium text-foreground mb-1">Why this score?</p>
                     <p className="text-[10px] text-muted-foreground">Based on 1.2k historical trips on this route with similar weather patterns. High confidence due to consistent driver behavior.</p>
                </div>
            </div>
        </div>

        {/* Toolbar for Advanced Graph Features */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4 bg-muted/30 p-4 rounded-xl border border-border/50">
            <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                    <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 ${showConfidence ? 'bg-primary' : 'bg-input'}`} onClick={() => setShowConfidence(!showConfidence)}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${showConfidence ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                    <span className="text-sm font-medium">Show Confidence Range</span>
                </label>
            </div>
            
            <div className="flex flex-wrap gap-2">
                <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground py-1.5">Simulate:</span>
                {['NORMAL', 'TRAFFIC', 'RAIN'].map(scenario => (
                    <button 
                        key={scenario}
                        onClick={() => setActiveScenario(scenario)}
                        className={`px-3 py-1 text-xs rounded-lg font-medium border transition-all ${
                            activeScenario === scenario 
                            ? 'bg-foreground text-background border-foreground' 
                            : 'bg-surface hover:bg-muted border-border'
                        }`}
                    >
                        {scenario}
                    </button>
                ))}
            </div>
        </div>

        {/* Main Chart Section */}
        <div className="w-full h-64 md:h-80 lg:h-96 mb-6 md:mb-8 relative" aria-label="ETA Prediction Timeline Chart">
             {/* Graph Overlay for "Active Scenario" Indicator */}
             {activeScenario !== 'NORMAL' && (
                 <div className="absolute top-4 right-16 z-10 bg-background/80 backdrop-blur px-3 py-1 rounded-lg border border-border shadow-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                     <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: SCENARIO_IMPACT[activeScenario].color }}></span>
                     <span className="text-xs font-bold">{SCENARIO_IMPACT[activeScenario].label} Active</span>
                 </div>
             )}

            <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
                <defs>
                    <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.05}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="time" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
                <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} label={{ value: 'Minutes to Dest.', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: 'var(--color-muted-foreground)' } }} />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Event Markers & SLA Lines */}
                <ReferenceLine y={0} stroke="var(--color-success)" strokeDasharray="3 3" label={{ position: 'right', value: 'Arrival', fill: 'var(--color-success)', fontSize: 10 }} />
                <ReferenceLine y={30} stroke="var(--color-warning)" strokeDasharray="5 5" label={{ position: 'insideRight', value: 'SLA Warning', fill: 'var(--color-warning)', fontSize: 10 }} />

                {/* Confidence Band (Area) */}
                {showConfidence && (
                    <Area 
                        type="monotone" 
                        dataKey="range" 
                        stroke="none" 
                        fill="url(#confidenceGradient)" 
                        animationDuration={500}
                    />
                )}

                <Line type="monotone" dataKey="predicted" stroke="var(--color-primary)" strokeWidth={2} dot={{ fill: 'var(--color-primary)', r: 4 }} name="Predicted" animationDuration={500} />
                <Line type="monotone" dataKey="actual" stroke="var(--color-secondary)" strokeWidth={2} dot={{ fill: 'var(--color-secondary)', r: 4 }} name="Actual" connectNulls={false} />
            </ComposedChart>
            </ResponsiveContainer>
        </div>

        {/* Contributing Factors & Diagnostics */}
        <div>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base md:text-lg font-semibold">Contributing Factors</h3>
                {actionsTaken.length > 0 && (
                    <span className="text-xs text-green-500 font-medium animate-pulse flex items-center gap-1">
                        <Icon name="CheckCircle" size={12}/> Interventions Applied: {actionsTaken.length}
                    </span>
                )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(currentVehicle?.factors || {}).map(([key, data], index) => {
                const isExpanded = expandedFactor === key;
                return (
                    <motion.div 
                        key={key} 
                        layout
                        className={`bg-muted rounded-xl p-4 cursor-pointer border transition-colors ${isExpanded ? 'border-primary shadow-glow-sm col-span-1 md:col-span-2' : 'border-transparent hover:border-primary/30'}`}
                        onClick={() => setExpandedFactor(isExpanded ? null : key)}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div className={`p-1.5 rounded-lg ${key === 'traffic' ? 'bg-orange-500/20 text-orange-500' : key === 'weather' ? 'bg-blue-500/20 text-blue-500' : 'bg-gray-500/20 text-gray-500'}`}>
                                    <Icon name={key === 'traffic' ? 'TrafficCone' : key === 'weather' ? 'CloudRain' : key === 'driver' ? 'User' : 'Truck'} size={18} />
                                </div>
                                <span className="text-sm md:text-base font-medium capitalize">{key}</span>
                            </div>
                            <span className="text-xs md:text-sm font-semibold">{data.score}%</span>
                        </div>
                        
                        <div className="relative w-full h-2 bg-surface rounded-full overflow-hidden mb-2">
                            <div className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000"
                                style={{
                                width: `${data.score}%`,
                                backgroundColor: data.score >= 80 ? 'var(--color-success)' : data.score >= 60 ? 'var(--color-warning)' : 'var(--color-error)'
                                }}
                            />
                        </div>

                        {/* Interactive Content on Expand */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }} 
                                    animate={{ opacity: 1, height: 'auto' }} 
                                    exit={{ opacity: 0, height: 0 }}
                                    className="pt-3 border-t border-border/50 mt-3 space-y-3"
                                >
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Contribution: <span className="text-foreground">{data.impact}</span></span>
                                        <span>Model Cert: <span className="text-foreground">High</span></span>
                                    </div>
                                    <p className="text-sm text-foreground/90 leading-relaxed bg-surface/50 p-2 rounded-lg border border-border/50">
                                        <span className="font-bold text-xs uppercase tracking-wider text-primary block mb-1">Diagnostic</span>
                                        {data.details}
                                        {activeScenario !== 'NORMAL' && activeScenario !== 'OPTIMIZED' && key.toUpperCase().includes(activeScenario) && (
                                           <span className="block mt-1 text-red-500 font-bold">Currently impacting ETA.</span>
                                        )}
                                    </p>
                                    
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleActionClick(key, data.actionId); }}
                                        className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2"
                                    >
                                        <Icon name="Activity" size={16} /> 
                                        {data.action}
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        {!isExpanded && <p className="text-[10px] text-muted-foreground mt-2 text-right">Click to analyze</p>}
                    </motion.div>
                );
            })}
            </div>
            
            {/* Counterfactual Insight */}
            <div className="mt-4 p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl flex items-start gap-3">
                 <Icon name="Brain" size={18} className="text-blue-400 mt-0.5" />
                 <div>
                     <p className="text-xs font-bold text-blue-400 mb-0.5">AI Suggestion</p>
                     <p className="text-sm text-muted-foreground">
                         Simulations indicate that <span className="text-foreground font-medium">switching to Route B</span> (via Satara) could improve ETA by 18 minutes due to developing congestion on current path.
                     </p>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ETAPredictionPanel;