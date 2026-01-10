import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AssetDetailModal from './AssetDetailModal';

const WalletBalancePanel = ({ walletConnected, walletAddress, onNotification }) => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [balances] = useState([
    { symbol: 'ETH', name: 'Ethereum', amount: '2.45', usdValue: '6,00,250', inrValue: '4,98,20,750', change: '+5.2%', changePositive: true },
    { symbol: 'MATIC', name: 'Polygon', amount: '1,250', usdValue: '1,125', inrValue: '93,375', change: '+2.8%', changePositive: true },
    { symbol: 'USDT', name: 'Tether', amount: '5,000', usdValue: '5,000', inrValue: '4,15,000', change: '0.0%', changePositive: true },
    { symbol: 'USDC', name: 'USD Coin', amount: '3,200', usdValue: '3,200', inrValue: '2,65,600', change: '+0.1%', changePositive: true },
  ]);

  const totalInr = balances?.reduce((sum, b) => sum + parseFloat(b?.inrValue?.replace(/,/g, '')), 0);
  const escrowLockedPercentage = 30; 
  const displayTotal = (totalInr / 10000000).toFixed(2);

  const handleQuickAction = (action) => {
    if (!walletConnected) {
      onNotification('Please connect your wallet first', 'warning');
      return;
    }
    onNotification(`${action} initiated`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Balance Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Icon name="Wallet" className="w-32 h-32 text-primary" />
            </div>
            
            <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                    <h3 className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-1">Total Portfolio Value</h3>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground">₹{displayTotal}Cr</h1>
                    <p className="text-muted-foreground mt-2 flex items-center gap-2">
                        <span className="text-green-400 flex items-center text-sm font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                            <Icon name="ArrowUpRight" className="w-3 h-3 mr-1" />
                            +5.2%
                        </span>
                        <span className="text-sm">vs last month</span>
                    </p>
                </div>
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                     <div className="p-3 bg-surface/50 backdrop-blur border border-white/10 rounded-xl">
                        <p className="text-xs text-muted-foreground uppercase mb-1">Available Funds</p>
                        <p className="text-lg font-bold text-foreground">₹{((totalInr * (100 - escrowLockedPercentage) / 100) / 10000000).toFixed(2)}Cr</p>
                     </div>
                     <div className="p-3 bg-surface/50 backdrop-blur border border-white/10 rounded-xl">
                        <div className="flex items-center justify-between mb-1">
                            <p className="text-xs text-muted-foreground uppercase">Escrow Locked</p>
                            <Icon name="Lock" className="w-3 h-3 text-orange-400" />
                        </div>
                        <p className="text-lg font-bold text-foreground">₹{((totalInr * escrowLockedPercentage / 100) / 10000000).toFixed(2)}Cr</p>
                     </div>
                </div>
            </div>
          </div>

          {/* Quick Actions & Health */}
          <div className="space-y-6">
             {/* Health Score */}
             <div className="bg-surface border border-border rounded-2xl p-5">
                 <div className="flex items-center justify-between mb-2">
                     <h3 className="text-sm font-semibold text-foreground">Portfolio Health</h3>
                     <Icon name="Activity" className="w-4 h-4 text-green-400" />
                 </div>
                 <div className="flex items-end gap-2 mb-2">
                     <span className="text-3xl font-bold text-green-400">92</span>
                     <span className="text-sm text-muted-foreground mb-1">/ 100</span>
                 </div>
                 <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                     <div className="h-full bg-green-400 w-[92%]" />
                 </div>
                 <p className="text-xs text-muted-foreground mt-3">
                     Excellent diversification & low volatility exposure.
                 </p>
             </div>

             {/* Actions */}
             <div className="grid grid-cols-3 gap-3">
                <Button onClick={() => handleQuickAction('Send')} variant="outline" className="flex-col h-auto py-3 border-border hover:bg-white/5 hover:border-primary/50 text-foreground group">
                    <div className="p-2 bg-primary/10 rounded-full mb-2 group-hover:bg-primary/20 transition-colors">
                        <Icon name="Send" className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-xs">Send</span>
                </Button>
                <Button onClick={() => handleQuickAction('Receive')} variant="outline" className="flex-col h-auto py-3 border-border hover:bg-white/5 hover:border-primary/50 text-foreground group">
                    <div className="p-2 bg-secondary/10 rounded-full mb-2 group-hover:bg-secondary/20 transition-colors">
                        <Icon name="Download" className="w-4 h-4 text-secondary" />
                    </div>
                     <span className="text-xs">Receive</span>
                </Button>
                <Button onClick={() => handleQuickAction('Swap')} variant="outline" className="flex-col h-auto py-3 border-border hover:bg-white/5 hover:border-primary/50 text-foreground group">
                    <div className="p-2 bg-accent/10 rounded-full mb-2 group-hover:bg-accent/20 transition-colors">
                        <Icon name="ArrowRightLeft" className="w-4 h-4 text-accent" />
                    </div>
                     <span className="text-xs">Swap</span>
                </Button>
             </div>
          </div>
      </div>

      {/* Individual Balances */}
      <div className="bg-surface rounded-2xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Icon name="Coins" className="w-5 h-5 text-primary" />
            Asset Allocation
          </h2>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">View Analytics</Button>
        </div>

        <div className="divide-y divide-border/50">
          {balances?.map((balance) => (
            <div 
                key={balance?.symbol} 
                className="p-4 hover:bg-white/5 transition-colors cursor-pointer group"
                onClick={() => setSelectedAsset(balance)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center border border-white/5 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all">
                    <span className="text-foreground font-bold group-hover:text-primary">{balance?.symbol?.[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{balance?.name}</h3>
                    <p className="text-xs text-muted-foreground">{balance?.symbol}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-base font-bold text-foreground">{balance?.amount} {balance?.symbol}</p>
                  <div className="flex items-center justify-end gap-2">
                      <p className="text-xs text-muted-foreground">₹{balance?.inrValue}</p>
                      <span className={`text-[10px] font-bold px-1.5 rounded ${
                        balance?.changePositive ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
                      }`}>
                        {balance?.change}
                      </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Real-time Price Feed */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'ETH/USD', value: '$2,450.20', change: '+5.2%', positive: true },
            { label: 'MATIC/USD', value: '$0.90', change: '+2.8%', positive: true },
            { label: 'USD/INR', value: '₹83.00', change: '-0.1%', positive: false },
            { label: 'Gas Price', value: '25 Gwei', change: 'Normal', positive: true, icon: 'Fuel' }
          ].map((item, idx) => (
               <div key={idx} className="bg-surface/50 border border-border rounded-xl p-4 hover:bg-surface transition-all">
                    <p className="text-xs text-muted-foreground mb-1 flex items-center justify-between">
                        {item.label}
                        {item.icon && <Icon name={item.icon} className="w-3 h-3 text-muted-foreground" />}
                    </p>
                    <p className="text-lg font-bold text-foreground">{item.value}</p>
                    <p className={`text-xs font-medium ${item.positive ? 'text-green-400' : 'text-red-400'}`}>
                        {item.change}
                    </p>
               </div>
          ))}
      </div>

       {selectedAsset && (
           <AssetDetailModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
       )}
    </div>
  );
};

export default WalletBalancePanel;