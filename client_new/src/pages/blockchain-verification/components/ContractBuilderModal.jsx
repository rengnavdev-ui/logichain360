import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ContractBuilderModal = ({ onClose, onDeploy }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
      name: '',
      type: 'Standard Freight',
      sla: '24h',
      penalty: '5%',
      conditions: []
  });

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleDeploy = () => {
      setLoading(true);
      setTimeout(() => {
          onDeploy(config);
          setLoading(false);
          onClose();
      }, 2000);
  };

  const addCondition = () => {
      setConfig(prev => ({
          ...prev,
          conditions: [...prev.conditions, { id: Date.now(), trigger: 'Delay > 4h', action: 'Penalty 2%' }]
      }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-surface border border-border rounded-xl w-full max-w-2xl shadow-2xl flex flex-col h-[600px]">
        {/* Header */}
        <div className="p-6 border-b border-border bg-surface/95 backdrop-blur z-10 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Icon name="Cpu" className="w-6 h-6 text-accent" />
              No-Code Contract Builder
            </h2>
            <p className="text-xs text-muted-foreground mt-1">Configure smart contract logic without writing Solidity</p>
          </div>
          <div className="flex gap-1">
             <div className={`h-2 w-8 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
             <div className={`h-2 w-8 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
             <div className={`h-2 w-8 rounded-full transition-colors ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-8">
            {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                    <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Contract Name</label>
                        <Input 
                            placeholder="e.g. Q1 Supply Agreement" 
                            value={config.name} 
                            onChange={e => setConfig({...config, name: e.target.value})}
                            className="bg-card border-border"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Contract Type</label>
                         <div className="grid grid-cols-3 gap-3">
                            {['Standard Freight', 'Perishable Goods', 'High Value'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setConfig({...config, type})}
                                    className={`p-4 border rounded-xl text-left transition-all ${config.type === type ? 'border-primary bg-primary/10 ring-1 ring-primary' : 'border-border bg-card hover:border-muted-foreground'}`}
                                >
                                    <div className="font-semibold text-sm mb-1">{type}</div>
                                    <div className="text-[10px] text-muted-foreground">Pre-set templates</div>
                                </button>
                            ))}
                         </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                     <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Defined Rule Sets</label>
                        <div className="bg-muted/10 border border-border rounded-xl p-4 space-y-3">
                             <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border shadow-sm">
                                 <div className="flex items-center gap-3">
                                     <div className="p-2 bg-orange-500/10 rounded-lg"><Icon name="Clock" className="w-4 h-4 text-orange-400" /></div>
                                     <div>
                                         <p className="text-sm font-medium text-foreground">Delivery Delay</p>
                                         <p className="text-xs text-muted-foreground">IF delay {'>'} {config.sla} THEN penalty {config.penalty}</p>
                                     </div>
                                 </div>
                                 <Icon name="Check" className="w-4 h-4 text-primary" />
                             </div>
                             {config.conditions.map(cond => (
                                 <div key={cond.id} className="flex items-center justify-between p-3 bg-card rounded-lg border border-border shadow-sm">
                                     <div className="flex items-center gap-3">
                                         <div className="p-2 bg-blue-500/10 rounded-lg"><Icon name="Zap" className="w-4 h-4 text-blue-400" /></div>
                                         <div>
                                             <p className="text-sm font-medium text-foreground">Custom Condition</p>
                                             <p className="text-xs text-muted-foreground">IF {cond.trigger} THEN {cond.action}</p>
                                         </div>
                                     </div>
                                      <Icon name="Check" className="w-4 h-4 text-primary" />
                                 </div>
                             ))}
                             <button onClick={addCondition} className="w-full py-3 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:bg-muted/20 hover:text-foreground transition-colors flex items-center justify-center gap-2">
                                 <Icon name="Plus" className="w-4 h-4" />
                                 Add Logic Block
                             </button>
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                 <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
                    <div className="bg-success/5 border border-success/20 rounded-xl p-6 text-center">
                        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon name="Code" className="w-8 h-8 text-success" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">Ready to Deploy</h3>
                        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                            Your configuration has been compiled into bytecode. Ready to deploy to Ethereum Mainnet.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/10 rounded-xl border border-border/50">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Gas Fee</p>
                            <p className="text-lg font-bold text-foreground">0.0042 ETH</p>
                        </div>
                        <div className="p-4 bg-muted/10 rounded-xl border border-border/50">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Bytecode Size</p>
                            <p className="text-lg font-bold text-foreground">4.2 KB</p>
                        </div>
                    </div>
                 </div>
            )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/5 flex justify-between items-center">
            {step > 1 ? (
                 <Button variant="outline" onClick={handleBack} disabled={loading}>Back</Button>
            ) : (
                 <Button variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
            )}
            
            {step < 3 ? (
                <Button onClick={handleNext} disabled={!config.name && step === 1}>Next Step <Icon name="ArrowRight" className="w-4 h-4 ml-2" /></Button>
            ) : (
                <Button onClick={handleDeploy} className="bg-primary text-primary-foreground shadow-glow-sm" disabled={loading}>
                    {loading ? (
                         <>
                            <Icon name="Loader" className="w-4 h-4 mr-2 animate-spin" /> Deploying...
                         </>
                    ) : (
                         <>
                            <Icon name="Rocket" className="w-4 h-4 mr-2" /> Deploy Contract
                         </>
                    )}
                </Button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ContractBuilderModal;
