import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionTrackingPanel = ({ walletConnected, walletAddress, onNotification }) => {
  const [transactions, setTransactions] = useState([
    {
      id: 'TX-001',
      hash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
      type: 'Contract Deployment',
      status: 'confirmed',
      timestamp: '2025-01-28 10:30 AM',
      blockNumber: 18456789,
      gasUsed: '0.0045 ETH',
      gasFee: '₹450',
      confirmations: 156,
      from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      to: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    },
    {
      id: 'TX-002',
      hash: '0x9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a',
      type: 'Payment Release',
      status: 'pending',
      timestamp: '2025-01-28 11:45 AM',
      blockNumber: 18456812,
      gasUsed: '0.0032 ETH',
      gasFee: '₹320',
      confirmations: 12,
      from: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      to: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    },
     {
      id: 'TX-003',
      hash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcd',
      type: 'Verification Signature',
      status: 'failed',
      timestamp: '2025-01-28 09:15 AM',
      blockNumber: 18456745,
      gasUsed: '0.0021 ETH',
      gasFee: '₹210',
      confirmations: 0,
      from: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      to: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      error: 'Out of Gas'
    },
  ]);

  const [networkStats, setNetworkStats] = useState({
    gasPrice: '25 Gwei',
    blockTime: '12.5s',
    networkLoad: 'Medium',
    ethPrice: '₹2,45,000',
  });

  // Simulator Effect
  useEffect(() => {
      const interval = setInterval(() => {
          // Update confirmations for confirmed/pending transactions
          setTransactions(prev => prev.map(tx => {
              if (tx.status === 'confirmed' || tx.status === 'pending') {
                  const newConfirmations = tx.confirmations + 1;
                  // Auto-confirm pending after 20 confirmations
                  const newStatus = (tx.status === 'pending' && newConfirmations > 20) ? 'confirmed' : tx.status;
                  return { ...tx, confirmations: newConfirmations, status: newStatus };
              }
              return tx;
          }));

          // Mock Network Stats Fluctuation
          setNetworkStats(prev => ({
              ...prev,
              gasPrice: `${Math.floor(20 + Math.random() * 10)} Gwei`,
              ethPrice: `₹${(245000 + (Math.random() - 0.5) * 500).toLocaleString()}`
          }));

      }, 3000); // Update every 3 seconds

      return () => clearInterval(interval);
  }, []);


  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 animate-pulse';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Contract Deployment':
        return 'Rocket';
      case 'Payment Release':
        return 'DollarSign';
      case 'Verification Signature':
        return 'CheckCircle';
      default:
        return 'Activity';
    }
  };

  return (
    <div className="space-y-6">
      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
            { label: 'Gas Price', value: networkStats?.gasPrice, icon: 'Fuel', color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' },
            { label: 'Block Time', value: networkStats?.blockTime, icon: 'Clock', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
            { label: 'Network Load', value: networkStats?.networkLoad, icon: 'Activity', color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' },
            { label: 'ETH Price', value: networkStats?.ethPrice, icon: 'TrendingUp', color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' }
        ].map((stat, idx) => (
            <div key={idx} className={`bg-surface/50 backdrop-blur-md border ${stat.border} rounded-2xl p-5 hover:bg-surface/80 transition-all duration-300 group`}>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground mt-1 group-hover:scale-105 transition-transform origin-left">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.bg}`}>
                        <Icon name={stat.icon} className={`w-6 h-6 ${stat.color}`} />
                    </div>
                </div>
            </div>
        ))}
      </div>

      {/* Transaction List */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm">
        <div className="p-6 border-b border-border bg-card/50">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Icon name="Activity" className="w-5 h-5 text-warning" />
            Transaction History
          </h2>
        </div>

        <div className="divide-y divide-border/50">
          {transactions?.map((tx) => (
            <div key={tx?.id} className="p-6 hover:bg-white/5 transition-colors group">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-muted/50 rounded-lg">
                        <Icon name={getTypeIcon(tx?.type)} className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{tx?.type}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        tx.status === 'confirmed' ? 'bg-success/10 text-success border-success/20' :
                        tx.status === 'pending' ? 'bg-warning/10 text-warning border-warning/20' :
                        'bg-destructive/10 text-destructive border-destructive/20'
                    }`}>
                      {tx?.status}
                    </span>
                    {tx.status === 'failed' && (
                        <span className="text-xs text-destructive font-medium flex items-center gap-1">
                            <Icon name="AlertCircle" className="w-3 h-3" />
                            {tx.error}
                        </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6 text-sm">
                    <div className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors">
                      <Icon name="Hash" className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Transaction Hash</p>
                        <div className="flex items-center gap-2">
                            <p className="font-mono text-xs text-foreground/80">{tx?.hash?.slice(0, 15)}...{tx?.hash?.slice(-10)}</p>
                            <button className="text-primary hover:text-primary/80"><Icon name="Copy" className="w-3 h-3" /></button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors">
                      <Icon name="Layers" className="w-4 h-4 text-secondary mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Block Number</p>
                        <p className="font-mono text-sm text-foreground">{tx?.blockNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors">
                      <Icon name="Clock" className="w-4 h-4 text-accent mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Timestamp</p>
                        <p className="text-sm text-foreground">{tx?.timestamp}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors">
                      <Icon name="Fuel" className="w-4 h-4 text-warning/80 mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Gas Used</p>
                        <p className="text-foreground">{tx?.gasUsed} <span className="text-muted-foreground text-xs">({tx?.gasFee})</span></p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors">
                      <Icon name="CheckCircle" className="w-4 h-4 text-success mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Confirmations</p>
                        <p className="font-semibold text-foreground">{tx?.confirmations}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2 rounded hover:bg-muted/30 transition-colors">
                      <Icon name="ArrowRightLeft" className="w-4 h-4 text-primary mt-0.5" />
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">From → To</p>
                        <p className="font-mono text-xs text-foreground/80 break-all">
                          {tx?.from?.slice(0, 6)}...{tx?.from?.slice(-4)} → {tx?.to?.slice(0, 6)}...{tx?.to?.slice(-4)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Diagnostics for Failed Transactions */}
                  {tx.status === 'failed' && (
                      <div className="mt-3 bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm flex gap-3 items-start animate-in fade-in">
                          <Icon name="AlertTriangle" className="w-4 h-4 text-destructive mt-0.5" />
                          <div className="flex-1">
                              <p className="font-semibold text-destructive">Transaction Failed: {tx.error}</p>
                              <p className="text-muted-foreground text-xs mt-1">Try increasing gas limit or checking contract allowance.</p>
                          </div>
                          <Button size="sm" variant="outline" className="border-destructive/30 text-destructive hover:bg-destructive/10 h-8">
                              Retry
                          </Button>
                      </div>
                  )}
                </div>

                <div className="flex flex-col gap-2 min-w-[140px]">
                  <Button variant="outline" size="sm" className="w-full justify-start border-border hover:bg-primary/10 hover:text-primary hover:border-primary/50">
                    <Icon name="ExternalLink" className="w-4 h-4 mr-2" />
                    Etherscan
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start border-border hover:bg-muted text-muted-foreground hover:text-foreground">
                    <Icon name="Copy" className="w-4 h-4 mr-2" />
                    Copy Hash
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionTrackingPanel;