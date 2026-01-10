import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, change, changeType, icon, iconColor, trend, onClick }) => {
  const isPositive = changeType === 'positive';
  
  return (
    <div 
      onClick={onClick}
      className={`card group hover:scale-[1.02] transition-transform duration-250 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            {value}
          </h3>
        </div>
        <div 
          className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center transition-all duration-250"
          style={{ 
            background: `${iconColor}15`,
            boxShadow: `0 0 20px ${iconColor}20`
          }}
        >
          <Icon name={icon} size={24} color={iconColor} />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
          isPositive ? 'bg-success/10' : 'bg-error/10'
        }`}>
          <Icon 
            name={isPositive ? 'TrendingUp' : 'TrendingDown'} 
            size={14} 
            color={isPositive ? 'var(--color-success)' : 'var(--color-error)'} 
          />
          <span className={`text-xs font-medium ${
            isPositive ? 'text-success' : 'text-error'
          }`}>
            {change}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{trend}</span>
      </div>
    </div>
  );
};

export default MetricCard;