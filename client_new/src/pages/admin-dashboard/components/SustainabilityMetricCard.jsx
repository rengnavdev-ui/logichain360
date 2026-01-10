import React from 'react';
import Icon from '../../../components/AppIcon';

const SustainabilityMetrics = () => {
  const sustainabilityData = [
    {
      id: 1,
      title: "CO₂ Emissions Reduced",
      value: "2,450",
      unit: "kg",
      target: "3,000 kg",
      progress: 82,
      icon: "Leaf",
      iconColor: "var(--color-success)",
      trend: "+12% vs last month"
    },
    {
      id: 2,
      title: "Electric Vehicle Usage",
      value: "34",
      unit: "%",
      target: "50%",
      progress: 68,
      icon: "Zap",
      iconColor: "var(--color-warning)",
      trend: "+8% vs last month"
    },
    {
      id: 3,
      title: "Route Optimization",
      value: "18,500",
      unit: "km saved",
      target: "20,000 km",
      progress: 93,
      icon: "Route",
      iconColor: "var(--color-primary)",
      trend: "+15% vs last month"
    },
    {
      id: 4,
      title: "Green Deliveries",
      value: "1,245",
      unit: "deliveries",
      target: "1,500",
      progress: 83,
      icon: "Package",
      iconColor: "var(--color-success)",
      trend: "+10% vs last month"
    }
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-1">
            Sustainability Dashboard
          </h3>
          <p className="text-sm text-muted-foreground">Environmental impact tracking & green initiatives</p>
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center bg-success/10">
          <Icon name="TreePine" size={20} color="var(--color-success)" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {sustainabilityData?.map((item) => (
          <div key={item?.id} className="bg-muted rounded-xl p-4 md:p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">{item?.title}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl md:text-2xl font-bold text-foreground">
                    {item?.value}
                  </span>
                  <span className="text-sm text-muted-foreground">{item?.unit}</span>
                </div>
              </div>
              <div 
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center"
                style={{ 
                  background: `${item?.iconColor}15`,
                  boxShadow: `0 0 12px ${item?.iconColor}20`
                }}
              >
                <Icon name={item?.icon} size={16} color={item?.iconColor} />
              </div>
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{item?.progress}%</span>
              </div>
              <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${item?.progress}%`,
                    background: item?.iconColor
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Target: {item?.target}</span>
              <span className="text-success">{item?.trend}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-xl">
        <div className="flex items-start gap-3">
          <Icon name="Award" size={20} color="var(--color-success)" />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Green Logistics Certification Progress
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              You're 87% towards achieving ISO 14001 Environmental Management certification
            </p>
            <div className="w-full h-2 bg-background rounded-full overflow-hidden">
              <div 
                className="h-full bg-success rounded-full transition-all duration-500"
                style={{ width: '87%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityMetrics;