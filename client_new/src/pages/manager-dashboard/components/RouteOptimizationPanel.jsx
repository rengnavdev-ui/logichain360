import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteOptimizationPanel = ({ onOptimize }) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResult, setOptimizationResult] = useState(null);

  const handleOptimize = async () => {
    setIsOptimizing(true);
    
    setTimeout(() => {
      const result = {
        routesOptimized: 12,
        timeSaved: 2.5,
        fuelSaved: 18.3,
        costReduction: 4250,
        efficiency: 94
      };
      setOptimizationResult(result);
      setIsOptimizing(false);
      if (onOptimize) onOptimize(result);
    }, 2000);
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Icon name="Route" size={20} color="var(--color-secondary)" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Route Optimization</h3>
        </div>
      </div>
      <div className="space-y-4 md:space-y-6">
        <div className="p-4 md:p-6 bg-surface rounded-xl border border-border">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="Brain" size={24} color="var(--color-primary)" />
            <div>
              <h4 className="text-sm md:text-base font-semibold text-foreground">AI-Powered Route Planning</h4>
              <p className="text-xs md:text-sm text-muted-foreground">Optimize delivery routes using machine learning algorithms</p>
            </div>
          </div>

          <Button
            variant="default"
            size="lg"
            onClick={handleOptimize}
            loading={isOptimizing}
            iconName="Zap"
            iconPosition="left"
            fullWidth
          >
            {isOptimizing ? 'Optimizing Routes...' : 'Optimize All Routes'}
          </Button>
        </div>

        {optimizationResult && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <h4 className="text-sm md:text-base font-semibold text-foreground">Optimization Complete</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-surface rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Route" size={16} className="text-primary" />
                  <span className="text-xs text-muted-foreground">Routes Optimized</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{optimizationResult?.routesOptimized}</p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Clock" size={16} className="text-success" />
                  <span className="text-xs text-muted-foreground">Time Saved</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{optimizationResult?.timeSaved}<span className="text-sm text-muted-foreground ml-1">hrs</span></p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Fuel" size={16} className="text-warning" />
                  <span className="text-xs text-muted-foreground">Fuel Saved</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{optimizationResult?.fuelSaved}<span className="text-sm text-muted-foreground ml-1">L</span></p>
              </div>

              <div className="p-4 bg-surface rounded-xl border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="IndianRupee" size={16} className="text-secondary" />
                  <span className="text-xs text-muted-foreground">Cost Reduction</span>
                </div>
                <p className="text-2xl font-bold text-foreground">₹{optimizationResult?.costReduction?.toLocaleString('en-IN')}</p>
              </div>
            </div>

            <div className="p-4 bg-primary/10 rounded-xl border border-primary/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Overall Efficiency</span>
                <span className="text-lg font-bold text-primary">{optimizationResult?.efficiency}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000"
                  style={{ width: `${optimizationResult?.efficiency}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="p-4 bg-surface rounded-xl border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-3">Optimization Factors</h4>
          <div className="space-y-2">
            {[
              { icon: 'MapPin', label: 'Distance Minimization', status: 'Active' },
              { icon: 'Clock', label: 'Time Window Optimization', status: 'Active' },
              { icon: 'Fuel', label: 'Fuel Efficiency', status: 'Active' },
              { icon: 'Cloud', label: 'Weather Conditions', status: 'Active' },
              { icon: 'AlertTriangle', label: 'Traffic Patterns', status: 'Active' }
            ]?.map((factor, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Icon name={factor?.icon} size={16} className="text-muted-foreground" />
                  <span className="text-xs md:text-sm text-foreground">{factor?.label}</span>
                </div>
                <span className="text-xs text-success font-medium">{factor?.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimizationPanel;