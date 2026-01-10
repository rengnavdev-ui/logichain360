import React, { useState } from 'react';
import Icon from '../AppIcon';

const QuickActionButton = ({ userRole = 'admin', onAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const actionConfig = {
    admin: {
      icon: 'Plus',
      label: 'Quick Action',
      actions: [
        { icon: 'Package', label: 'New Shipment', action: 'create-shipment' },
        { icon: 'Users', label: 'Add Driver', action: 'add-driver' },
        { icon: 'FileText', label: 'Generate Report', action: 'generate-report' },
      ],
    },
    manager: {
      icon: 'Plus',
      label: 'Quick Action',
      actions: [
        { icon: 'Package', label: 'New Shipment', action: 'create-shipment' },
        { icon: 'MapPin', label: 'Assign Route', action: 'assign-route' },
        { icon: 'AlertCircle', label: 'Report Issue', action: 'report-issue' },
      ],
    },
    driver: {
      icon: 'CheckCircle',
      label: 'Update Status',
      actions: [
        { icon: 'CheckCircle', label: 'Mark Delivered', action: 'mark-delivered' },
        { icon: 'Clock', label: 'Delay Report', action: 'delay-report' },
        { icon: 'AlertCircle', label: 'Report Issue', action: 'report-issue' },
      ],
    },
  };

  const config = actionConfig?.[userRole] || actionConfig?.admin;

  const handleActionClick = (action) => {
    if (onAction) {
      onAction(action);
    }
    setIsExpanded(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1030]">
      {isExpanded && (
        <div className="absolute bottom-20 right-0 flex flex-col gap-3 mb-2">
          {config?.actions?.map((action, index) => (
            <button
              key={index}
              onClick={() => handleActionClick(action?.action)}
              className="flex items-center gap-3 bg-surface text-foreground px-4 py-3 rounded-xl border border-border shadow-glow-md hover:shadow-glow-lg transition-all duration-250 whitespace-nowrap"
              style={{
                animation: `slideInRight 250ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 50}ms both`,
              }}
            >
              <Icon name={action?.icon} size={20} />
              <span className="text-sm font-medium">{action?.label}</span>
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="quick-action-fab"
        aria-label={config?.label}
      >
        <Icon name={isExpanded ? 'X' : config?.icon} size={24} />
      </button>
    </div>
  );
};

export default QuickActionButton;