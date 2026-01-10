import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';


import ToastNotification from '../../components/ui/ToastNotification';
import Icon from '../../components/AppIcon';
import SmartContractDashboard from './components/SmartContractDashboard';
import ShipmentVerificationPanel from './components/ShipmentVerificationPanel';
import TransactionTrackingPanel from './components/TransactionTrackingPanel';
import WalletIntegrationControls from './components/WalletIntegrationControls';
import SmartContractTemplates from './components/SmartContractTemplates';
import VerificationWorkflow from './components/VerificationWorkflow';
import AuditLogModal from './components/AuditLogModal';

const BlockchainVerificationCenter = () => {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('contracts');
  const [networkStatus, setNetworkStatus] = useState('connected');
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [auditLogs, setAuditLogs] = useState([
      { timestamp: '2025-01-28 09:30:00', type: 'System', action: 'Initialization', actor: 'System', details: 'Blockchain Verification Node Started', hash: '0x000...000' }
  ]);

  const userRole = localStorage.getItem('userRole') || 'manager';

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev?.filter(n => n?.id !== id));
    }, 5000);
  };

  const logAction = (type, action, details) => {
      const newLog = {
          timestamp: new Date().toLocaleString(),
          type,
          action,
          actor: walletAddress ? `${walletAddress.slice(0, 6)}...` : 'User',
          details,
          hash: '0x' + Math.random().toString(16).slice(2, 42) // Simulated Hash
      };
      setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleWalletConnect = (address) => {
    setWalletConnected(true);
    setWalletAddress(address);
    addNotification('Wallet connected successfully', 'success');
    logAction('System', 'Wallet Connected', `Connected to ${address}`);
  };

  const handleWalletDisconnect = () => {
    setWalletConnected(false);
    setWalletAddress('');
    addNotification('Wallet disconnected', 'info');
    logAction('System', 'Wallet Disconnected', 'User disconnected wallet');
  };

  const tabs = [
    { id: 'contracts', label: 'Smart Contracts', icon: 'FileCode' },
    { id: 'verification', label: 'Shipment Verification', icon: 'ShieldCheck' },
    { id: 'transactions', label: 'Transaction Tracking', icon: 'Activity' },
    { id: 'templates', label: 'Contract Templates', icon: 'FileText' },
    { id: 'workflow', label: 'Verification Workflow', icon: 'Workflow' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RoleBasedNavigation userRole={userRole} connectionStatus={networkStatus} />
      <div className="container mx-auto px-4 py-6 max-w-7xl pt-24">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-xl border border-primary/20">
                  <Icon name="Link" className="w-8 h-8 text-primary" />
                </div>
                Blockchain Verification Center
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Smart contract management and shipment verification through distributed ledger technology
              </p>
            </div>
            <div className="flex gap-3">
                 <button 
                    onClick={() => setShowAuditLog(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 text-secondary hover:bg-secondary/20 rounded-lg transition-colors"
                 >
                     <Icon name="Database" className="w-4 h-4" />
                     Audit Log
                 </button>
                <WalletIntegrationControls
                  walletConnected={walletConnected}
                  walletAddress={walletAddress}
                  onConnect={handleWalletConnect}
                  onDisconnect={handleWalletDisconnect}
                />
            </div>
          </div>
        </div>

        {/* Network Status Banner */}
        {networkStatus === 'connected' && walletConnected && (
          <div className="mb-8 bg-success/10 border border-success/20 rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm">
            <div className="p-1.5 bg-success/20 rounded-full animate-pulse">
                <Icon name="CheckCircle" className="w-5 h-5 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-success-foreground">Connected to Ethereum Mainnet</p>
              <p className="text-xs text-success/80 mt-1 font-mono">Wallet: {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</p>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-8 p-1 bg-surface border border-border rounded-xl inline-flex flex-wrap gap-1">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab?.id
                    ? 'bg-primary/20 text-primary shadow-[0_0_20px_rgba(14,165,233,0.3)] border border-primary/30'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon name={tab?.icon} className="w-4 h-4" />
                <span>{tab?.label}</span>
              </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="space-y-6 min-h-[500px]">
          {activeTab === 'contracts' && (
            <SmartContractDashboard
              walletConnected={walletConnected}
              onNotification={addNotification}
              logAction={logAction}
            />
          )}
          
          {activeTab === 'verification' && (
            <ShipmentVerificationPanel
              walletConnected={walletConnected}
              onNotification={addNotification}
              logAction={logAction}
            />
          )}
          
          {activeTab === 'transactions' && (
            <TransactionTrackingPanel
              walletConnected={walletConnected}
              walletAddress={walletAddress}
              onNotification={addNotification}
              logAction={logAction}
            />
          )}
          
          {activeTab === 'templates' && (
            <SmartContractTemplates
              walletConnected={walletConnected}
              onNotification={addNotification}
              logAction={logAction}
            />
          )}
          
          {activeTab === 'workflow' && (
            <VerificationWorkflow
              walletConnected={walletConnected}
              onNotification={addNotification}
              logAction={logAction}
            />
          )}
        </div>
      </div>
      
      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {notifications?.map((notification) => (
          <ToastNotification
            key={notification?.id}
            message={notification?.message}
            type={notification?.type}
            onClose={() => setNotifications(prev => prev?.filter(n => n?.id !== notification?.id))}
          />
        ))}
      </div>

       {showAuditLog && (
           <AuditLogModal logs={auditLogs} onClose={() => setShowAuditLog(false)} />
       )}
    </div>
  );
};

export default BlockchainVerificationCenter;