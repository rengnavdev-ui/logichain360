import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssetDetailModal = ({ asset, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-border rounded-xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-6 border-b border-border bg-surface/95 backdrop-blur z-10 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                    <span className="text-xl font-bold text-primary">{asset?.symbol?.[0]}</span>
                </div>
                <div>
                    <h2 className="text-xl font-bold text-foreground">{asset?.name}</h2>
                    <p className="text-sm text-muted-foreground">{asset?.symbol} • <span className="text-green-400">Health Score: 98/100</span></p>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground">
                <Icon name="X" className="w-5 h-5" />
            </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-card rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total Balance</p>
                    <p className="text-2xl font-bold text-foreground">{asset?.amount} {asset?.symbol}</p>
                    <p className="text-sm text-muted-foreground mt-1">≈ ₹{asset?.inrValue}</p>
                </div>
                <div className="p-4 bg-card rounded-xl border border-border">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Available / Escrow</p>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-green-400">70%</span>
                        <span className="text-xs text-muted-foreground">/</span>
                        <span className="text-lg font-bold text-orange-400">30%</span>
                    </div>
                     <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden flex">
                        <div className="h-full bg-green-500 w-[70%]" />
                        <div className="h-full bg-orange-500 w-[30%]" />
                    </div>
                </div>
            </div>

            {/* Performance Chart Placeholder */}
            <div className="h-48 bg-muted/10 border border-border rounded-xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-50" />
                <div className="text-center z-10">
                   <Icon name="Activity" className="w-8 h-8 text-primary mx-auto mb-2 opacity-50" />
                   <p className="text-sm text-muted-foreground">Price History Chart (Mock)</p>
                   <p className="text-xs text-green-400 font-mono mt-1">+5.2% (24h)</p>
                </div>
            </div>

            {/* Recent Activity */}
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Recent Activity</h3>
                <div className="space-y-2">
                    {[1, 2, 3].map((_, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-card/50 border border-border rounded-lg hover:bg-card transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${idx === 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                                    <Icon name={idx === 0 ? 'ArrowDownLeft' : 'ArrowUpRight'} className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{idx === 0 ? 'Received' : 'Sent Payment'}</p>
                                    <p className="text-xs text-muted-foreground">Today, 10:30 AM</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-bold ${idx === 0 ? 'text-green-400' : 'text-foreground'}`}>
                                    {idx === 0 ? '+' : '-'}0.5 {asset?.symbol}
                                </p>
                                <p className="text-[10px] text-muted-foreground">Gas: 0.0004 ETH</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/5 flex gap-3">
            <Button className="flex-1 bg-primary text-primary-foreground">Trade / Swap</Button>
            <Button variant="outline" className="flex-1 border-border text-foreground hover:bg-white/5">View on Explorer</Button>
        </div>
      </div>
    </div>
  );
};

export default AssetDetailModal;
