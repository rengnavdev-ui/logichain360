import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionsPanel = ({ onAction }) => {
  const quickActions = [
    {
      id: 'bulk-assign',
      icon: 'Users',
      label: 'Bulk Assign Drivers',
      description: 'Assign multiple shipments to drivers',
      color: 'primary'
    },
    {
      id: 'emergency-dispatch',
      icon: 'Siren',
      label: 'Emergency Dispatch',
      description: 'Create urgent delivery request',
      color: 'error'
    },
    {
      id: 'route-report',
      icon: 'FileText',
      label: 'Generate Report',
      description: 'Export route performance data',
      color: 'secondary'
    },
    {
      id: 'fleet-status',
      icon: 'Activity',
      label: 'Fleet Status',
      description: 'View real-time fleet overview',
      color: 'success'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary border-primary/30 hover:bg-primary/20',
      error: 'bg-error/10 text-error border-error/30 hover:bg-error/20',
      secondary: 'bg-secondary/10 text-secondary border-secondary/30 hover:bg-secondary/20',
      success: 'bg-success/10 text-success border-success/30 hover:bg-success/20'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <Icon name="Zap" size={20} color="var(--color-accent)" />
        </div>
        <h3 className="text-lg md:text-xl font-semibold text-foreground">Quick Actions</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => onAction && onAction(action?.id)}
            className={`p-4 rounded-xl border transition-all text-left ${getColorClasses(action?.color)}`}
          >
            <div className="flex items-start gap-3">
              <Icon name={action?.icon} size={24} className="flex-shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-base font-semibold mb-1">{action?.label}</h4>
                <p className="text-xs text-muted-foreground">{action?.description}</p>
              </div>
              <Icon name="ChevronRight" size={18} className="flex-shrink-0 mt-1 opacity-50" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;