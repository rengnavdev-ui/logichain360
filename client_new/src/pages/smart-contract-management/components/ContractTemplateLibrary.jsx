import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const ContractTemplateLibrary = ({ onSelectTemplate, walletConnected }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      name: 'Shipping Agreement',
      category: 'logistics',
      description: 'Standard shipping contract with delivery milestones and payment terms',
      features: ['Automated milestone tracking', 'Escrow payment', 'Delivery confirmation', 'Penalty clauses'],
      gasEstimate: '0.05 ETH',
      deployments: 45,
      rating: 4.8,
      icon: 'Ship'
    },
    {
      id: 2,
      name: 'Multi-Party Logistics',
      category: 'logistics',
      description: 'Complex contract for multiple carriers and stakeholders',
      features: ['Multi-signature approval', 'Route optimization', 'Cost sharing', 'Performance tracking'],
      gasEstimate: '0.08 ETH',
      deployments: 32,
      rating: 4.6,
      icon: 'Users'
    },
    {
      id: 3,
      name: 'Cold Chain Compliance',
      category: 'specialized',
      description: 'Temperature-controlled shipment with IoT sensor integration',
      features: ['Temperature monitoring', 'Automatic alerts', 'Compliance verification', 'Insurance claims'],
      gasEstimate: '0.06 ETH',
      deployments: 28,
      rating: 4.9,
      icon: 'Thermometer'
    },
    {
      id: 4,
      name: 'Payment Escrow',
      category: 'payment',
      description: 'Secure payment release based on delivery confirmation',
      features: ['Escrow management', 'Conditional release', 'Refund mechanism', 'Dispute handling'],
      gasEstimate: '0.04 ETH',
      deployments: 67,
      rating: 4.7,
      icon: 'DollarSign'
    },
    {
      id: 5,
      name: 'Performance Bond',
      category: 'payment',
      description: 'Carrier performance guarantee with penalty enforcement',
      features: ['Bond management', 'Performance metrics', 'Automatic penalties', 'Reward distribution'],
      gasEstimate: '0.05 ETH',
      deployments: 23,
      rating: 4.5,
      icon: 'Award'
    },
    {
      id: 6,
      name: 'Customs Clearance',
      category: 'specialized',
      description: 'Automated customs documentation and payment processing',
      features: ['Document verification', 'Duty calculation', 'Compliance checks', 'Multi-currency support'],
      gasEstimate: '0.07 ETH',
      deployments: 19,
      rating: 4.4,
      icon: 'FileCheck'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Templates', count: templates?.length },
    { id: 'logistics', label: 'Logistics', count: templates?.filter(t => t?.category === 'logistics')?.length },
    { id: 'payment', label: 'Payment', count: templates?.filter(t => t?.category === 'payment')?.length },
    { id: 'specialized', label: 'Specialized', count: templates?.filter(t => t?.category === 'specialized')?.length }
  ];

  const filteredTemplates = templates?.filter(template => {
    const matchesSearch = template?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         template?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search contract templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category?.id
                  ? 'bg-blue-600 text-white' :'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category?.label} ({category?.count})
            </button>
          ))}
        </div>
      </div>
      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTemplates?.map((template) => (
          <div key={template?.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Icon name={template?.icon} size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{template?.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm text-gray-600">{template?.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{template?.deployments} deployments</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{template?.description}</p>

            <div className="space-y-2 mb-4">
              <p className="text-xs font-medium text-gray-700 uppercase">Key Features:</p>
              <div className="flex flex-wrap gap-2">
                {template?.features?.map((feature, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <Icon name="Fuel" size={16} className="text-gray-500" />
                <span className="text-sm text-gray-600">~{template?.gasEstimate}</span>
              </div>
              <Button
                size="sm"
                variant="default"
                onClick={() => onSelectTemplate(template)}
                disabled={!walletConnected}
              >
                Use Template
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filteredTemplates?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileX" size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No templates found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default ContractTemplateLibrary;