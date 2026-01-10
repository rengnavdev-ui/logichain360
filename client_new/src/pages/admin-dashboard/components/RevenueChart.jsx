import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Button from '../../../components/ui/Button';

const RevenueChart = () => {
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('6months');

  const revenueData = [
    { month: 'Jul', revenue: 245000, cost: 180000, profit: 65000, forecast: 0 },
    { month: 'Aug', revenue: 289000, cost: 195000, profit: 94000, forecast: 0 },
    { month: 'Sep', revenue: 312000, cost: 210000, profit: 102000, forecast: 0 },
    { month: 'Oct', revenue: 356000, cost: 225000, profit: 131000, forecast: 0 },
    { month: 'Nov', revenue: 398000, cost: 240000, profit: 158000, forecast: 0 },
    { month: 'Dec', revenue: 445000, cost: 265000, profit: 180000, forecast: 445000 },
    { month: 'Jan', revenue: null, cost: null, profit: null, forecast: 485000 },
    { month: 'Feb', revenue: null, cost: null, profit: null, forecast: 520000 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-surface border border-border rounded-xl p-4 shadow-lg backdrop-blur-md bg-opacity-90">
          <p className="text-sm font-semibold text-foreground mb-3">{label} 2024–25</p>
          {payload?.map((entry, index) => {
             if (entry.value === null) return null;
             return (
                <div key={index} className="flex items-center justify-between gap-6 text-xs mb-1 last:mb-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
                    <span className="text-muted-foreground capitalize">{entry.name}:</span>
                  </div>
                  <span className="font-semibold tabular-nums" style={{ color: entry.color }}>
                    ₹{(entry.value / 1000).toFixed(1)}K
                  </span>
                </div>
             );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-1">
            Revenue Analytics & Forecast
          </h3>
          <p className="text-sm text-muted-foreground">Financial performance with Q1 2025 predictive modeling</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
            <Button
              variant={chartType === 'line' ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setChartType('line')}
              iconName="LineChart"
              iconSize={14}
            >
              Line
            </Button>
            <Button
              variant={chartType === 'bar' ? 'default' : 'ghost'}
              size="xs"
              onClick={() => setChartType('bar')}
              iconName="BarChart3"
              iconSize={14}
            >
              Bar
            </Button>
          </div>
          
          <Button
            variant="outline"
            size="xs"
            iconName="Download"
            iconSize={14}
          >
            Export Report
          </Button>
        </div>
      </div>
      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Revenue Analytics Chart">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '11px' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '11px' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-border)', strokeWidth: 1, strokeDasharray: '5 5' }} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="circle"
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                name="Revenue"
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', r: 4, strokeWidth: 0 }}
                activeDot={{ r: 7, strokeWidth: 0 }}
                connectNulls
              />
              <Line 
                type="monotone" 
                dataKey="cost" 
                name="Operational Cost"
                stroke="var(--color-warning)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-warning)', r: 3, strokeWidth: 0 }}
                connectNulls
              />
               <Line 
                type="monotone" 
                dataKey="profit" 
                name="Net Profit"
                stroke="var(--color-success)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-success)', r: 3, strokeWidth: 0 }}
                connectNulls
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                name="AI Forecast"
                stroke="var(--color-primary)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: 'var(--color-primary)', r: 3, strokeWidth: 0, fillOpacity: 0.5 }}
              />
            </LineChart>
          ) : (
            <BarChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '11px' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '11px' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-muted)', opacity: 0.2 }} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="circle"
              />
              <Bar dataKey="revenue" name="Revenue" fill="var(--color-primary)" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="cost" name="Cost" fill="var(--color-warning)" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="profit" name="Profit" fill="var(--color-success)" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;