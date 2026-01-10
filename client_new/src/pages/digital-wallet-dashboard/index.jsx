import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import Button from '../../components/ui/Button';
import ToastNotification from '../../components/ui/ToastNotification';
import Icon from '../../components/AppIcon';
import WalletBalancePanel from './components/WalletBalancePanel';
import TransactionHistoryTable from './components/TransactionHistoryTable';
import PaymentProcessingInterface from './components/PaymentProcessingInterface';
import StakingRewardsPanel from './components/StakingRewardsPanel';
import MultiSignatureControls from './components/MultiSignatureControls';
import DeFiIntegration from './components/DeFiIntegration';

const DigitalWalletDashboard = () => {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('balance');

  const userRole = localStorage.getItem('userRole') || 'manager';

  useEffect(() => {
    // Simulate wallet connection check
    const savedWallet = localStorage.getItem('walletAddress');
    if (savedWallet) {
      setWalletConnected(true);
      setWalletAddress(savedWallet);
    }
  }, []);

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev?.filter(n => n?.id !== id));
    }, 5000);
  };

  const handleConnectWallet = () => {
    const mockAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
    setWalletConnected(true);
    setWalletAddress(mockAddress);
    localStorage.setItem('walletAddress', mockAddress);
    addNotification('Wallet connected successfully', 'success');
  };

  const tabs = [
    { id: 'balance', label: 'Wallet Balance', icon: 'Wallet' },
    { id: 'transactions', label: 'Transaction History', icon: 'Receipt' },
    { id: 'payments', label: 'Payment Processing', icon: 'CreditCard' },
    { id: 'staking', label: 'Staking Rewards', icon: 'TrendingUp' },
    { id: 'multisig', label: 'Multi-Signature', icon: 'Shield' },
    { id: 'defi', label: 'DeFi Integration', icon: 'Coins' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RoleBasedNavigation userRole={userRole} connectionStatus="connected" />
      <div className="container mx-auto px-4 py-6 max-w-7xl pt-24">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-xl border border-primary/20">
                  <Icon name="Wallet" className="w-8 h-8 text-primary" />
                </div>
                Digital Wallet Dashboard
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Secure cryptocurrency transactions and blockchain-based logistics payments
              </p>
            </div>
            {!walletConnected && (
              <Button onClick={handleConnectWallet} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-sm">
                <Icon name="Wallet" className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            )}
            
            {/* Wallet Status Banner - Moved here for better layout */}
            {walletConnected && (
                <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 flex items-center gap-3 backdrop-blur-sm">
                    <div className="p-1.5 bg-primary/20 rounded-full animate-pulse">
                        <Icon name="CheckCircle" className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-primary-foreground/80">Wallet Connected</p>
                        <p className="text-sm font-mono text-foreground font-bold">{walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}</p>
                    </div>
                </div>
            )}
          </div>
        </div>

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
          {activeTab === 'balance' && (
            <WalletBalancePanel
              walletConnected={walletConnected}
              walletAddress={walletAddress}
              onNotification={addNotification}
            />
          )}
          
          {activeTab === 'transactions' && (
            <TransactionHistoryTable
              walletConnected={walletConnected}
              onNotification={addNotification}
            />
          )}
          
          {activeTab === 'payments' && (
            <PaymentProcessingInterface
              walletConnected={walletConnected}
              onNotification={addNotification}
            />
          )}
          
          {activeTab === 'staking' && (
            <StakingRewardsPanel
              walletConnected={walletConnected}
              onNotification={addNotification}
            />
          )}
          
          {activeTab === 'multisig' && (
            <MultiSignatureControls
              walletConnected={walletConnected}
              onNotification={addNotification}
            />
          )}
          
          {activeTab === 'defi' && (
            <DeFiIntegration
              walletConnected={walletConnected}
              onNotification={addNotification}
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
    </div>
  );
};

export default DigitalWalletDashboard;