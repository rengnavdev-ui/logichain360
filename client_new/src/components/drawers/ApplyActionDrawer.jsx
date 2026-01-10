import React, { useState } from 'react';
import { X, AlertTriangle, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import Button from '../ui/Button';

const ApplyActionDrawer = ({ isOpen, onClose, actionData, onConfirm }) => {
  if (!isOpen || !actionData) return null;

  const [isApplying, setIsApplying] = useState(false);

  const handleConfirm = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      onConfirm();
    }, 1500); // Simulate API call
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-surface h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 border-l border-border">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              Confirm Action
              {actionData.priority === 'High' && (
                <span className="text-xs bg-red-500/10 text-red-500 px-2 py-1 rounded-full border border-red-500/20">High Priority</span>
              )}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{actionData.title}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Summary */}
          <div className="bg-muted/30 p-4 rounded-xl border border-border">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Summary of Changes
            </h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {actionData.summary}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {actionData.metrics?.map((metric, index) => (
                <div key={index} className="bg-surface p-3 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <p className="text-lg font-bold" style={{ color: metric.color || 'var(--color-foreground)' }}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Analysis */}
          <div>
            <h3 className="text-sm font-semibold mb-3">Projected Impact</h3>
            <div className="space-y-3">
              {actionData.impacts?.map((impact, index) => (
                <div key={index} className="flex items-center justify-between text-sm py-2 border-b border-border/50 last:border-0">
                  <span className="text-muted-foreground">{impact.label}</span>
                  <span className="font-medium flex items-center gap-1">
                    {impact.value}
                    {impact.trend === 'up' ? '↑' : '↓'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Affected Items */}
          {actionData.affectedItems && (
            <div>
              <h3 className="text-sm font-semibold mb-3">Affected Items ({actionData.affectedItems.length})</h3>
              <div className="bg-muted/20 rounded-xl border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="p-2 text-left">ID</th>
                      <th className="p-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {actionData.affectedItems.map((item, i) => (
                      <tr key={i}>
                        <td className="p-2 font-medium">{item.id}</td>
                        <td className="p-2">{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Warnings */}
          {actionData.confidence < 85 && (
            <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl flex gap-3 text-orange-500">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <div className="text-xs">
                <span className="font-bold block mb-1">Confidence Warning: {actionData.confidence}%</span>
                AI confidence is below the recommended threshold (85%). Human supervision is advised.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/30 space-y-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
             <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3"/> Rollback available for 15m</span>
             <span>Action ID: #{Math.floor(Math.random() * 10000)}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={onClose} disabled={isApplying}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              onClick={handleConfirm}
              isLoading={isApplying}
              className="bg-primary hover:bg-primary/90"
            >
              {isApplying ? 'Applying...' : 'Confirm Apply'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyActionDrawer;
