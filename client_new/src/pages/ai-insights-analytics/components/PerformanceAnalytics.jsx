import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const PerformanceAnalytics = () => {
  const [viewMode, setViewMode] = useState('efficiency'); // 'efficiency' | 'utilization'
  const [selectedMetric, setSelectedMetric] = useState(null); // For KPI Drawer
  const [selectedVehicle, setSelectedVehicle] = useState(null); // For Bar Chart Drill-down
  const [radarScenario, setRadarScenario] = useState('current'); // 'current', 'previous', 'benchmark'
  const [showRadarComparison, setShowRadarComparison] = useState(false);

  // Mock Data
  const efficiencyData = [
    { name: "Driver 1", efficiency: 92, deliveries: 45, rating: 4.8 },
    { name: "Driver 2", efficiency: 88, deliveries: 42, rating: 4.6 },
    { name: "Driver 3", efficiency: 95, deliveries: 48, rating: 4.9 },
    { name: "Driver 4", efficiency: 85, deliveries: 38, rating: 4.5 },
    { name: "Driver 5", efficiency: 90, deliveries: 44, rating: 4.7 },
    { name: "Driver 6", efficiency: 87, deliveries: 40, rating: 4.6 },
    { name: "Driver 7", efficiency: 93, deliveries: 46, rating: 4.8 },
    { name: "Driver 8", efficiency: 89, deliveries: 43, rating: 4.7 }
  ];

  const vehicleUtilization = [
    { vehicle: "Truck 1", utilization: 87, distance: 2400, fuel: 92 },
    { vehicle: "Truck 2", utilization: 92, distance: 2800, fuel: 88 },
    { vehicle: "Truck 3", utilization: 78, distance: 2100, fuel: 85 },
    { vehicle: "Truck 4", utilization: 95, distance: 3200, fuel: 90 },
    { vehicle: "Truck 5", utilization: 85, distance: 2600, fuel: 87 },
    { vehicle: "Truck 6", utilization: 90, distance: 2900, fuel: 89 }
  ];

  const radarData = [
    { metric: "On-Time Delivery", value: 92, previous: 85, benchmark: 95, fullMark: 100 },
    { metric: "Fuel Efficiency", value: 88, previous: 86, benchmark: 92, fullMark: 100 },
    { metric: "Customer Rating", value: 95, previous: 94, benchmark: 98, fullMark: 100 },
    { metric: "Route Optimization", value: 87, previous: 80, benchmark: 90, fullMark: 100 },
    { metric: "Vehicle Maintenance", value: 90, previous: 88, benchmark: 95, fullMark: 100 },
    { metric: "Cost Efficiency", value: 85, previous: 82, benchmark: 88, fullMark: 100 }
  ];

  const kpiMetrics = [
    {
      id: 'fleet-eff',
      label: "Fleet Efficiency",
      value: "89.5%",
      change: "+5.2%",
      trend: "up",
      icon: "TrendingUp",
      color: "var(--color-success)",
      definition: "Ratio of successful on-time deliveries to total dispatched orders.",
      formula: "(On-Time / Total) * 100",
      source: "Dispatch System",
      reason: "Improved route optimization in North Zone."
    },
    {
      id: 'avg-del',
      label: "Avg Delivery Time",
      value: "4.2 hrs",
      change: "-12%",
      trend: "down",
      icon: "Clock",
      color: "var(--color-primary)",
      definition: "Average time taken from dispatch to proof-of-delivery.",
      formula: "Sum(Delivery Time) / Total Deliveries",
      source: "Driver App GPS",
      reason: "Reduced dwell time at hubs."
    },
    {
      id: 'veh-util',
      label: "Vehicle Utilization",
      value: "87.8%",
      change: "+8.5%",
      trend: "up",
      icon: "Truck",
      color: "var(--color-secondary)",
      definition: "Percentage of total fleet capacity (volume/weight) currently in transit.",
      formula: "(Active Load / Total Capacity) * 100",
      source: "Telematics Gateway",
      reason: "Peak season demand surge."
    },
    {
      id: 'cost-km',
      label: "Cost per KM",
      value: "₹12.50",
      change: "-6.3%",
      trend: "down",
      icon: "DollarSign",
      color: "var(--color-accent)",
      definition: "Operational cost incurred per kilometer traveled.",
      formula: "(Fuel + Maintenance + Labor) / Total KM",
      source: "Finance Module",
      reason: "Lower fuel prices and better maintenance."
    }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-xl p-4 shadow-lg z-50">
          <p className="text-sm font-semibold mb-2">{payload[0].payload.name || payload[0].payload.vehicle}</p>
          <div className="space-y-1">
            {payload.map((entry, index) => (
              <p key={index} className="text-xs" style={{ color: entry.color }}>
                {entry.name}: {entry.value}{entry.name.includes('Efficiency') || entry.name.includes('Utilization') || entry.name.includes('Fuel') ? '%' : ''}
              </p>
            ))}
            <p className="text-xs text-muted-foreground mt-2 border-t border-border pt-1">
              Click to view detailed drill-down
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleBarClick = (data) => {
    setSelectedVehicle(data);
  };

  return (
    <div className="card relative overflow-hidden">
      {/* KPI Detail Drawer */}
      <AnimatePresence>
        {selectedMetric && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="absolute top-0 right-0 w-full md:w-1/3 h-full bg-surface border-l border-border z-30 shadow-2xl p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">{selectedMetric.label} Details</h3>
              <button onClick={() => setSelectedMetric(null)} className="p-2 hover:bg-muted rounded-full"><Icon name="X" size={20}/></button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-xl">
                 <p className="text-sm text-muted-foreground mb-1">Current Value</p>
                 <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{selectedMetric.value}</span>
                    <span className={`text-sm font-semibold ${selectedMetric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>{selectedMetric.change}</span>
                 </div>
              </div>

              <div>
                  <h4 className="text-sm font-semibold mb-2 text-primary">Definition</h4>
                  <p className="text-sm text-muted-foreground">{selectedMetric.definition}</p>
              </div>
              
               <div>
                  <h4 className="text-sm font-semibold mb-2 text-primary">Calculation Formula</h4>
                  <code className="block bg-muted p-2 rounded-lg text-xs font-mono">{selectedMetric.formula}</code>
              </div>

               <div>
                  <h4 className="text-sm font-semibold mb-2 text-primary">Data Source</h4>
                  <div className="flex items-center gap-2 text-sm text-foreground">
                      <Icon name="Database" size={16} /> {selectedMetric.source}
                  </div>
              </div>

              <div>
                  <h4 className="text-sm font-semibold mb-2 text-primary">Analysis</h4>
                  <p className="text-sm text-foreground italic border-l-2 border-primary pl-3">"{selectedMetric.reason}"</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Performance Analytics Dashboard</h2>
          <p className="text-sm md:text-base text-muted-foreground">Comprehensive fleet and driver performance metrics</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setViewMode('efficiency')}
            className={`px-4 md:px-6 py-2 rounded-xl text-sm md:text-base font-medium transition-all duration-250 ${
              viewMode === 'efficiency' ?'bg-primary text-primary-foreground shadow-glow-md' :'bg-muted text-muted-foreground hover:bg-surface'
            }`}
          >
            Driver Efficiency
          </button>
          <button
            onClick={() => setViewMode('utilization')}
            className={`px-4 md:px-6 py-2 rounded-xl text-sm md:text-base font-medium transition-all duration-250 ${
              viewMode === 'utilization' ?'bg-primary text-primary-foreground shadow-glow-md' :'bg-muted text-muted-foreground hover:bg-surface'
            }`}
          >
            Vehicle Utilization
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
        {kpiMetrics.map((metric, index) => (
          <div 
            key={index} 
            className="bg-muted rounded-2xl p-4 md:p-6 hover:bg-surface transition-all duration-250 cursor-pointer border border-transparent hover:border-primary/30 group"
            onClick={() => setSelectedMetric(metric)}
          >
            <div className="flex items-center justify-between mb-3">
              <div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${metric.color}20` }}
              >
                <Icon name={metric.icon} size={20} color={metric.color} />
              </div>
              <span className={`text-xs md:text-sm font-semibold flex items-center gap-1 ${metric.trend === 'up' ? 'text-success' : 'text-primary'}`}>
                {metric.change}
                <Icon name="ChevronRight" size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground mb-1 group-hover:text-primary transition-colors">{metric.label}</p>
            <p className="text-xl md:text-2xl font-bold">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 relative">
          <div className="flex items-center justify-between mb-4">
               <h3 className="text-base md:text-lg font-semibold">
                {viewMode === 'efficiency' ? 'Driver Performance Metrics' : 'Vehicle Utilization Analysis'}
              </h3>
               {selectedVehicle && (
                  <button onClick={() => setSelectedVehicle(null)} className="text-xs text-primary flex items-center gap-1 hover:underline">
                      <Icon name="ArrowLeft" size={12} /> Back to Overview
                  </button>
              )}
          </div>
         
          <div className="w-full h-64 md:h-80 lg:h-96 relative" aria-label={`${viewMode} Performance Chart`}>
             {selectedVehicle ? (
                 <div className="w-full h-full bg-surface/50 rounded-xl p-6 border border-border animate-in fade-in zoom-in-95">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <Icon name={viewMode === 'efficiency' ? 'User' : 'Truck'} size={24} className="text-primary"/>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold">{selectedVehicle.name || selectedVehicle.vehicle}</h4>
                            <p className="text-sm text-muted-foreground">Deep Dive Analysis</p>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                         <div className="bg-muted p-4 rounded-lg">
                             <p className="text-xs text-muted-foreground">Historical Avg</p>
                             <p className="text-xl font-bold">88.2%</p>
                         </div>
                         <div className="bg-muted p-4 rounded-lg">
                             <p className="text-xs text-muted-foreground">Rank in Fleet</p>
                             <p className="text-xl font-bold">#4</p>
                         </div>
                         <div className="bg-muted p-4 rounded-lg">
                             <p className="text-xs text-muted-foreground">Anomaly Count</p>
                             <p className="text-xl font-bold text-red-500">2</p>
                         </div>
                         <div className="bg-muted p-4 rounded-lg">
                             <p className="text-xs text-muted-foreground">Est. Savings</p>
                             <p className="text-xl font-bold text-green-500">₹4.2k</p>
                         </div>
                     </div>
                 </div>
             ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={viewMode === 'efficiency' ? efficiencyData : vehicleUtilization} onClick={(data) => { if(data?.activePayload?.[0]?.payload) handleBarClick(data.activePayload[0].payload) }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey={viewMode === 'efficiency' ? 'name' : 'vehicle'} 
                      stroke="var(--color-muted-foreground)"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="var(--color-muted-foreground)"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'var(--color-primary)', opacity: 0.1}} />
                    <Legend wrapperStyle={{ fontSize: '14px' }} iconType="circle" />
                    {viewMode === 'efficiency' ? (
                      <>
                        <Bar dataKey="efficiency" fill="var(--color-primary)" radius={[8, 8, 0, 0]} name="Efficiency %" barSize={30} />
                        <Bar dataKey="deliveries" fill="var(--color-secondary)" radius={[8, 8, 0, 0]} name="Deliveries" barSize={30} />
                      </>
                    ) : (
                      <>
                        <Bar dataKey="utilization" fill="var(--color-accent)" radius={[8, 8, 0, 0]} name="Utilization %" barSize={30} />
                        <Bar dataKey="fuel" fill="var(--color-success)" radius={[8, 8, 0, 0]} name="Fuel Efficiency %" barSize={30} />
                      </>
                    )}
                  </BarChart>
                </ResponsiveContainer>
             )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
              <h3 className="text-base md:text-lg font-semibold">Performance Radar</h3>
              <div className="flex gap-1 bg-muted p-1 rounded-lg">
                  <button onClick={() => setShowRadarComparison(!showRadarComparison)} className={`p-1 rounded ${showRadarComparison ? 'bg-primary text-primary-foreground' : 'hover:bg-surface'}`} title="Compare Scenarios">
                      <Icon name="Layers" size={14} />
                  </button>
              </div>
          </div>
          
          <div className="w-full h-64 md:h-80 lg:h-96 relative" aria-label="Performance Radar Chart">
             {showRadarComparison && (
                 <div className="absolute top-0 right-0 z-10 bg-surface/80 backdrop-blur p-2 rounded-lg border border-border text-xs">
                     <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-[var(--color-primary)]"/> Current</div>
                     <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-[var(--color-secondary)]"/> Previous</div>
                     <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"/> Benchmark</div>
                 </div>
             )}
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis 
                  dataKey="metric" 
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '10px' }}
                  tick={{ fill: 'var(--color-muted-foreground)' }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]}
                  stroke="var(--color-muted-foreground)"
                  style={{ fontSize: '10px' }}
                />
                <Radar 
                  name="Current" 
                  dataKey="value" 
                  stroke="var(--color-primary)" 
                  fill="var(--color-primary)" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                {showRadarComparison && (
                    <>
                        <Radar 
                        name="Previous" 
                        dataKey="previous" 
                        stroke="var(--color-secondary)" 
                        fill="var(--color-secondary)" 
                        fillOpacity={0.1}
                        strokeWidth={1}
                        strokeDasharray="5 5"
                        />
                        <Radar 
                        name="Benchmark" 
                        dataKey="benchmark" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.0}
                        strokeWidth={1}
                        />
                    </>
                )}
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-8 bg-muted rounded-2xl p-4 md:p-6 group relative overflow-hidden">
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 animate-pulse">
            <Icon name="Lightbulb" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm md:text-base font-semibold">Performance Insights</h4>
                <div className="flex gap-2">
                    <button className="px-3 py-1 bg-primary text-primary-foreground text-xs rounded-lg font-medium hover:bg-primary/90 transition-colors">
                        Apply Optimization
                    </button>
                </div>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              Fleet efficiency has improved by <span className="text-success font-bold">5.2%</span> this month. Top performers show 15% better fuel efficiency through optimized routing. 
              Consider implementing best practices training program to elevate overall fleet performance to match top-tier standards.
            </p>
            
            <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-foreground"><Icon name="ThumbsUp" size={12}/> Helpful</button>
                <button className="flex items-center gap-1 hover:text-foreground"><Icon name="ThumbsDown" size={12}/> Dismiss</button>
            </div>
          </div>
        </div>
        {/* Decorative background glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
      </div>
    </div>
  );
};

export default PerformanceAnalytics;