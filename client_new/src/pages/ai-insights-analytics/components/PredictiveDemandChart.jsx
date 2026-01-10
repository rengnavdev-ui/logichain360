import React, { useState, useMemo } from 'react';
import { ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const PredictiveDemandChart = () => {
  const [timeRange, setTimeRange] = useState('monthly');
  const [scenario, setScenario] = useState('NORMAL'); // 'NORMAL', 'FESTIVAL', 'WEATHER', 'SUPPLY'
  const [showConfidence, setShowConfidence] = useState(true);
  const [expandedRegion, setExpandedRegion] = useState(null);

  // Scenario Configurations
  const SCENARIOS = {
    NORMAL: { label: 'Normal', color: 'var(--color-primary)' },
    FESTIVAL: { label: 'Festival Surge', color: 'var(--color-accent)', description: 'Projected +25% demand during holiday season' },
    WEATHER: { label: 'Weather Disruption', color: 'var(--color-warning)', description: 'Heavy rains impacting East/South logistics' },
    SUPPLY: { label: 'Supply Constraint', color: 'var(--color-error)', description: 'Raw material shortage limiting production' }
  };

  const monthlyData = [
    { month: "Jan", actual: 2400, predicted: 2380, baseConfidence: 95 },
    { month: "Feb", actual: 1398, predicted: 1420, baseConfidence: 92 },
    { month: "Mar", actual: 9800, predicted: 9750, baseConfidence: 94 },
    { month: "Apr", actual: 3908, predicted: 3950, baseConfidence: 91 },
    { month: "May", actual: 4800, predicted: 4820, baseConfidence: 96 },
    { month: "Jun", actual: 3800, predicted: 3780, baseConfidence: 93 },
    { month: "Jul", actual: 4300, predicted: 4350, baseConfidence: 94 },
    { month: "Aug", actual: 5200, predicted: 5180, baseConfidence: 95 },
    { month: "Sep", actual: 4100, predicted: 4150, baseConfidence: 92 },
    { month: "Oct", actual: 6200, predicted: 6180, baseConfidence: 96 },
    { month: "Nov", actual: 5800, predicted: 5850, baseConfidence: 94 },
    { month: "Dec", actual: 7200, predicted: 7250, baseConfidence: 95 }
  ];

  const weeklyData = [
    { week: "W1", actual: 580, predicted: 590, baseConfidence: 94 },
    { week: "W2", actual: 620, predicted: 615, baseConfidence: 93 },
    { week: "W3", actual: 710, predicted: 720, baseConfidence: 95 },
    { week: "W4", actual: 650, predicted: 645, baseConfidence: 92 }
  ];

  // Dynamic Chart Data Calculation
  const chartData = useMemo(() => {
    const base = timeRange === 'monthly' ? monthlyData : weeklyData;
    
    return base.map(item => {
      let modPredicted = item.predicted;
      let modConfidence = item.baseConfidence;
      let note = null;

      // Apply Scenario Logic
      if (scenario === 'FESTIVAL') {
        if (['Mar','Oct','Nov','Dec'].includes(item.month) || item.week === 'W3') {
           modPredicted *= 1.25;
           note = 'Holiday Spike';
        } else {
           modPredicted *= 1.05;
        }
      } else if (scenario === 'WEATHER') {
        if (['Jun','Jul','Aug'].includes(item.month)) {
           modPredicted *= 0.8; // Demand drops/delayed
           modConfidence -= 15; // Higher uncertainty
           note = 'Logistics Halted';
        }
      } else if (scenario === 'SUPPLY') {
        const capacity = 6000;
        if (modPredicted > capacity) {
            modPredicted = capacity;
            note = 'CAPPED (Supply)';
        }
      }

      const lowerBound = modPredicted * (1 - (100 - modConfidence)/100);
      const upperBound = modPredicted * (1 + (100 - modConfidence)/100);

      return {
        ...item,
        predicted: Math.round(modPredicted),
        confidence: modConfidence,
        range: [Math.round(lowerBound), Math.round(upperBound)],
        note
      };
    });
  }, [timeRange, scenario]);

  const regionalData = [
    { region: "North", demand: 4200, growth: 12.5, trend: "up", risk: 'Low', driver: 'Infrastructure Project' },
    { region: "South", demand: 3800, growth: 8.3, trend: "up", risk: 'Medium', driver: 'Port Congestion' },
    { region: "East", demand: 3200, growth: -2.1, trend: "down", risk: 'High', driver: 'Weather Alerts' },
    { region: "West", demand: 4500, growth: 15.7, trend: "up", risk: 'Low', driver: 'Industrial Demand' },
    { region: "Central", demand: 2900, growth: 5.2, trend: "up", risk: 'Low', driver: 'Retail Stocking' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-surface border border-border rounded-xl p-4 shadow-lg z-50">
          <p className="text-sm font-semibold mb-2">{data.month || data.week}</p>
          <div className="space-y-1">
            <p className="text-xs text-primary">Actual: ₹{data.actual?.toLocaleString('en-IN')}</p>
            <p className="text-xs text-secondary">Predicted: ₹{data.predicted?.toLocaleString('en-IN')}</p>
            {showConfidence && (
                 <p className="text-xs text-muted-foreground">Range: ₹{data.range[0].toLocaleString()} - ₹{data.range[1].toLocaleString()}</p>
            )}
             <p className={`text-xs ${data.confidence > 90 ? 'text-green-500' : 'text-yellow-500'}`}>Confidence: {data.confidence}%</p>
             {data.note && (
                 <div className="mt-2 pt-1 border-t border-border text-[10px] text-accent font-bold uppercase">{data.note}</div>
             )}
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
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Predictive Demand Forecasting</h2>
          <div className="flex items-center gap-2">
               <p className="text-sm md:text-base text-muted-foreground">TensorFlow-powered predictions</p>
               <span className="px-2 py-0.5 rounded text-[10px] bg-green-500/10 text-green-500 font-bold border border-green-500/20">94% Accuracy</span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
             {/* Scenario Selector */}
            <div className="flex bg-muted p-1 rounded-xl">
                {Object.keys(SCENARIOS).map(key => (
                    <button
                        key={key}
                        onClick={() => setScenario(key)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                            scenario === key 
                            ? 'bg-surface text-foreground shadow-sm' 
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                        title={SCENARIOS[key].description}
                    >
                        {SCENARIOS[key].label}
                    </button>
                ))}
            </div>

            <div className="flex bg-muted p-1 rounded-xl">
                 <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${timeRange === 'weekly' ? 'bg-primary text-primary-foreground' : 'hover:bg-surface'}`} onClick={() => setTimeRange('weekly')}>Weekly</button>
                 <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${timeRange === 'monthly' ? 'bg-primary text-primary-foreground' : 'hover:bg-surface'}`} onClick={() => setTimeRange('monthly')}>Monthly</button>
            </div>
        </div>
      </div>

       {/* Scenario Description Banner */}
       {scenario !== 'NORMAL' && (
           <div className="mb-4 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg flex items-center gap-3 animate-in slide-in-from-top-2">
               <Icon name="AlertCircle" size={16} className="text-accent" />
               <p className="text-sm text-foreground"><span className="font-bold">Scenario Active:</span> {SCENARIOS[scenario].description}</p>
           </div>
       )}

      <div className="w-full h-64 md:h-80 lg:h-96 mb-8 relative" aria-label="Predictive Demand Forecast Chart">
        <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
             <label className="flex items-center gap-2 text-xs bg-surface/80 p-1.5 rounded-lg border border-border cursor-pointer">
                 <input type="checkbox" checked={showConfidence} onChange={(e) => setShowConfidence(e.target.checked)} className="rounded border-gray-500 text-primary focus:ring-primary" />
                 Show Confidence
             </label>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey={timeRange === 'monthly' ? 'month' : 'week'} 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `₹${(value / 1000)?.toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '14px' }} iconType="circle"/>

            {/* Capacity Threshold */}
             <ReferenceLine y={6000} stroke="var(--color-error)" strokeDasharray="3 3" label={{ position: 'right', value: 'Max Capacity', fill: 'var(--color-error)', fontSize: 10 }} />

            {/* Confidence Band */}
            {showConfidence && (
                <Area 
                    type="monotone" 
                    dataKey="range" 
                    stroke="none" 
                    fill="var(--color-secondary)" 
                    fillOpacity={0.1} 
                />
            )}

            <Area 
              type="monotone" 
              dataKey="actual" 
              stroke="var(--color-primary)" 
              fillOpacity={0.1}
              fill="var(--color-primary)"
              strokeWidth={2}
              name="Actual Demand"
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="var(--color-secondary)" 
              strokeWidth={3}
              dot={false}
              name="AI Prediction"
              animationDuration={500}
            />
          </ComposedChart>
        </ResponsiveContainer>
        
        {/* Event Markers Overlay (Static Pips for demo) */}
        {timeRange === 'monthly' && (
             <div className="absolute bottom-[30px] left-[25%] group cursor-help">
                 <div className="w-2 h-2 rounded-full bg-accent animate-pulse"/>
                 <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 w-32 bg-surface text-[10px] p-1 rounded border border-border shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                     Regional Festival
                 </div>
             </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {regionalData.map((region, index) => {
           const isExpanded = expandedRegion === region.region;
           return (
            <motion.div 
                layout
                key={index} 
                className={`bg-muted rounded-xl p-4 cursor-pointer border transition-colors relative overflow-hidden ${isExpanded ? 'lg:col-span-2 border-primary shadow-glow-sm' : 'border-transparent hover:border-primary/30'}`}
                onClick={() => setExpandedRegion(isExpanded ? null : region.region)}
            >
                <div className="flex items-center justify-between mb-2">
                <span className="text-sm md:text-base font-medium">{region.region}</span>
                <Icon 
                    name={region.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={16} 
                    color={region.trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'}
                />
                </div>
                <p className="text-xl md:text-2xl font-semibold mb-1">₹{region.demand.toLocaleString('en-IN')}</p>
                <p className={`text-xs md:text-sm ${region.trend === 'up' ? 'text-success' : 'text-error'}`}>
                {region.growth > 0 ? '+' : ''}{region.growth}% growth
                </p>

                <AnimatePresence>
                    {isExpanded && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-4 mt-4 border-t border-border/50 space-y-3"
                        >
                             <div className="flex items-center justify-between text-xs">
                                 <span className="text-muted-foreground">Primary Driver:</span>
                                 <span className="font-semibold">{region.driver}</span>
                             </div>
                             <div className="flex items-center justify-between text-xs">
                                 <span className="text-muted-foreground">Risk Level:</span>
                                 <span className={`font-semibold ${region.risk === 'High' ? 'text-red-500' : region.risk === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>{region.risk}</span>
                             </div>
                             
                             <div className="grid grid-cols-2 gap-2 mt-2">
                                 <button className="px-2 py-1.5 bg-primary/10 text-primary rounded text-xs font-medium hover:bg-primary/20 transition-colors">
                                     Shift Budget
                                 </button>
                                 <button className="px-2 py-1.5 bg-surface border border-border text-xs font-medium hover:bg-muted transition-colors">
                                     View Routes
                                 </button>
                             </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {!isExpanded && (
                     <p className="text-[10px] text-muted-foreground mt-2 opacity-50 text-right">Click to analyze</p>
                )}
            </motion.div>
        )})}
      </div>
      
      {/* AI Explainability Footer */}
       <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground/80 bg-surface/30 p-2 rounded-lg border border-border/30">
           <Icon name="Sparkles" size={14} className="text-primary mt-0.5" />
           <p>
               <span className="font-semibold text-primary">Why AI predicts this:</span> Historical data indicates strong correlation (0.89) between Q4 infrastructure project announcements and regional demand spikes in North/West sectors.
           </p>
       </div>
    </div>
  );
};

export default PredictiveDemandChart;