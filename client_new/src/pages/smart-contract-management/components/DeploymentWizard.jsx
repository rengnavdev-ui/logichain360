import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DeploymentWizard = ({ isOpen, onClose, onDeploy, selectedTemplate, walletAddress }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [contractData, setContractData] = useState({
    name: selectedTemplate?.name || '',
    network: 'ethereum-mainnet',
    gasLimit: '300000',
    gasPrice: 'auto',
    parameters: {}
  });

  const networks = [
    { value: 'ethereum-mainnet', label: 'Ethereum Mainnet' },
    { value: 'ethereum-goerli', label: 'Ethereum Goerli (Testnet)' },
    { value: 'polygon-mainnet', label: 'Polygon Mainnet' },
    { value: 'polygon-mumbai', label: 'Polygon Mumbai (Testnet)' },
    { value: 'bsc-mainnet', label: 'BSC Mainnet' },
    { value: 'bsc-testnet', label: 'BSC Testnet' }
  ];

  const steps = [
    { id: 1, title: 'Configure Parameters', icon: 'Settings' },
    { id: 2, title: 'Network & Gas', icon: 'Network' },
    { id: 3, title: 'Review & Deploy', icon: 'CheckCircle' }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onDeploy(contractData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Deploy Smart Contract</h2>
            <p className="text-sm text-gray-600 mt-1">Step {currentStep} of 3</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps?.map((step, index) => (
              <React.Fragment key={step?.id}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step?.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step?.id ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <Icon name={step?.icon} size={20} />
                    )}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${
                    currentStep >= step?.id ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step?.title}
                  </span>
                </div>
                {index < steps?.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${
                    currentStep > step?.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contract Name</label>
                <Input
                  type="text"
                  value={contractData?.name}
                  onChange={(e) => setContractData({ ...contractData, name: e?.target?.value })}
                  placeholder="Enter contract name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shipment ID</label>
                <Input
                  type="text"
                  placeholder="e.g., SHIP-2024-001"
                  onChange={(e) => setContractData({
                    ...contractData,
                    parameters: { ...contractData?.parameters, shipmentId: e?.target?.value }
                  })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Origin</label>
                  <Input
                    type="text"
                    placeholder="Mumbai, India"
                    onChange={(e) => setContractData({
                      ...contractData,
                      parameters: { ...contractData?.parameters, origin: e?.target?.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                  <Input
                    type="text"
                    placeholder="Delhi, India"
                    onChange={(e) => setContractData({
                      ...contractData,
                      parameters: { ...contractData?.parameters, destination: e?.target?.value }
                    })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Amount (ETH)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.5"
                    onChange={(e) => setContractData({
                      ...contractData,
                      parameters: { ...contractData?.parameters, paymentAmount: e?.target?.value }
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Deadline</label>
                  <Input
                    type="date"
                    onChange={(e) => setContractData({
                      ...contractData,
                      parameters: { ...contractData?.parameters, deadline: e?.target?.value }
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Network</label>
                <Select
                  value={contractData?.network}
                  onChange={(e) => setContractData({ ...contractData, network: e?.target?.value })}
                  options={networks}
                />
                <p className="text-xs text-gray-500 mt-1">Recommended: Use testnet for testing before mainnet deployment</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gas Limit</label>
                <Input
                  type="number"
                  value={contractData?.gasLimit}
                  onChange={(e) => setContractData({ ...contractData, gasLimit: e?.target?.value })}
                />
                <p className="text-xs text-gray-500 mt-1">Estimated gas: 250,000 - 350,000</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gas Price</label>
                <Select
                  value={contractData?.gasPrice}
                  onChange={(e) => setContractData({ ...contractData, gasPrice: e?.target?.value })}
                  options={[
                    { value: 'auto', label: 'Auto (Recommended)' },
                    { value: 'slow', label: 'Slow (~5 min)' },
                    { value: 'standard', label: 'Standard (~2 min)' },
                    { value: 'fast', label: 'Fast (~30 sec)' }
                  ]}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Estimated Cost</p>
                    <p className="text-xs text-blue-700 mt-1">Gas: 0.05 ETH (~$150 USD)</p>
                    <p className="text-xs text-blue-700">Network Fee: 0.002 ETH (~$6 USD)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-gray-900">Contract Summary</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Contract Name</p>
                    <p className="text-sm font-medium text-gray-900">{contractData?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Network</p>
                    <p className="text-sm font-medium text-gray-900">
                      {networks?.find(n => n?.value === contractData?.network)?.label}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Wallet Address</p>
                    <p className="text-sm font-medium text-gray-900">{walletAddress?.slice(0, 10)}...{walletAddress?.slice(-8)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Gas Limit</p>
                    <p className="text-sm font-medium text-gray-900">{contractData?.gasLimit}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-xs text-gray-500 mb-2">Contract Parameters</p>
                  <div className="space-y-2">
                    {Object.entries(contractData?.parameters)?.map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{key?.replace(/([A-Z])/g, ' $1')?.trim()}:</span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Icon name="AlertTriangle" size={20} className="text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Important Notice</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      Once deployed, smart contracts cannot be modified. Please review all parameters carefully.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : handleBack}
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            variant="default"
            onClick={handleNext}
            iconName={currentStep === 3 ? 'Rocket' : 'ArrowRight'}
            iconPosition="right"
          >
            {currentStep === 3 ? 'Deploy Contract' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeploymentWizard;