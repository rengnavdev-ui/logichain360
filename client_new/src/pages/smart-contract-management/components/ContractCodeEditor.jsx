import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContractCodeEditor = ({ walletConnected, onDeploy }) => {
  const [code, setCode] = useState(`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LogisticsShipment {
    address public shipper;
    address public carrier;
    address public receiver;
    
    uint256 public paymentAmount;
    uint256 public deliveryDeadline;
    
    enum ShipmentStatus { Created, InTransit, Delivered, Disputed }
    ShipmentStatus public status;
    
    event ShipmentCreated(address shipper, uint256 amount);
    event ShipmentPickedUp(address carrier, uint256 timestamp);
    event ShipmentDelivered(address receiver, uint256 timestamp);
    event PaymentReleased(address carrier, uint256 amount);
    
    constructor(
        address _carrier,
        address _receiver,
        uint256 _deliveryDeadline
    ) payable {
        shipper = msg.sender;
        carrier = _carrier;
        receiver = _receiver;
        paymentAmount = msg.value;
        deliveryDeadline = _deliveryDeadline;
        status = ShipmentStatus.Created;
        
        emit ShipmentCreated(shipper, paymentAmount);
    }
    
    function pickupShipment() public {
        require(msg.sender == carrier, "Only carrier can pickup");
        require(status == ShipmentStatus.Created, "Invalid status");
        
        status = ShipmentStatus.InTransit;
        emit ShipmentPickedUp(carrier, block.timestamp);
    }
    
    function confirmDelivery() public {
        require(msg.sender == receiver, "Only receiver can confirm");
        require(status == ShipmentStatus.InTransit, "Invalid status");
        
        status = ShipmentStatus.Delivered;
        emit ShipmentDelivered(receiver, block.timestamp);
        
        // Release payment to carrier
        payable(carrier).transfer(paymentAmount);
        emit PaymentReleased(carrier, paymentAmount);
    }
}`);

  const [compileResult, setCompileResult] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);

  const handleCompile = () => {
    setIsCompiling(true);
    setTimeout(() => {
      setCompileResult({
        success: true,
        warnings: 1,
        errors: 0,
        gasEstimate: '285,432',
        bytecodeSize: '2.4 KB'
      });
      setIsCompiling(false);
    }, 1500);
  };

  const handleDeploy = () => {
    if (compileResult?.success) {
      onDeploy(code);
    }
  };

  return (
    <div className="space-y-4">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <Icon name="Code" size={20} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Solidity Smart Contract Editor</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            iconName="Download"
          >
            Export
          </Button>
          <Button
            size="sm"
            variant="outline"
            iconName="Upload"
          >
            Import
          </Button>
          <Button
            size="sm"
            variant="secondary"
            iconName="Play"
            onClick={handleCompile}
            loading={isCompiling}
          >
            Compile
          </Button>
        </div>
      </div>
      {/* Code Editor */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <textarea
          value={code}
          onChange={(e) => setCode(e?.target?.value)}
          className="w-full h-[500px] p-4 font-mono text-sm bg-gray-900 text-green-400 focus:outline-none resize-none"
          spellCheck="false"
        />
      </div>
      {/* Compilation Result */}
      {compileResult && (
        <div className={`border rounded-lg p-4 ${
          compileResult?.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
        }`}>
          <div className="flex items-start gap-3">
            <Icon 
              name={compileResult?.success ? 'CheckCircle' : 'XCircle'} 
              size={20} 
              className={compileResult?.success ? 'text-green-600' : 'text-red-600'}
            />
            <div className="flex-1">
              <p className={`font-semibold ${
                compileResult?.success ? 'text-green-900' : 'text-red-900'
              }`}>
                {compileResult?.success ? 'Compilation Successful' : 'Compilation Failed'}
              </p>
              
              {compileResult?.success && (
                <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Warnings</p>
                    <p className="text-sm font-medium text-gray-900">{compileResult?.warnings}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Errors</p>
                    <p className="text-sm font-medium text-gray-900">{compileResult?.errors}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Gas Estimate</p>
                    <p className="text-sm font-medium text-gray-900">{compileResult?.gasEstimate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Bytecode Size</p>
                    <p className="text-sm font-medium text-gray-900">{compileResult?.bytecodeSize}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Security Audit */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Shield" size={20} className="text-blue-600 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900">Security Audit Recommendations</p>
            <ul className="mt-2 space-y-1 text-xs text-blue-700">
              <li>• Consider adding reentrancy guards for payment functions</li>
              <li>• Implement access control modifiers for sensitive operations</li>
              <li>• Add event logging for all state changes</li>
              <li>• Consider using SafeMath for arithmetic operations</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Deploy Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          {walletConnected ? (
            <span className="flex items-center gap-2">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              Wallet connected and ready to deploy
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Icon name="AlertCircle" size={16} className="text-yellow-600" />
              Connect wallet to deploy contract
            </span>
          )}
        </div>
        <Button
          variant="default"
          iconName="Rocket"
          onClick={handleDeploy}
          disabled={!walletConnected || !compileResult?.success}
        >
          Deploy to Blockchain
        </Button>
      </div>
    </div>
  );
};

export default ContractCodeEditor;