import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      label: "View Live Tracking",
      icon: "MapPin",
      variant: "default",
      path: "/live-tracking-map"
    },
    {
      id: 2,
      label: "AI Insights",
      icon: "Brain",
      variant: "secondary",
      path: "/ai-insights-analytics"
    },
    {
      id: 3,
      label: "Manager Dashboard",
      icon: "Users",
      variant: "outline",
      path: "/manager-dashboard"
    },
    {
      id: 4,
      label: "Driver App",
      icon: "Smartphone",
      variant: "outline",
      path: "/driver-pwa-app"
    }
  ];

  return (
    <div className="card">
      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant}
            iconName={action?.icon}
            iconPosition="left"
            iconSize={18}
            onClick={() => navigate(action?.path)}
            fullWidth
          >
            {action?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;