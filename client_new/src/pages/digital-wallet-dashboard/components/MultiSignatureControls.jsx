import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MultiSignatureControls = ({ walletConnected, onNotification }) => {
  const [pendingTx, setPendingTx] = useState([
    {
      id: 'MS-001',
      proposal: 'Treasury Withdrawal',
      description: 'Transfer 50 ETH to Cold Storage',
      amount: '50 ETH',
      signers: [
         { name: 'Admin (You)', signed: false },
         { name: 'CFO', signed: true },
         { name: 'Security Lead', signed: true }
      ],
      required: 3,
      current: 2,
      deadline: '24h remaining',
      status: 'pending'
    },
    {
      id: 'MS-002',
      proposal: 'Contract Upgrade',
      description: 'Upgrade LogicContract V2',
      amount: '-',
      signers: [
         { name: 'Admin (You)', signed: false },
         { name: 'Lead Dev', signed: true },
         { name: 'Auditor', signed: false }
      ],
      required: 2,
      current: 1,
      deadline: '48h remaining',
      status: 'pending'
    }
  ]);

  const handleSign = (txId) => {
    if (!walletConnected) {
      onNotification('Please connect your wallet first', 'warning');
      return;
    }
    
    setPendingTx(prev => prev.map(tx => {
        if (tx.id === txId) {
             const updatedSigners = tx.signers.map(s => 
                 s.name.includes('You') ? { ...s, signed: true } : s
             );
             // Check if user already signed to prevent double signing in this mock
             const alreadySigned = tx.signers.find(s => s.name.includes('You')).signed;
             if(alreadySigned) {
                 onNotification('You have already signed this transaction', 'info');
                 return tx;
             }

             const newCurrent = tx.current + 1;
             onNotification(`Transaction ${txId} signed successfully`, 'success');
             return { 
                 ...tx, 
                 signers: updatedSigners, 
                 current: newCurrent,
                 status: newCurrent >= tx.required ? 'ready' : 'pending'
             };
        }
        return tx;
    }));
  };

  const handleExecute = (txId) => {
      onNotification(`Executing Transaction ${txId}...`, 'success');
      // Mock execution delay
      setTimeout(() => {
          setPendingTx(prev => prev.filter(tx => tx.id !== txId));
          onNotification(`Transaction ${txId} executed successfully`, 'success');
      }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface border border-border p-6 rounded-xl flex items-center justify-between">
              <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Active Proposals</p>
                  <p className="text-3xl font-bold text-foreground mt-2">{pendingTx.length}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                  <Icon name="FileText" className="w-6 h-6 text-primary" />
              </div>
          </div>
          <div className="bg-surface border border-border p-6 rounded-xl flex items-center justify-between">
              <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Action Required</p>
                  <p className="text-3xl font-bold text-orange-400 mt-2">
                      {pendingTx.filter(tx => !tx.signers.find(s => s.name.includes('You')).signed).length}
                  </p>
              </div>
              <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center border border-orange-500/20">
                  <Icon name="AlertCircle" className="w-6 h-6 text-orange-400" />
              </div>
          </div>
      </div>

      {/* Pending Transactions List */}
      <div className="space-y-4">
        {pendingTx.map((tx) => (
          <div key={tx.id} className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all group">
             <div className="p-6">
                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                     {/* Info */}
                     <div className="flex-1 space-y-2">
                         <div className="flex items-center gap-3">
                             <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold border border-border bg-muted/50 text-muted-foreground">
                                 {tx.id}
                             </span>
                             <h3 className="text-lg font-bold text-foreground">{tx.proposal}</h3>
                         </div>
                         <p className="text-sm text-muted-foreground">{tx.description}</p>
                     </div>

                     {/* Progress */}
                     <div className="flex-1 flex flex-col justify-center">
                         <div className="flex justify-between text-xs mb-2">
                             <span className="text-muted-foreground">Signatures Collected</span>
                             <span className={`font-bold ${tx.status === 'ready' ? 'text-green-400' : 'text-primary'}`}>
                                 {tx.current} / {tx.required}
                             </span>
                         </div>
                         <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                             <div 
                                className={`h-full transition-all duration-500 rounded-full ${tx.status === 'ready' ? 'bg-green-500' : 'bg-primary'}`} 
                                style={{ width: `${(tx.current / tx.required) * 100}%` }}
                             />
                         </div>
                         <div className="flex gap-1 mt-2">
                             {tx.signers.map((signer, idx) => (
                                 <div 
                                    key={idx} 
                                    className={`w-2 h-2 rounded-full ${signer.signed ? 'bg-green-500' : 'bg-muted border border-border'}`} 
                                    title={`${signer.name}: ${signer.signed ? 'Signed' : 'Pending'}`}
                                 />
                             ))}
                         </div>
                     </div>

                     {/* Actions */}
                     <div className="flex items-center gap-3">
                         {tx.status === 'ready' ? (
                             <Button onClick={() => handleExecute(tx.id)} className="bg-green-600 hover:bg-green-700 text-white min-w-[120px]">
                                 <Icon name="Check" className="w-4 h-4 mr-2" />
                                 Execute
                             </Button>
                         ) : (
                             <Button 
                                onClick={() => handleSign(tx.id)} 
                                disabled={tx.signers.find(s => s.name.includes('You')).signed || !walletConnected}
                                className={`min-w-[120px] ${
                                    tx.signers.find(s => s.name.includes('You')).signed 
                                    ? 'bg-muted/20 text-muted-foreground border-transparent'
                                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                                }`}
                             >
                                <Icon name="PenTool" className="w-4 h-4 mr-2" />
                                {tx.signers.find(s => s.name.includes('You')).signed ? 'Signed' : 'Sign Now'}
                             </Button>
                         )}
                     </div>
                 </div>
             </div>
             
             {/* Footer Info */}
             <div className="px-6 py-3 bg-white/5 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                 <span>Amount: {tx.amount}</span>
                 <span className="flex items-center gap-1">
                     <Icon name="Clock" className="w-3 h-3" />
                     {tx.deadline}
                 </span>
             </div>
          </div>
        ))}

        {pendingTx.length === 0 && (
            <div className="p-8 text-center text-muted-foreground bg-surface border border-border rounded-xl border-dashed">
                <Icon name="CheckCircle" className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>All transactions processed</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default MultiSignatureControls;