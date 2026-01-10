import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionDetailModal = ({ transaction, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-border rounded-xl w-full max-w-2xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border bg-surface/95 backdrop-blur z-10 flex justify-between items-center">
            <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    Transaction Details
                    <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase border ${
                        transaction.status === 'confirmed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                        transaction.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                        'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                        {transaction.status}
                    </span>
                </h2>
                <p className="text-xs font-mono text-muted-foreground mt-1">{transaction.txHash}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground">
                <Icon name="X" className="w-5 h-5" />
            </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
            {/* Amount Hero */}
            <div className="text-center py-6 bg-card/30 rounded-xl border border-border/50">
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Total Value</p>
                <h1 className="text-4xl font-bold text-foreground mb-1">{transaction.amount}</h1>
                <p className="text-sm text-muted-foreground">{transaction.inrAmount}</p>
            </div>

            {/* Flow Visualization */}
            <div className="flex items-center justify-between p-4 bg-muted/10 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <Icon name="User" className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase">From</p>
                        <p className="text-sm font-mono text-foreground font-medium">{transaction.from ? `${transaction.from.slice(0,10)}...` : 'Unknown'}</p>
                    </div>
                </div>
                <div className="flex-1 border-t border-dashed border-border mx-4 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface p-1 rounded-full border border-border">
                        <Icon name="ArrowRight" className="w-3 h-3 text-muted-foreground" />
                    </div>
                </div>
                <div className="flex items-center gap-3 text-right">
                    <div>
                        <p className="text-xs text-muted-foreground uppercase">To</p>
                        <p className="text-sm font-mono text-foreground font-medium">{transaction.to ? `${transaction.to.slice(0,10)}...` : 'Unknown'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                        <Icon name="Box" className="w-5 h-5 text-purple-400" />
                    </div>
                </div>
            </div>

            {/* Technical Details */}
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-lg border border-border/50 hover:bg-muted/10 transition-colors">
                    <p className="text-muted-foreground text-xs mb-1">Block Number</p>
                    <p className="font-mono text-foreground">18,456,789</p>
                </div>
                <div className="p-3 rounded-lg border border-border/50 hover:bg-muted/10 transition-colors">
                    <p className="text-muted-foreground text-xs mb-1">Gas Used</p>
                    <p className="font-mono text-foreground">{transaction.gasFee || '0.0021 ETH'}</p>
                </div>
                <div className="p-3 rounded-lg border border-border/50 hover:bg-muted/10 transition-colors">
                    <p className="text-muted-foreground text-xs mb-1">Confirmations</p>
                    <p className="font-mono text-foreground">{transaction.confirmations || 1}</p>
                </div>
                <div className="p-3 rounded-lg border border-border/50 hover:bg-muted/10 transition-colors">
                    <p className="text-muted-foreground text-xs mb-1">Nonce</p>
                    <p className="font-mono text-foreground">42</p>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/5 flex justify-between items-center">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Icon name="CheckCircle" className="w-3 h-3 text-green-400" />
                Verified by Ethereum Mainnet
            </p>
             <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-white/5">
                <Icon name="ExternalLink" className="w-4 h-4 mr-2" />
                View on Etherscan
            </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailModal;
