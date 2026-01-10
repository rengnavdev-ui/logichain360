import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ContractDetailModal from './ContractDetailModal';

const SmartContractDashboard = ({ walletConnected, onNotification, logAction }) => {
  const [selectedContract, setSelectedContract] = useState(null);
  const [contracts, setContracts] = useState([
    {
      id: 'SC-001',
      name: 'Mumbai-Delhi Logistics Agreement',
      status: 'active',
      deployedAt: '2025-01-15 10:30 AM',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      confirmations: 156,
      parties: ['Shipper: 0x1234...5678', 'Carrier: 0xabcd...ef01'],
      value: '2.5 ETH',
    },
    {
      id: 'SC-002',
      name: 'Bangalore-Chennai Delivery Contract',
      status: 'pending',
      deployedAt: '2025-01-20 14:15 PM',
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      confirmations: 45,
      parties: ['Shipper: 0x9876...4321', 'Carrier: 0xfedc...ba98'],
      value: '1.8 ETH',
    },
    {
      id: 'SC-003',
      name: 'Pune-Hyderabad Freight Agreement',
      status: 'completed',
      deployedAt: '2025-01-10 09:00 AM',
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      confirmations: 342,
      parties: ['Shipper: 0x5555...6666', 'Carrier: 0x7777...8888'],
      value: '3.2 ETH',
    },
     {
      id: 'SC-004',
      name: 'Kolkata-Ranchi Cold Chain',
      status: 'paused',
      deployedAt: '2025-01-25 11:20 AM',
      address: '0x5a4b3c2d1e0f9g8h7i6j5k4l3m2n1o0p',
      confirmations: 89,
      parties: ['Shipper: 0xaaaa...bbbb', 'Carrier: 0xcccc...dddd'],
      value: '4.0 ETH',
    },
  ]);

  const handleDeployContract = () => {
    if (!walletConnected) {
      onNotification('Please connect your wallet first', 'warning');
      return;
    }
    onNotification('Contract deployment initiated', 'success');
    logAction('Deployment', 'Contract Deployment Initiated', 'Standard Delivery Agreement');
  };

  const handleStatusChange = (id, newStatus) => {
      if (!walletConnected) {
          onNotification('Please connect wallet to perform actions', 'warning');
          return;
      }
      setContracts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
      onNotification(`Contract ${id} status updated to ${newStatus.toUpperCase()}`, 'info');
      logAction('System', 'Status Update', `Contract ${id} -> ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.2)]';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'completed':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'paused':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'archived':
          return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const renderContextButtons = (contract) => {
      return (
          <>
             {contract.status === 'active' && (
                 <Button onClick={() => handleStatusChange(contract.id, 'paused')} variant="outline" size="sm" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
                     <Icon name="Pause" className="w-4 h-4 mr-1" />
                     Pause
                 </Button>
             )}
             {contract.status === 'paused' && (
                 <Button onClick={() => handleStatusChange(contract.id, 'active')} variant="outline" size="sm" className="border-green-500/30 text-green-400 hover:bg-green-500/10">
                     <Icon name="Play" className="w-4 h-4 mr-1" />
                     Resume
                 </Button>
             )}
              {contract.status === 'pending' && (
                 <Button onClick={() => handleStatusChange(contract.id, 'active')} variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary/10">
                     <Icon name="Check" className="w-4 h-4 mr-1" />
                     Approve
                 </Button>
             )}
             {contract.status === 'completed' && (
                 <Button onClick={() => handleStatusChange(contract.id, 'archived')} variant="outline" size="sm" className="border-gray-500/30 text-gray-400 hover:bg-gray-500/10">
                     <Icon name="Archive" className="w-4 h-4 mr-1" />
                     Archive
                 </Button>
             )}
          </>
      );
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
            { label: 'Active Contracts', value: '12', icon: 'FileCode', color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' },
            { label: 'Total Deployed', value: '47', icon: 'Rocket', color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' },
            { label: 'Gas Saved', value: '0.45 ETH', icon: 'TrendingDown', color: 'text-secondary', bg: 'bg-secondary/10', border: 'border-secondary/20' },
            { label: 'Health Score', value: '98.5%', icon: 'Activity', color: 'text-accent', bg: 'bg-accent/10', border: 'border-accent/20' }
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

      {/* Contract List */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-lg backdrop-blur-sm">
        <div className="p-6 border-b border-border bg-card/50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Icon name="FileCode" className="w-5 h-5 text-primary" />
              Smart Contracts
            </h2>
            <Button
              onClick={handleDeployContract}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(14,165,233,0.4)] border-none"
              size="sm"
              disabled={!walletConnected}
            >
              <Icon name="Plus" className="w-4 h-4 mr-2" />
              Deploy New Contract
            </Button>
          </div>
        </div>

        <div className="divide-y divide-border/50">
          {contracts?.map((contract) => (
            <div key={contract?.id} className="p-6 hover:bg-white/5 transition-colors group">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer" onClick={() => setSelectedContract(contract)}>{contract?.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(contract.status)}`}>
                      {contract?.status}
                    </span>
                     {contract.status === 'paused' && (
                        <span className="text-[10px] text-orange-400 font-medium animate-pulse flex items-center gap-1">
                            <Icon name="AlertTriangle" className="w-3 h-3" />
                            Operations Suspended
                        </span>
                     )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 font-mono text-xs bg-black/20 px-2 py-1 rounded w-fit">
                      <Icon name="Hash" className="w-3 h-3 text-secondary" />
                      <span>{contract?.address?.slice(0, 10)}...{contract?.address?.slice(-8)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" className="w-3 h-3" />
                      <span>{contract?.deployedAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="CheckCircle" className="w-3 h-3 text-success" />
                      <span>{contract?.confirmations} confirmations</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Icon name="DollarSign" className="w-3 h-3 text-accent" />
                       <span className="font-semibold text-foreground">{contract?.value}</span>
                    </div>
                    {/* Health Score Indicator (New) */}
                    <div className="flex items-center gap-2" title="Contract Health Score">
                        <Icon name="Activity" className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400 font-medium">Risk: Low (98/100)</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                     {contract?.parties?.map((party, idx) => (
                         <span key={idx} className="text-[10px] bg-muted px-2 py-0.5 rounded text-muted-foreground border border-border/50">
                             {party}
                         </span>
                     ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  {renderContextButtons(contract)}
                  <Button variant="outline" size="sm" onClick={() => setSelectedContract(contract)} className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary/60">
                    <Icon name="Eye" className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

       <ContractDetailModal 
          contract={selectedContract} 
          onClose={() => setSelectedContract(null)} 
          onAction={handleStatusChange}
       />
    </div>
  );
};

export default SmartContractDashboard;