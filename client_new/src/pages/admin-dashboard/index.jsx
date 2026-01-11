import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import QuickActionButton from '../../components/ui/QuickActionButton';
import ToastNotification from '../../components/ui/ToastNotification';
import MetricCard from './components/MetricCard';
import RevenueChart from './components/RevenueChart';
import AllInsightCard from './components/AllInsightCard';
import SustainabilityMetrics from './components/SustainabilityMetricCard';
import QuickActions from './components/QuickActions';
import { useNavigate } from 'react-router-dom';


const AdminDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  useEffect(() => {
    const welcomeNotification = {
      id: Date.now(),
      type: 'success',
      title: 'Welcome Back!',
      message: 'All systems operational. Real-time data syncing active.',
      duration: 5000
    };
    setNotifications([welcomeNotification]);

    const statusInterval = setInterval(() => {
      setConnectionStatus(prev => prev === 'connected' ? 'syncing' : 'connected');
    }, 8000);

    return () => clearInterval(statusInterval);
  }, []);

  const handleQuickAction = (action) => {
    const actionNotification = {
      id: Date.now(),
      type: 'info',
      message: `Quick action: ${action} initiated`,
      duration: 3000
    };
    setNotifications(prev => [...prev, actionNotification]);
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev?.filter(n => n?.id !== id));
  };

  const navigate = useNavigate();

  const kpiMetrics = [
    {
      id: 1,
      title: "Total Shipments",
      value: "12,458",
      change: "+18.2%",
      changeType: "positive",
      icon: "Package",
      iconColor: "var(--color-primary)",
      trend: "vs last month",
      path: "/admin/shipments"
    },
    {
      id: 2,
      title: "Active Vehicles",
      value: "342",
      change: "+12.5%",
      changeType: "positive",
      icon: "Truck",
      iconColor: "var(--color-secondary)",
      trend: "vs last month",
      path: "/admin/vehicles"
    },
    {
      id: 3,
      title: "Total Drivers",
      value: "486",
      change: "+8.3%",
      changeType: "positive",
      icon: "Users",
      iconColor: "var(--color-success)",
      trend: "vs last month",
      path: "/admin/drivers"
    },
    {
      id: 4,
      title: "On-Time Delivery",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: "Clock",
      iconColor: "var(--color-warning)",
      trend: "vs last month",
      path: "/admin/delivery-performance"
    }
  ];

  const aiInsights = [
    {
      id: 1,
      title: "Demand Surge Predicted",
      description: "AI forecasts 28% increase in shipment volume for Mumbai-Delhi route in next 7 days. Recommend allocating 15 additional vehicles.",
      metric: "28%",
      metricLabel: "Predicted Increase",
      trend: "+5% confidence",
      icon: "TrendingUp",
      iconColor: "var(--color-primary)",
      priority: "high",
      path: "/admin/surges"
    },
    {
      id: 2,
      title: "Route Optimization Opportunity",
      description: "ML analysis suggests alternative route via NH48 can reduce delivery time by 45 minutes and save ₹12,500 in fuel costs weekly.",
      metric: "₹12.5K",
      metricLabel: "Weekly Savings",
      trend: "+18% efficiency",
      icon: "Route",
      iconColor: "var(--color-success)",
      priority: "medium",
      path: "/admin/optimization"
    },
    {
      id: 3,
      title: "Delay Risk Alert",
      description: "Weather patterns indicate 65% probability of delays on Bangalore-Chennai corridor. Suggest rescheduling 23 shipments to avoid penalties.",
      metric: "65%",
      metricLabel: "Risk Probability",
      trend: "Next 48 hours",
      icon: "AlertTriangle",
      iconColor: "var(--color-warning)",
      priority: "high",
      path: "/admin/risks"
    },
    {
      id: 4,
      title: "Driver Performance Insight",
      description: "Top 10% drivers show 32% better fuel efficiency. AI recommends training program implementation for remaining fleet to replicate best practices.",
      metric: "32%",
      metricLabel: "Efficiency Gap",
      trend: "+12% potential",
      icon: "Award",
      iconColor: "var(--color-secondary)",
      priority: "low",
      path: "/admin/driver-intelligence"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - NexLogica</title>
        <meta name="description" content="Comprehensive logistics operations oversight with AI-powered insights, real-time tracking, and sustainability metrics for strategic decision-making." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <RoleBasedNavigation userRole="admin" connectionStatus={connectionStatus} />

        <main className="pt-20 pb-24 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Admin Dashboard
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Comprehensive logistics operations overview • Last updated: {new Date()?.toLocaleString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              {kpiMetrics?.map((metric) => (
                <MetricCard
                  key={metric?.id}
                  {...metric}
                  onClick={() => navigate(metric.path)}
                />
              ))}
            </div>

            <div className="mb-6 md:mb-8">
              <RevenueChart />
            </div>

            <div className="mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                AI-Powered Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {aiInsights?.map((insight) => (
                  <AllInsightCard
                    key={insight?.id}
                    {...insight}
                    onClick={() => navigate(insight.path)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-6 md:mb-8">
              <SustainabilityMetrics />
            </div>

            <QuickActions />
          </div>
        </main>

        <QuickActionButton userRole="admin" onAction={handleQuickAction} />
        <ToastNotification
          notifications={notifications}
          onDismiss={handleDismissNotification}
        />
      </div>
    </>
  );
};

export default AdminDashboard;