import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeFiIntegration = ({ walletConnected, onNotification }) => {
  const [activeTab, setActiveTab] = useState('lending');

  const [defiStats] = useState([
      { title: 'Total Value Locked', value: '$12.5M', change: '+5.2%', icon: 'Lock' },
      { title: '24h Volume', value: '$2.1M', change: '-1.8%', icon: 'BarChart2' },
      { title: 'Active Yield', value: '8.4%', change: '+0.5%', icon: 'Percent' },
      { title: 'Gas Tracker', value: '24 Gwei', change: 'Low', icon: 'Zap' },
  ]);

  const [aiAlerts] = useState([
      { id: 1, type: 'opportunity', message: 'High APY detected in USDC-ETH Pool (15.2%)', time: '10m ago' },
      { id: 2, type: 'risk', message: 'Significant liquidity removal in MATIC Pool', time: '1h ago' },
  ]);

  const handleDeFiAction = (action) => {
    if (!walletConnected) {
      onNotification('Please connect your wallet first', 'warning');
      return;
    }
    onNotification(`${action} Protocol Initiated`, 'success');
  };

  return (
    <div className="space-y-6">
       {/* Top Stats */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           {defiStats.map((stat, idx) => (
                <div key={idx} className="bg-surface border border-border p-4 rounded-xl flex flex-col justify-between h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-5">
                        <Icon name={stat.icon} className="w-16 h-16 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground uppercase">{stat.title}</p>
                    <div>
                        <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                        <p className={`text-xs font-medium mt-1 ${
                            stat.change.includes('+') ? 'text-green-400' : 
                            stat.change.includes('-') ? 'text-red-400' : 'text-primary'
                        }`}>
                            {stat.change}
                        </p>
                    </div>
                </div>
           ))}
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           {/* AI Alerts Sidebar */}
           <div className="space-y-6">
               <div className="bg-surface border border-border rounded-xl p-5 relative overflow-hidden">
                   <div className="flex items-center gap-2 mb-4">
                       <Icon name="Cpu" className="w-5 h-5 text-purple-400" />
                       <h3 className="text-sm font-semibold text-foreground">AI Market Intelligence</h3>
                   </div>
                   <div className="space-y-3">
                       {aiAlerts.map(alert => (
                           <div key={alert.id} className={`p-3 rounded-lg border text-xs ${
                               alert.type === 'opportunity' ? 'bg-green-500/10 border-green-500/20 text-green-300' :
                               'bg-red-500/10 border-red-500/20 text-red-300'
                           }`}>
                               <div className="flex items-center justify-between mb-1">
                                   <span className="uppercase font-bold text-[10px]">{alert.type}</span>
                                   <span className="opacity-70">{alert.time}</span>
                               </div>
                               <p>{alert.message}</p>
                           </div>
                       ))}
                   </div>
                   <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                       <span className="text-xs text-muted-foreground">Auto-Execution</span>
                       <div className="w-8 h-4 bg-muted rounded-full relative cursor-not-allowed">
                           <div className="w-4 h-4 bg-muted-foreground rounded-full absolute left-0" />
                       </div>
                   </div>
               </div>

                <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-xl p-5 text-center">
                    <p className="text-sm font-bold text-foreground mb-1">Yield Farming Bot</p>
                    <p className="text-xs text-muted-foreground mb-4">Automate your DeFi strategy with AI.</p>
                    <Button onClick={() => onNotification('Bot configuration locked', 'info')} variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10">
                        Configure Bot
                    </Button>
                </div>
           </div>

           {/* Main Defi Interface */}
           <div className="lg:col-span-2 bg-surface border border-border rounded-xl overflow-hidden min-h-[400px]">
               <div className="border-b border-border flex">
                   {['lending', 'borrowing', 'pools'].map(tab => (
                       <button
                           key={tab}
                           onClick={() => setActiveTab(tab)}
                           className={`flex-1 py-4 text-sm font-medium transition-all ${
                               activeTab === tab 
                               ? 'bg-primary/10 text-primary border-b-2 border-primary' 
                               : 'text-muted-foreground hover:bg-white/5'
                           }`}
                       >
                           {tab.charAt(0).toUpperCase() + tab.slice(1)}
                       </button>
                   ))}
               </div>

               <div className="p-6">
                   {activeTab === 'lending' && (
                       <div className="space-y-4">
                           <div className="flex justify-between items-center mb-2">
                               <h3 className="text-lg font-semibold text-foreground">Supply Markets</h3>
                               <span className="text-xs text-muted-foreground">Net APY: 4.2%</span>
                           </div>
                           
                           {[
                               { asset: 'USDC', apy: '4.8%', wallet: '1,250.00', supplied: '500.00' },
                               { asset: 'ETH', apy: '3.2%', wallet: '2.45', supplied: '0.00' },
                               { asset: 'MATIC', apy: '5.1%', wallet: '1,500.00', supplied: '250.00' }
                           ].map((item, i) => (
                               <div key={i} className="flex items-center justify-between p-4 bg-background border border-border rounded-lg hover:border-primary/30 transition-all">
                                   <div className="flex items-center gap-3">
                                       <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-xs text-foreground">{item.asset[0]}</div>
                                       <div>
                                           <p className="font-bold text-foreground text-sm">{item.asset}</p>
                                           <p className="text-xs text-green-400">{item.apy} APY</p>
                                       </div>
                                   </div>
                                   <div className="text-right">
                                       <p className="text-sm font-medium text-foreground">{item.supplied}</p>
                                       <p className="text-xs text-muted-foreground">Supplied</p>
                                   </div>
                                    <Button onClick={() => handleDeFiAction(`Supply ${item.asset}`)} size="sm" variant="outline" className="border-border text-foreground hover:bg-white/5">
                                        Supply
                                    </Button>
                               </div>
                           ))}
                       </div>
                   )}
                   
                   {activeTab === 'borrowing' && (
                        <div className="text-center py-12">
                            <Icon name="Shield" className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                            <h3 className="text-lg font-semibold text-foreground mb-2">No Active Loans</h3>
                            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-6">You have sufficient collateral to borrow up to $850.00 against your supplied assets.</p>
                            <Button onClick={() => handleDeFiAction('Borrow')} className="bg-primary text-primary-foreground">
                                View Borrow Markets
                            </Button>
                        </div>
                   )}

                    {activeTab === 'pools' && (
                       <div className="space-y-4">
                           <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
                               <div className="flex justify-between items-start mb-4">
                                   <div className="flex items-center gap-3">
                                       <div className="flex -space-x-2">
                                           <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-surface" />
                                           <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-surface" />
                                       </div>
                                       <div>
                                           <p className="font-bold text-foreground text-sm">ETH-USDC</p>
                                           <p className="text-xs text-muted-foreground">Uniswap V3</p>
                                       </div>
                                   </div>
                                   <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded">15.2% APR</span>
                               </div>
                               <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                                   <div>
                                       <p className="text-muted-foreground">Liquidity</p>
                                       <p className="text-foreground font-medium">$1.2M</p>
                                   </div>
                                   <div>
                                       <p className="text-muted-foreground">Volume (24h)</p>
                                       <p className="text-foreground font-medium">$450k</p>
                                   </div>
                                   <div>
                                       <p className="text-muted-foreground">Fees</p>
                                       <p className="text-foreground font-medium">$1.2k</p>
                                   </div>
                               </div>
                               <Button onClick={() => handleDeFiAction('Add Liquidity')} className="w-full bg-primary text-primary-foreground">
                                   Add Liquidity
                               </Button>
                           </div>
                       </div>
                   )}
               </div>
           </div>
       </div>
    </div>
  );
};

export default DeFiIntegration;