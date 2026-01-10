import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WalletConnection = ({ onConnect, onDisconnect, isConnected, address }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const walletProviders = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: 'Wallet',
      description: 'Connect using MetaMask browser extension',
      popular: true
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: 'Smartphone',
      description: 'Scan QR code with your mobile wallet',
      popular: true
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: 'CreditCard',
      description: 'Connect using Coinbase Wallet',
      popular: false
    },
    {
      id: 'trust',
      name: 'Trust Wallet',
      icon: 'Shield',
      description: 'Connect using Trust Wallet',
      popular: false
    }
  ];

  const handleConnect = (providerId) => {
    setIsConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      const mockAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
      onConnect(mockAddress);
      setIsConnecting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    onDisconnect();
  };

  if (isConnected) {
    return (
      <div className="relative">
        <Button
          variant="outline"
          size="default"
          onClick={() => setIsModalOpen(!isModalOpen)}
          className="flex items-center gap-2"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-mono text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
          <Icon name="ChevronDown" size={16} />
        </Button>

        {isModalOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
            <div className="p-4 border-b border-gray-200">
              <p className="text-xs text-gray-500 mb-1">Connected Wallet</p>
              <p className="font-mono text-sm text-gray-900 break-all">{address}</p>
            </div>
            <div className="p-2">
              <button
                onClick={handleDisconnect}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Icon name="LogOut" size={16} />
                Disconnect Wallet
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <Button
        variant="outline"
        iconName="Wallet"
        onClick={() => setIsModalOpen(true)}
      >
        Connect Wallet
      </Button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Connect Wallet</h3>
                <p className="text-sm text-gray-600 mt-1">Choose your preferred wallet provider</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            {/* Wallet Options */}
            <div className="p-6 space-y-3">
              {walletProviders?.map((provider) => (
                <button
                  key={provider?.id}
                  onClick={() => handleConnect(provider?.id)}
                  disabled={isConnecting}
                  className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <Icon name={provider?.icon} size={24} className="text-gray-700" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{provider?.name}</p>
                      {provider?.popular && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Popular</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{provider?.description}</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-gray-400" />
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-start gap-2">
                <Icon name="Info" size={16} className="text-blue-600 mt-0.5" />
                <p className="text-xs text-gray-600">
                  By connecting your wallet, you agree to our Terms of Service and Privacy Policy. 
                  Your wallet will be used to sign transactions on the blockchain.
                </p>
              </div>
            </div>

            {isConnecting && (
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                  <p className="text-sm text-gray-600">Connecting to wallet...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnection;