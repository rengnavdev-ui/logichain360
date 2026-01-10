import React from 'react';
import Icon from '../../../components/AppIcon';

const AIInsightCard = ({ title, description, metric, metricLabel, trend, icon, iconColor, priority, onClick }) => {
  const priorityConfig = {
    high: { bg: 'bg-error/10', text: 'text-error', label: 'High Priority' },
    medium: { bg: 'bg-warning/10', text: 'text-warning', label: 'Medium Priority' },
    low: { bg: 'bg-success/10', text: 'text-success', label: 'Low Priority' }
  };

  const config = priorityConfig?.[priority] || priorityConfig?.medium;

  return (
    <div 
      onClick={onClick}
      className={`card group hover:scale-[1.02] transition-transform duration-250 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div 
          className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center"
          style={{ 
            background: `${iconColor}15`,
            boxShadow: `0 0 16px ${iconColor}20`
          }}
        >
          <Icon name={icon} size={20} color={iconColor} />
        </div>
        <div className={`px-2 py-1 rounded-lg ${config?.bg}`}>
          <span className={`text-xs font-medium ${config?.text}`}>{config?.label}</span>
        </div>
      </div>
      <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">
        {title}
      </h4>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {description}
      </p>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{metricLabel}</p>
          <p className="text-lg md:text-xl font-bold text-foreground">{metric}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Icon name="TrendingUp" size={14} color="var(--color-success)" />
          <span>{trend}</span>
        </div>
      </div>
    </div>
  );
};

export default AIInsightCard;