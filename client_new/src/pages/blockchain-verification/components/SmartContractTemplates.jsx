import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ContractBuilderModal from './ContractBuilderModal';

const SmartContractTemplates = ({ walletConnected, onNotification, logAction }) => {
  const [showBuilder, setShowBuilder] = useState(false);
  const [templates] = useState([
    {
      id: 'TPL-001',
      name: 'Standard Delivery Agreement',
      description: 'Basic logistics contract with delivery confirmation and payment release',
      category: 'Delivery',
      features: ['Automated payment release', 'Delivery confirmation', 'Dispute resolution'],
      gasEstimate: '0.0045 ETH',
      deployments: 234,
      rating: 4.8,
    },
    {
      id: 'TPL-002',
      name: 'Multi-Party Escrow Contract',
      description: 'Escrow contract with multiple stakeholders and milestone-based payments',
      category: 'Payment',
      features: ['Milestone tracking', 'Multi-signature approval', 'Automated escrow'],
      gasEstimate: '0.0067 ETH',
      deployments: 156,
      rating: 4.9,
    },
    {
      id: 'TPL-003',
      name: 'Temperature-Controlled Shipment',
      description: 'Smart contract for cold chain logistics with IoT sensor integration',
      category: 'Specialized',
      features: ['IoT integration', 'Temperature monitoring', 'Auto-compensation'],
      gasEstimate: '0.0089 ETH',
      deployments: 89,
      rating: 4.7,
    },
    {
      id: 'TPL-004',
      name: 'International Freight Agreement',
      description: 'Cross-border logistics contract with customs and compliance tracking',
      category: 'International',
      features: ['Customs integration', 'Multi-currency support', 'Compliance tracking'],
      gasEstimate: '0.0098 ETH',
      deployments: 67,
      rating: 4.6,
    },
  ]);

  const handleDeployTemplate = (template) => {
    if (!walletConnected) {
      onNotification('Please connect your wallet first', 'warning');
      return;
    }
    onNotification(`Deploying ${template?.name} contract...`, 'success');
    logAction('Deployment', `Deployed ${template?.name}`, `Template ID: ${template?.id}`);
  };

  const handleCustomDeploy = (config) => {
      onNotification(`Custom Contract "${config.name}" deployed successfully!`, 'success');
      logAction('Deployment', `Deployed Custom Contract`, `Name: ${config.name}, Type: ${config.type}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-lg backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
            <Icon name="FileText" className="w-5 h-5 text-primary" />
            Smart Contract Templates
            </h2>
            <p className="text-muted-foreground">
            Pre-configured logistics agreements with automated execution triggers
            </p>
        </div>
        <Button onClick={() => setShowBuilder(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-sm">
            <Icon name="Cpu" className="w-4 h-4 mr-2" />
            No-Code Builder
        </Button>
      </div>
      {/* Template Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {templates?.map((template) => (
          <div
            key={template?.id}
            className="bg-surface border border-border rounded-2xl p-6 hover:bg-card/50 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.1)] group flex flex-col"
          >
            <div className="mb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{template?.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        template.category === 'Delivery' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        template.category === 'Payment' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        template.category === 'Specialized' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                        'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {template?.category}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{template?.description}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Key Features:</p>
                <div className="flex flex-wrap gap-2">
                  {template?.features?.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-muted/50 text-muted-foreground border border-border rounded text-[10px] flex items-center gap-1.5"
                    >
                      <Icon name="Check" className="w-3 h-3 text-primary" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-border mt-auto">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Gas Est.</p>
                  <div className="flex items-center gap-1.5">
                      <Icon name="Fuel" className="w-3 h-3 text-secondary" />
                      <p className="text-sm font-semibold text-foreground">{template?.gasEstimate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Deployments</p>
                   <div className="flex items-center gap-1.5">
                      <Icon name="Rocket" className="w-3 h-3 text-primary" />
                      <p className="text-sm font-semibold text-foreground">{template?.deployments}</p>
                   </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Rating</p>
                  <div className="flex items-center gap-1.5">
                    <Icon name="Star" className="w-3 h-3 text-warning fill-warning" />
                    <p className="text-sm font-semibold text-foreground">{template?.rating}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-auto pt-2">
              <Button
                onClick={() => handleDeployTemplate(template)}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-sm border-none"
                size="sm"
                disabled={!walletConnected}
              >
                <Icon name="Rocket" className="w-4 h-4 mr-2" />
                Deploy
              </Button>
              <Button variant="outline" size="sm" className="flex-1 border-border hover:bg-white/5 hover:text-white">
                <Icon name="Eye" className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        ))}
      </div>

       {showBuilder && (
           <ContractBuilderModal onClose={() => setShowBuilder(false)} onDeploy={handleCustomDeploy} />
       )}
    </div>
  );
};

export default SmartContractTemplates;