import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SmartRecommendations = ({ onApplyAction, onInsightClick }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const recommendations = [
    {
      id: 1,
      category: "route",
      title: "Optimize Route for SHP-2025-045",
      description: "Switch to NH-48 instead of NH-44 to save 45 minutes and reduce fuel consumption by 12%. Current traffic analysis shows 30% less congestion on alternate route.",
      impact: {
        time: "45 min",
        cost: "₹850",
        fuel: "12%"
      },
      priority: "high",
      confidence: 96,
      icon: "Route",
      color: "var(--color-primary)"
    },
    {
      id: 2,
      category: "fleet",
      title: "Vehicle Maintenance Alert",
      description: "Vehicle MH-02-AB-1234 requires preventive maintenance. Predictive analysis indicates 78% probability of breakdown within next 500km based on sensor data patterns.",
      impact: {
        downtime: "Prevented",
        cost: "₹15,000",
        reliability: "+25%"
      },
      priority: "high",
      confidence: 92,
      icon: "Wrench",
      color: "var(--color-error)"
    },
    {
      id: 3,
      category: "cost",
      title: "Consolidate Shipments to Pune",
      description: "Combine 3 partial loads scheduled for 28-29 Dec into single full truckload. This optimization reduces operational costs and improves vehicle utilization efficiency.",
      impact: {
        savings: "₹4,200",
        efficiency: "+35%",
        emissions: "-18%"
      },
      priority: "medium",
      confidence: 89,
      icon: "Package",
      color: "var(--color-success)"
    },
    {
      id: 4,
      category: "driver",
      title: "Driver Performance Optimization",
      description: "Driver ID-2847 shows consistent fuel efficiency 15% above fleet average. Recommend as trainer for best practices program to improve overall fleet performance.",
      impact: {
        training: "5 drivers",
        potential: "₹25,000/mo",
        efficiency: "+12%"
      },
      priority: "low",
      confidence: 94,
      icon: "Award",
      color: "var(--color-warning)"
    },
    {
      id: 5,
      category: "route",
      title: "Weather-Based Route Adjustment",
      description: "Heavy rainfall predicted on Mumbai-Pune expressway tomorrow 10:00-14:00. Suggest departure time shift to 15:00 or alternate route via NH-48 to avoid delays.",
      impact: {
        delay: "Avoided",
        safety: "+40%",
        time: "2 hours"
      },
      priority: "high",
      confidence: 91,
      icon: "CloudRain",
      color: "var(--color-secondary)"
    },
    {
      id: 6,
      category: "cost",
      title: "Fuel Purchase Optimization",
      description: "Fuel prices 8% lower at stations within 50km radius. Recommend refueling at identified locations to maximize cost savings across fleet operations.",
      impact: {
        savings: "₹12,500",
        volume: "2500L",
        discount: "8%"
      },
      priority: "medium",
      confidence: 88,
      icon: "Fuel",
      color: "var(--color-accent)"
    }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: 'Grid' },
    { id: 'route', label: 'Route', icon: 'Route' },
    { id: 'fleet', label: 'Fleet', icon: 'Truck' },
    { id: 'cost', label: 'Cost', icon: 'DollarSign' },
    { id: 'driver', label: 'Driver', icon: 'User' }
  ];

  const filteredRecommendations = activeCategory === 'all' 
    ? recommendations 
    : recommendations?.filter(rec => rec?.category === activeCategory);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBg = (priority) => {
    switch(priority) {
      case 'high': return 'bg-error/10';
      case 'medium': return 'bg-warning/10';
      case 'low': return 'bg-success/10';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="card">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2">Smart Recommendations Engine</h2>
          <p className="text-sm md:text-base text-muted-foreground">AI-powered actionable insights for operational excellence</p>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-muted-foreground">Live Analysis Active</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setActiveCategory(category?.id)}
            className={`flex items-center gap-2 px-4 md:px-6 py-2 rounded-xl text-sm md:text-base font-medium transition-all duration-250 ${
              activeCategory === category?.id
                ? 'bg-primary text-primary-foreground shadow-glow-md'
                : 'bg-muted text-muted-foreground hover:bg-surface'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {filteredRecommendations?.map((recommendation) => (
          <div
            key={recommendation?.id}
            className="bg-muted rounded-2xl p-4 md:p-6 hover:bg-surface transition-all duration-250 border border-transparent hover:border-primary/20 cursor-pointer group"
            onClick={() => onInsightClick && onInsightClick(recommendation)}
          >
            <div className="flex items-start gap-4 mb-4">
              <div 
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${recommendation?.color}20` }}
              >
                <Icon name={recommendation?.icon} size={24} color={recommendation?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base md:text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">{recommendation?.title}</h3>
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium uppercase tracking-wider flex-shrink-0 ${getPriorityBg(recommendation?.priority)} ${getPriorityColor(recommendation?.priority)}`}>
                    {recommendation?.priority}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {recommendation?.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4">
              {Object.entries(recommendation?.impact)?.map(([key, value], index) => (
                <div key={index} className="bg-surface rounded-xl p-3">
                  <p className="text-xs text-muted-foreground mb-1 capitalize">{key}</p>
                  <p className="text-sm md:text-base font-semibold whitespace-nowrap">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="Target" size={16} color="var(--color-success)" />
                <span className="text-xs md:text-sm text-muted-foreground">
                  Confidence: <span className={`font-semibold ${recommendation.confidence < 85 ? 'text-warning' : 'text-foreground'}`}>{recommendation?.confidence}%</span>
                </span>
              </div>
              <button 
                className="px-4 md:px-6 py-2 bg-primary text-primary-foreground rounded-xl text-xs md:text-sm font-medium hover:shadow-glow-md transition-all duration-250"
                onClick={(e) => {
                    e.stopPropagation();
                    onApplyAction && onApplyAction(recommendation);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredRecommendations?.length === 0 && (
        <div className="text-center py-12 md:py-16">
          <Icon name="Inbox" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-base md:text-lg text-muted-foreground">No recommendations in this category</p>
        </div>
      )}
    </div>
  );
};

export default SmartRecommendations;