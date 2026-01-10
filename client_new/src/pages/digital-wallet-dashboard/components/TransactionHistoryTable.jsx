import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import TransactionDetailModal from './TransactionDetailModal';

const TransactionHistoryTable = ({ walletConnected, onNotification }) => {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTx, setSelectedTx] = useState(null);

  const [transactions] = useState([
    {
      id: 'TX-001',
      type: 'Payment',
      status: 'confirmed',
      amount: '0.5 ETH',
      inrAmount: '₹1,02,500',
      from: '0x742d...f0bEb',
      to: '0x8f3C...6A063',
      timestamp: '2025-01-28 10:30 AM',
      txHash: '0x1a2b3c4d5e6f7g8h9i0j',
      confirmations: 156,
      gasFee: '0.0021 ETH',
    },
    {
      id: 'TX-002',
      type: 'Escrow Release',
      status: 'confirmed',
      amount: '1.2 ETH',
      inrAmount: '₹2,46,000',
      from: 'Smart Contract',
      to: '0x742d...f0bEb',
      timestamp: '2025-01-28 09:15 AM',
      txHash: '0x9z8y7x6w5v4u3t2s1r0q',
      confirmations: 234,
      gasFee: '0.0032 ETH',
    },
    {
      id: 'TX-003',
      type: 'Staking Reward',
      status: 'confirmed',
      amount: '0.15 ETH',
      inrAmount: '₹30,750',
      from: 'Staking Pool',
      to: '0x742d...f0bEb',
      timestamp: '2025-01-27 18:45 PM',
      txHash: '0xabcdef1234567890abcd',
      confirmations: 456,
      gasFee: '0.0012 ETH',
    },
    {
      id: 'TX-004',
      type: 'Payment',
      status: 'pending',
      amount: '0.8 ETH',
      inrAmount: '₹1,64,000',
      from: '0x742d...f0bEb',
      to: '0x2791...84174',
      timestamp: '2025-01-28 11:20 AM',
      txHash: '0xfedcba0987654321fedc',
      confirmations: 12,
      gasFee: '0.0028 ETH',
    },
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'failed':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-white/10 text-gray-400 border-white/10';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Payment':
        return 'Send';
      case 'Escrow Release':
        return 'Unlock';
      case 'Staking Reward':
        return 'Gift';
      default:
        return 'Activity';
    }
  };

  const filteredTransactions = transactions.filter(tx => {
      const matchesType = filterType === 'all' || tx.type.toLowerCase().includes(filterType.toLowerCase());
      const matchesSearch = tx.txHash.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tx.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="bg-surface rounded-xl shadow-sm border border-border p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="relative">
                 <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                 <input 
                    type="text" 
                    placeholder="Search by Hash / ID" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/50"
                 />
             </div>
             <Select
               value={filterType}
               onChange={(e) => setFilterType(e.target.value)}
               className="bg-background border-border text-foreground w-full"
             >
               <option value="all">All Transactions</option>
               <option value="payment">Payments</option>
               <option value="escrow">Escrow</option>
               <option value="staking">Staking</option>
             </Select>
             <input 
                type="date" 
                className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
             />
          </div>
          <Button variant="outline" className="border-border text-foreground hover:bg-white/5">
            <Icon name="Download" className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-surface rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Icon name="Receipt" className="w-5 h-5 text-primary" />
            Transaction History
          </h2>
        </div>

        <div className="divide-y divide-border/50">
          {filteredTransactions?.map((tx) => (
            <div 
                key={tx?.id} 
                className="p-6 hover:bg-white/5 transition-colors cursor-pointer group"
                onClick={() => setSelectedTx(tx)}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                      <Icon name={getTypeIcon(tx?.type)} className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground">{tx?.type}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                          {tx?.timestamp}
                          <span className="w-1 h-1 rounded-full bg-border" />
                          <span className="font-mono">{tx?.id}</span>
                      </p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(tx?.status)}`}>
                      {tx?.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-4 pl-14">
                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="font-semibold text-foreground">{tx?.amount}</p>
                      <p className="text-[10px] text-muted-foreground">{tx?.inrAmount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">From → To</p>
                      <p className="font-mono text-xs text-foreground/80">{tx?.from.slice(0,6)}... → {tx?.to.slice(0,6)}...</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Gas Fee</p>
                      <p className="text-foreground">{tx?.gasFee}</p>
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground">Hash</p>
                        <p className="font-mono text-xs text-blue-400 hover:underline">{tx?.txHash.slice(0,10)}...</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center pl-14 lg:pl-0">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-white/10">
                    <Icon name="ExternalLink" className="w-4 h-4 mr-2" />
                    Verify
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTx && (
          <TransactionDetailModal transaction={selectedTx} onClose={() => setSelectedTx(null)} />
      )}
    </div>
  );
};

export default TransactionHistoryTable;