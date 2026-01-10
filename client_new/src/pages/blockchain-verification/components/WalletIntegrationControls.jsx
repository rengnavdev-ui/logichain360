import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WalletIntegrationControls = ({ walletConnected, walletAddress, onConnect, onDisconnect }) => {
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleConnectMetaMask = () => {
    // Simulate MetaMask connection
    const mockAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
    onConnect(mockAddress);
    setShowWalletModal(false);
  };

  const handleConnectWalletConnect = () => {
    // Simulate WalletConnect connection
    const mockAddress = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';
    onConnect(mockAddress);
    setShowWalletModal(false);
  };

  if (walletConnected) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-green-900">
            {walletAddress?.slice(0, 6)}...{walletAddress?.slice(-4)}
          </span>
        </div>
        <Button
          onClick={onDisconnect}
          variant="outline"
          size="sm"
        >
          <Icon name="LogOut" className="w-4 h-4 mr-2" />
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowWalletModal(true)}
        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-sm"
        size="sm"
      >
        <Icon name="Wallet" className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>

      {/* Wallet Selection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-surface border border-border rounded-2xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">Connect Wallet</h3>
                <button
                  onClick={() => setShowWalletModal(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="X" className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-3">
              <button
                onClick={handleConnectMetaMask}
                className="w-full flex items-center gap-4 p-4 border border-border bg-card hover:bg-muted/50 rounded-xl transition-all hover:border-accent hover:shadow-[0_0_15px_rgba(249,115,22,0.15)] group"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Icon name="Wallet" className="w-6 h-6 text-accent" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">MetaMask</p>
                  <p className="text-sm text-muted-foreground">Connect using MetaMask wallet</p>
                </div>
                <Icon name="ChevronRight" className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              </button>

              <button
                onClick={handleConnectWalletConnect}
                className="w-full flex items-center gap-4 p-4 border border-border bg-card hover:bg-muted/50 rounded-xl transition-all hover:border-primary hover:shadow-[0_0_15px_rgba(14,165,233,0.15)] group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon name="Link" className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">WalletConnect</p>
                  <p className="text-sm text-muted-foreground">Scan with mobile wallet</p>
                </div>
                <Icon name="ChevronRight" className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
              </button>
            </div>

            <div className="p-6 bg-muted/30 border-t border-border rounded-b-2xl">
              <p className="text-xs text-muted-foreground text-center">
                By connecting your wallet, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletIntegrationControls;