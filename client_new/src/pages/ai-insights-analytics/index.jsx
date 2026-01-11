import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import QuickActionButton from '../../components/ui/QuickActionButton';
import ToastNotification from '../../components/ui/ToastNotification';
import Icon from '../../components/AppIcon';
import PredictiveDemandChart from './components/PredictiveDemandChart';
import DelayProbabilityMeter from './components/DelayProbabilityMeter';
import SmartRecommendations from './components/SmartRecommendations';
import ETAPredictionPanel from './components/ETAPredictionPanel';
import PerformanceAnalytics from './components/PerformanceAnalytics';

// Modals & Drawers
import NewShipmentModal from '../../components/modals/NewShipmentModal';
import AddDriverModal from '../../components/modals/AddDriverModal';
import ApplyActionDrawer from '../../components/drawers/ApplyActionDrawer';
import InsightDetailModal from '../../components/modals/InsightDetailModal';

const AIInsightsAnalytics = () => {
  const [notifications, setNotifications] = useState([]);
  const [dateRange, setDateRange] = useState('30days');
  const [activeModal, setActiveModal] = useState(null); // 'shipment', 'driver', 'insight'
  const [activeDrawer, setActiveDrawer] = useState(null); // 'apply'
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedInsight, setSelectedInsight] = useState(null);


  useEffect(() => {
    const welcomeNotification = {
      id: Date.now(),
      type: 'success',
      title: 'AI Analytics Active',
      message: 'Real-time predictive insights are now available',
      duration: 5000
    };
    setNotifications([welcomeNotification]);
  }, []);

  const handleQuickAction = (action) => {
    if (action === 'create-shipment') {
      setActiveModal('shipment');
      return;
    }
    if (action === 'add-driver') {
      setActiveModal('driver');
      return;
    }

    const actionNotifications = {
      'generate-report': {
        type: 'success',
        title: 'Report Generation Started',
        message: 'Your analytics report is being prepared'
      },
      'export-data': {
        type: 'info',
        title: 'Data Export Initiated',
        message: 'Exporting analytics data in selected format'
      }
    };

    const notification = actionNotifications?.[action];
    if (notification) {
      setNotifications(prev => [...prev, {
        id: Date.now(),
        ...notification,
        duration: 4000
      }]);
    }
  };

  const handleApplyAction = (action) => {
    setSelectedAction(action);
    setActiveDrawer('apply');
  };

  const handleInsightClick = (insight) => {
    setSelectedInsight(insight);
    setActiveModal('insight');
  };

  const onConfirmApply = () => {
    setActiveDrawer(null);
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      title: 'Action Applied Successfully',
      message: `AI recommendation #${selectedAction.id} has been executed.`,
      duration: 5000
    }]);
  };

  const handleDismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <>
      <Helmet>
        <title>AI Insights Analytics - NexLogica</title>
        <meta name="description" content="Advanced predictive analytics and machine learning-powered recommendations for strategic logistics optimization and operational intelligence" />
      </Helmet>

      <RoleBasedNavigation userRole="admin" connectionStatus="connected" />

      <div className="min-h-screen bg-background pt-20 pb-8 px-4 md:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 md:mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">AI Insights & Analytics</h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Advanced predictive analytics powered by TensorFlow and machine learning algorithms
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Date Range Dropdown */}
              <div className="flex items-center gap-2 bg-surface border border-border rounded-xl px-4 py-2 hover:border-primary/50 transition-colors cursor-pointer group">
                <Icon name="Calendar" size={18} color="var(--color-primary)" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-transparent text-sm font-medium outline-none cursor-pointer appearance-none pr-8 relative z-10"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                  <option value="90days">Last 90 Days</option>
                </select>
                <div className="absolute right-3 pointer-events-none group-hover:translate-y-0.5 transition-transform">
                  <Icon name="ChevronDown" size={14} />
                </div>
              </div>

              {/* CSV Export */}
              <div className="flex items-center gap-2 bg-surface border border-border rounded-xl px-4 py-2 hover:border-secondary/50 transition-colors cursor-pointer relative group">
                <Icon name="Download" size={18} color="var(--color-secondary)" />
                <span className="text-sm font-medium">CSV Data</span>
                <div className="absolute top-full right-0 mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-20 flex flex-col p-2">
                  <button className="text-left px-3 py-2 hover:bg-muted rounded-lg text-sm" onClick={() => handleQuickAction('export-data')}>Insights Raw Data</button>
                  <button className="text-left px-3 py-2 hover:bg-muted rounded-lg text-sm" onClick={() => handleQuickAction('export-data')}>Prediction Logs</button>
                  <button className="text-left px-3 py-2 hover:bg-muted rounded-lg text-sm" onClick={() => handleQuickAction('export-data')}>Cost Calculations</button>
                </div>
              </div>

              <button
                onClick={() => handleQuickAction('generate-report')}
                className="px-4 md:px-6 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:shadow-glow-md transition-all duration-250 flex items-center gap-2"
              >
                <Icon name="FileText" size={18} />
                <span className="hidden sm:inline">Export Report</span>
              </button>
            </div>
          </div>

          {/* AI Metrics Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
            {/* ... Using existing HTML structure but wrapping in interactive div if needed ... */}
            <div className="bg-surface border border-border rounded-2xl p-4 md:p-6 group hover:scale-[1.02] transition-transform cursor-pointer" onClick={() => handleInsightClick({ title: 'ML Accuracy Detail', priority: 'High', confidence: '94.2%' })}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="Brain" size={24} color="var(--color-primary)" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-success">+12.5%</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-1">ML Accuracy</p>
              <p className="text-2xl md:text-3xl font-bold">94.2%</p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-4 md:p-6 group hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} color="var(--color-secondary)" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-success">+8.3%</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Predictions Made</p>
              <p className="text-2xl md:text-3xl font-bold">2,847</p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-4 md:p-6 group hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Icon name="Lightbulb" size={24} color="var(--color-accent)" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-primary">Active</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Smart Insights</p>
              <p className="text-2xl md:text-3xl font-bold">18</p>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-4 md:p-6 group hover:scale-[1.02] transition-transform cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-success/10 flex items-center justify-center">
                  <Icon name="Target" size={24} color="var(--color-success)" />
                </div>
                <span className="text-xs md:text-sm font-semibold text-success">+15.7%</span>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-1">Cost Savings</p>
              <p className="text-2xl md:text-3xl font-bold">₹2.4L</p>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <PredictiveDemandChart />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SmartRecommendations
                  onApplyAction={handleApplyAction}
                  onInsightClick={handleInsightClick}
                />
              </div>
              <div className="lg:col-span-1">
                <DelayProbabilityMeter />
              </div>
            </div>
            <ETAPredictionPanel />
            <PerformanceAnalytics />
          </div>

          <div className="mt-6 md:mt-8 bg-surface border border-border rounded-2xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Info" size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold mb-1">About AI Analytics</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Our AI-powered analytics engine uses TensorFlow and advanced machine learning algorithms to provide real-time predictive insights.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(prev => [...prev, {
                  id: Date.now() + Math.random(),
                  type: 'info',
                  title: 'AI Analytics Engine',
                  message: 'Powered by TensorFlow v2.14. Analyzes 50+ variables in real-time including traffic, weather, and historical patterns to predict outcomes with >94% accuracy.',
                  duration: 6000
                }])}
                className="px-4 md:px-6 py-2 bg-muted text-foreground rounded-xl text-sm md:text-base font-medium hover:bg-surface transition-all duration-250 flex-shrink-0 active:scale-95"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      <ApplyActionDrawer
        isOpen={activeDrawer === 'apply'}
        onClose={() => setActiveDrawer(null)}
        actionData={selectedAction}
        onConfirm={onConfirmApply}
      />

      <NewShipmentModal
        isOpen={activeModal === 'shipment'}
        onClose={() => setActiveModal(null)}
      />

      <AddDriverModal
        isOpen={activeModal === 'driver'}
        onClose={() => setActiveModal(null)}
      />

      <InsightDetailModal
        isOpen={activeModal === 'insight'}
        onClose={() => setActiveModal(null)}
        insight={selectedInsight}
      />

      <QuickActionButton userRole="admin" onAction={handleQuickAction} />
      <ToastNotification notifications={notifications} onDismiss={handleDismissNotification} />
    </>
  );
};

export default AIInsightsAnalytics;