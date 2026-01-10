import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContractDetailModal = ({ contract, onClose, onAction }) => {
  if (!contract) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'paused': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'archived': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-surface/95 backdrop-blur z-10">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
              <Icon name="FileCode" className="w-6 h-6 text-primary" />
              {contract.name}
            </h2>
            <div className="flex items-center gap-3 mt-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(contract.status)}`}>
                    {contract.status}
                </span>
                <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                    <Icon name="Globe" className="w-3 h-3" />
                    Ethereum Mainnet
                </span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground">
            <Icon name="X" className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
            {/* Key Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/20 rounded-xl border border-border/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Contract Hash</p>
                    <p className="font-mono text-sm text-foreground break-all">{contract.address}</p>
                </div>
                <div className="p-4 bg-muted/20 rounded-xl border border-border/50">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Block Number</p>
                    <p className="font-mono text-sm text-foreground flex items-center gap-2">
                        <Icon name="Layers" className="w-3 h-3 text-secondary" />
                        18,456,789
                    </p>
                </div>
            </div>

            {/* Financial Terms */}
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Icon name="DollarSign" className="w-4 h-4 text-accent" />
                    Financial Terms
                </h3>
                <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Contract Value</span>
                        <span className="font-bold text-foreground">{contract.value}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Escrow Status</span>
                        <span className="text-green-400 font-medium">Locked</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Penalty Clause</span>
                        <span className="text-red-400 font-medium">5% per day delay</span>
                    </div>
                </div>
            </div>

             {/* Parties */}
             <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Icon name="Users" className="w-4 h-4 text-purple-400" />
                    Involved Parties
                </h3>
                <div className="space-y-2">
                    {contract.parties?.map((party, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-muted/10">
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${idx === 0 ? 'bg-blue-500/20 text-blue-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                <Icon name={idx === 0 ? 'Truck' : 'Package'} className="w-4 h-4" />
                             </div>
                             <div>
                                <p className="text-sm font-medium text-foreground">{party.split(':')[0]}</p>
                                <p className="text-xs text-muted-foreground font-mono">{party.split(':')[1]}</p>
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Timeline */}
            <div>
                <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Icon name="Clock" className="w-4 h-4 text-primary" />
                    State Transition Timeline
                </h3>
                <div className="relative pl-4 border-l-2 border-border space-y-6">
                    <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20"></div>
                        <p className="text-sm font-medium text-foreground">Active</p>
                        <p className="text-xs text-muted-foreground">Current State • {contract.deployedAt}</p>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-muted border-2 border-border"></div>
                        <p className="text-sm font-medium text-muted-foreground">Pending Deployment</p>
                        <p className="text-xs text-muted-foreground">Verified by Admin</p>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-muted border-2 border-border"></div>
                        <p className="text-sm font-medium text-muted-foreground">Draft Created</p>
                        <p className="text-xs text-muted-foreground">Initial version</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/5 flex justify-between items-center sticky bottom-0">
            <Button variant="outline" className="border-border text-muted-foreground hover:text-foreground" onClick={onClose}>
                Close
            </Button>
             <Button variant="default" className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20">
                <Icon name="Download" className="w-4 h-4 mr-2" />
                Download Audit Log
            </Button>
        </div>
      </div>
    </div>
  );
};

export default ContractDetailModal;
