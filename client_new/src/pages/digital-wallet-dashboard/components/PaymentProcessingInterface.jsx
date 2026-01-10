import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PaymentProcessingInterface = ({ walletConnected, onNotification }) => {
  const [activeMode, setActiveMode] = useState('send'); // send, receive, swap
  const [paymentForm, setPaymentForm] = useState({
    shipmentId: '',
    amount: '',
    currency: 'ETH',
    recipient: '',
    purpose: 'Vendor Payment',
    note: ''
  });
  
  const [simulation, setSimulation] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const [escrowPayments] = useState([
    {
      id: 'ESC-001',
      shipmentId: 'SHP-1001',
      amount: '2.5 ETH',
      status: 'locked',
      releaseCondition: 'Delivery Confirmation',
      parties: ['Shipper', 'Carrier', 'Receiver'],
    },
    {
      id: 'ESC-002',
      shipmentId: 'SHP-1002',
      amount: '1.8 ETH',
      status: 'pending',
      releaseCondition: 'Multi-Party Approval',
      parties: ['Shipper', 'Carrier'],
    },
  ]);

  const handleSimulate = () => {
     if (!paymentForm.amount || !paymentForm.recipient) {
         onNotification('Please enter amount and recipient to simulate', 'warning');
         return;
     }
     setIsSimulating(true);
     setTimeout(() => {
         setIsSimulating(false);
         setSimulation({
             gasLimit: '21000',
             gasPrice: '25 Gwei',
             estimatedFee: '0.000525 ETH',
             time: '~15 sec',
             risk: 'Low',
             tax: '0.00 (Tax Free Zone)'
         });
     }, 1000);
  };

  const handleSendPayment = () => {
    if (!walletConnected) {
      onNotification('Please connect your wallet first', 'warning');
      return;
    }
    if (!paymentForm?.amount || !paymentForm?.recipient) {
      onNotification('Please fill all required fields', 'warning');
      return;
    }
    onNotification('Payment initiated successfully', 'success');
    setPaymentForm({ ...paymentForm, amount: '', recipient: '' });
    setSimulation(null);
  };

  const handleReleaseEscrow = (escrowId) => {
    if (!walletConnected) {
        onNotification('Please connect your wallet first', 'warning');
        return;
    }
    onNotification(`Escrow ${escrowId} release initiated`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Action Panel */}
          <div className="lg:col-span-2 space-y-6">
              <div className="bg-surface border border-border rounded-xl overflow-hidden">
                  {/* Internal Navigation */}
                  <div className="flex border-b border-border">
                      {['send', 'receive', 'swap'].map(mode => (
                          <button
                            key={mode}
                            onClick={() => setActiveMode(mode)}
                            className={`flex-1 py-4 text-sm font-medium transition-all ${
                                activeMode === mode 
                                ? 'bg-primary/10 text-primary border-b-2 border-primary' 
                                : 'text-muted-foreground hover:bg-white/5'
                            }`}
                          >
                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                          </button>
                      ))}
                  </div>

                  <div className="p-6">
                      {activeMode === 'send' && (
                          <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <Select
                                    label="Currency"
                                    value={paymentForm.currency}
                                    onChange={(e) => setPaymentForm({ ...paymentForm, currency: e.target.value })}
                                    className="bg-background border-border text-foreground"
                                >
                                    <option value="ETH">Ethereum (ETH)</option>
                                    <option value="MATIC">Polygon (MATIC)</option>
                                    <option value="USDT">Tether (USDT)</option>
                                </Select>
                                <Input
                                    label="Amount"
                                    type="number"
                                    placeholder="0.00"
                                    value={paymentForm.amount}
                                    onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                                    className="bg-background border-border text-foreground"
                                />
                              </div>
                              <Input
                                label="Recipient Address"
                                placeholder="0x..."
                                value={paymentForm.recipient}
                                onChange={(e) => setPaymentForm({ ...paymentForm, recipient: e.target.value })}
                                className="bg-background border-border text-foreground"
                              />
                              <div className="grid grid-cols-2 gap-4">
                                  <Select
                                    label="Purpose"
                                    value={paymentForm.purpose}
                                    onChange={(e) => setPaymentForm({ ...paymentForm, purpose: e.target.value })}
                                    className="bg-background border-border text-foreground"
                                  >
                                      <option>Vendor Payment</option>
                                      <option>Escrow Funding</option>
                                      <option>Refund</option>
                                      <option>Payroll</option>
                                  </Select>
                                  <Input
                                    label="Shipment ID (Optional)"
                                    placeholder="SHP-1001"
                                    value={paymentForm.shipmentId}
                                    onChange={(e) => setPaymentForm({ ...paymentForm, shipmentId: e.target.value })}
                                    className="bg-background border-border text-foreground"
                                  />
                              </div>

                              {simulation && (
                                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg animate-in fade-in slide-in-from-top-2">
                                      <h4 className="text-sm font-semibold text-primary mb-2 flex items-center gap-2">
                                          <Icon name="Activity" className="w-4 h-4" />
                                          Simulation Results
                                      </h4>
                                      <div className="grid grid-cols-3 gap-2 text-xs">
                                          <div>
                                              <span className="text-muted-foreground">Est. Fee:</span>
                                              <span className="ml-1 font-mono text-foreground">{simulation.estimatedFee}</span>
                                          </div>
                                          <div>
                                              <span className="text-muted-foreground">Time:</span>
                                              <span className="ml-1 font-mono text-foreground">{simulation.time}</span>
                                          </div>
                                          <div>
                                              <span className="text-muted-foreground">Risk:</span>
                                              <span className="ml-1 font-bold text-green-400">{simulation.risk}</span>
                                          </div>
                                      </div>
                                  </div>
                              )}

                              <div className="flex gap-3 mt-6">
                                <Button 
                                    onClick={handleSendPayment} 
                                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                                    disabled={!walletConnected}
                                >
                                    Send Now
                                </Button>
                                <Button 
                                    onClick={handleSimulate}
                                    variant="outline" 
                                    className="flex-1 border-border text-foreground hover:bg-white/5"
                                    disabled={isSimulating}
                                >
                                    {isSimulating ? 'Simulating...' : 'Simulate Transaction'}
                                </Button>
                              </div>
                          </div>
                      )}

                      {activeMode === 'receive' && (
                          <div className="flex flex-col items-center justify-center space-y-6 py-8">
                               <div className="w-64 h-64 bg-white p-4 rounded-xl flex items-center justify-center shadow-lg">
                                   {/* Placeholder for QR Code */}
                                   <div className="w-full h-full bg-black pattern-grid-lg opacity-10" />
                                   <Icon name="Maximize" className="w-12 h-12 text-black absolute opacity-20" />
                                   <p className="absolute text-xs text-black font-mono font-bold">0x742...bEb</p>
                               </div>
                               <div className="text-center w-full max-w-sm">
                                   <p className="text-sm text-muted-foreground mb-2">Wallet Address</p>
                                   <div className="flex items-center gap-2 p-3 bg-background border border-border rounded-lg">
                                       <span className="text-xs font-mono text-foreground truncate flex-1">0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb</span>
                                       <button className="text-primary hover:text-primary/80" onClick={() => onNotification('Address copied', 'success')}>
                                           <Icon name="Copy" className="w-4 h-4" />
                                       </button>
                                   </div>
                               </div>
                          </div>
                      )}

                      {activeMode === 'swap' && (
                          <div className="space-y-6">
                              <div className="p-4 bg-background border border-border rounded-xl">
                                  <div className="flex justify-between mb-2">
                                      <label className="text-xs text-muted-foreground">From</label>
                                      <span className="text-xs text-primary font-medium">Balance: 2.45 ETH</span>
                                  </div>
                                  <div className="flex gap-4">
                                      <input type="number" placeholder="0.0" className="bg-transparent text-2xl font-bold text-foreground outline-none w-full" />
                                      <div className="flex items-center gap-2 bg-surface border border-border px-3 py-1 rounded-full">
                                          <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
                                          <span className="font-bold text-foreground">ETH</span>
                                          <Icon name="ChevronDown" className="w-4 h-4 text-muted-foreground" />
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="flex justify-center -my-3 relative z-10">
                                  <button className="p-2 bg-surface border border-border rounded-full hover:bg-white/10 transition-colors">
                                      <Icon name="ArrowDown" className="w-4 h-4 text-muted-foreground" />
                                  </button>
                              </div>

                              <div className="p-4 bg-background border border-border rounded-xl">
                                  <div className="flex justify-between mb-2">
                                      <label className="text-xs text-muted-foreground">To</label>
                                      <span className="text-xs text-muted-foreground">Est. Output</span>
                                  </div>
                                  <div className="flex gap-4">
                                      <input type="number" placeholder="0.0" className="bg-transparent text-2xl font-bold text-foreground outline-none w-full" readOnly />
                                      <div className="flex items-center gap-2 bg-surface border border-border px-3 py-1 rounded-full">
                                          <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                                          <span className="font-bold text-foreground">USDC</span>
                                          <Icon name="ChevronDown" className="w-4 h-4 text-muted-foreground" />
                                      </div>
                                  </div>
                              </div>

                              <div className="p-3 bg-muted/10 rounded-lg space-y-2 text-xs">
                                  <div className="flex justify-between">
                                      <span className="text-muted-foreground">Rate</span>
                                      <span className="text-foreground">1 ETH ≈ 2,450.20 USDC</span>
                                  </div>
                                  <div className="flex justify-between">
                                      <span className="text-muted-foreground">Slippage Tolerance</span>
                                      <span className="text-foreground">0.5%</span>
                                  </div>
                                  <div className="flex justify-between">
                                      <span className="text-muted-foreground">Network Fee</span>
                                      <span className="text-foreground">~$4.50</span>
                                  </div>
                              </div>

                              <Button className="w-full bg-primary text-primary-foreground">Review Swap</Button>
                          </div>
                      )}
                  </div>
              </div>
          </div>

          {/* Right Panel: Escrow List */}
          <div className="space-y-6">
               <div className="bg-surface border border-border rounded-xl p-6 h-full">
                   <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                       <Icon name="Lock" className="w-5 h-5 text-primary" />
                       Active Escrows
                   </h2>
                   
                   <div className="space-y-4">
                       {escrowPayments.map(escrow => (
                           <div key={escrow.id} className="p-4 bg-card border border-border rounded-lg hover:border-primary/30 transition-all">
                               <div className="flex justify-between items-start mb-2">
                                   <span className="text-xs font-mono text-muted-foreground">{escrow.shipmentId}</span>
                                   <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                                       escrow.status === 'locked' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                                       'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                   }`}>
                                       {escrow.status}
                                   </span>
                               </div>
                               <h3 className="text-lg font-bold text-foreground mb-1">{escrow.amount}</h3>
                               <p className="text-xs text-muted-foreground mb-3">Condition: {escrow.releaseCondition}</p>
                               
                               <Button 
                                   onClick={() => handleReleaseEscrow(escrow.id)}
                                   size="sm" 
                                   variant="outline"
                                   className="w-full border-border text-foreground hover:bg-white/5"
                                   disabled={escrow.status !== 'locked'}
                               >
                                   Manage Escrow
                               </Button>
                           </div>
                       ))}
                   </div>
               </div>
          </div>
      </div>
    </div>
  );
};

export default PaymentProcessingInterface;