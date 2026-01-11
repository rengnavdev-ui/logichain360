import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import QuickActionButton from '../../components/ui/QuickActionButton';
import ToastNotification from '../../components/ui/ToastNotification';
import ActiveContractsTable from './components/ActiveContractsTable';
import ContractTemplateLibrary from './components/ContractTemplateLibrary';
import ContractCodeEditor from './components/ContractCodeEditor';
import DeploymentWizard from './components/DeploymentWizard';
import DisputeResolution from './components/DisputeResolution';
import ExecutionMonitor from './components/ExecutionMonitor';
import WalletConnection from './components/WalletConnection';
import Icon from '../../components/AppIcon';

const SmartContractManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    const welcomeNotification = {
      id: Date.now(),
      type: 'info',
      title: 'Smart Contracts Interface',
      message: 'Securely manage and deploy logistics contracts',
      duration: 5000
    };
    setNotifications([welcomeNotification]);
  }, []);

  const addNotification = (notif) => {
    setNotifications(prev => [...prev, { id: Date.now(), ...notif, duration: 4000 }]);
  };

  const tabs = [
    { id: 'active', label: 'Active Contracts', icon: 'FileText' },
    { id: 'library', label: 'Template Library', icon: 'Grid' },
    { id: 'editor', label: 'Code Editor', icon: 'Code' },
    { id: 'disputes', label: 'Dispute Resolution', icon: 'Gavel' },
    { id: 'monitor', label: 'Execution Monitor', icon: 'Activity' }
  ];

  return (
    <>
      <Helmet>
        <title>Smart Contract Management - NexLogica</title>
        <meta name="description" content="Automated logistics contract management with Solidity editor, template library, and decentralized dispute resolution center." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <RoleBasedNavigation userRole="manager" connectionStatus="connected" />

        <main className="pt-20 pb-24 px-4 md:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">Smart Contract Center</h1>
                <p className="text-sm md:text-base text-muted-foreground">Automated trust and transparency for global logistics</p>
              </div>

              <WalletConnection
                onConnect={() => {
                  setIsWalletConnected(true);
                  addNotification({ type: 'success', title: 'Wallet Connected', message: 'Ready for blockchain operations' });
                }}
                isConnected={isWalletConnected}
              />
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 md:mb-8 border-b border-border">
              {tabs?.map(tab => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap
                    ${activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground shadow-glow-sm'
                      : 'bg-surface border border-border text-muted-foreground hover:border-primary/50'}
                  `}
                >
                  <Icon name={tab?.icon} size={18} />
                  {tab?.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="space-y-6 md:space-y-8">
              {activeTab === 'active' && <ActiveContractsTable />}
              {activeTab === 'library' && <ContractTemplateLibrary onSelect={() => setActiveTab('editor')} />}
              {activeTab === 'editor' && <ContractCodeEditor isWalletConnected={isWalletConnected} />}
              {activeTab === 'disputes' && <DisputeResolution />}
              {activeTab === 'monitor' && <ExecutionMonitor />}
            </div>
          </div>
        </main>

        <QuickActionButton userRole="manager" onAction={(action) => addNotification({ type: 'info', title: 'Action Initiated', message: `Starting ${action}...` })} />
        <ToastNotification
          notifications={notifications}
          onDismiss={(id) => setNotifications(prev => prev?.filter(n => n?.id !== id))}
        />

        {isDeploying && <DeploymentWizard onClose={() => setIsDeploying(false)} />}
      </div>
    </>
  );
};

export default SmartContractManagement;
