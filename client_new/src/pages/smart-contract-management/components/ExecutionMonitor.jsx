import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import StatusIndicator from '../../../components/ui/StatusIndicator';


const ExecutionMonitor = ({ selectedContract }) => {
  const [activeView, setActiveView] = useState('events');

  const contractEvents = [
    {
      id: 1,
      event: 'ShipmentCreated',
      timestamp: '2024-01-15 10:30:45',
      blockNumber: '18,234,567',
      txHash: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      gasUsed: '45,231',
      status: 'success'
    },
    {
      id: 2,
      event: 'ShipmentPickedUp',
      timestamp: '2024-01-15 14:22:18',
      blockNumber: '18,234,892',
      txHash: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      gasUsed: '32,145',
      status: 'success'
    },
    {
      id: 3,
      event: 'LocationUpdate',
      timestamp: '2024-01-16 08:15:33',
      blockNumber: '18,235,421',
      txHash: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      gasUsed: '28,567',
      status: 'success'
    },
    {
      id: 4,
      event: 'MilestoneReached',
      timestamp: '2024-01-16 16:45:12',
      blockNumber: '18,235,789',
      txHash: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      gasUsed: '35,892',
      status: 'success'
    }
  ];

  const functionCalls = [
    {
      id: 1,
      function: 'pickupShipment()',
      caller: '0x742d...0bEb',
      timestamp: '2024-01-15 14:22:18',
      gasUsed: '32,145',
      status: 'success'
    },
    {
      id: 2,
      function: 'updateLocation(lat, lng)',
      caller: '0x8ba1...BA72',
      timestamp: '2024-01-16 08:15:33',
      gasUsed: '28,567',
      status: 'success'
    },
    {
      id: 3,
      function: 'confirmMilestone(3)',
      caller: '0x1f98...F984',
      timestamp: '2024-01-16 16:45:12',
      gasUsed: '35,892',
      status: 'success'
    }
  ];

  const stateVariables = [
    { name: 'shipper', value: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb', type: 'address' },
    { name: 'carrier', value: '0x8ba1f109551bD432803012645Ac136ddd64DBA72', type: 'address' },
    { name: 'receiver', value: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', type: 'address' },
    { name: 'paymentAmount', value: '2.5 ETH', type: 'uint256' },
    { name: 'status', value: 'InTransit', type: 'enum' },
    { name: 'currentMilestone', value: '3', type: 'uint8' },
    { name: 'totalMilestones', value: '5', type: 'uint8' }
  ];

  return (
    <div className="space-y-6">
      {/* Contract Info Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {selectedContract?.name || 'Mumbai-Delhi Shipment'}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon name="FileCode" size={16} />
                <span>Contract: {selectedContract?.id || 'CT-2024-001'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon name="Network" size={16} />
                <span>Network: {selectedContract?.network || 'Ethereum Mainnet'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon name="Link" size={16} />
                <span className="font-mono">0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb</span>
                <button className="text-blue-600 hover:text-blue-700">
                  <Icon name="Copy" size={14} />
                </button>
              </div>
            </div>
          </div>
          <StatusIndicator status="success" label="Active" />
        </div>
      </div>
      {/* View Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {['events', 'functions', 'state']?.map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${
              activeView === view
                ? 'border-blue-600 text-blue-600' :'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {view === 'events' && 'Contract Events'}
            {view === 'functions' && 'Function Calls'}
            {view === 'state' && 'State Variables'}
          </button>
        ))}
      </div>
      {/* Events View */}
      {activeView === 'events' && (
        <div className="space-y-4">
          {contractEvents?.map((event) => (
            <div key={event?.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="Zap" size={20} className="text-blue-600" />
                    <h4 className="font-semibold text-gray-900">{event?.event}</h4>
                    <StatusIndicator status="success" label="Success" />
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Timestamp</p>
                      <p className="text-sm text-gray-900">{event?.timestamp}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Block Number</p>
                      <p className="text-sm text-gray-900">{event?.blockNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Gas Used</p>
                      <p className="text-sm text-gray-900">{event?.gasUsed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Transaction Hash</p>
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-gray-900 font-mono truncate">{event?.txHash?.slice(0, 10)}...</p>
                        <button className="text-blue-600 hover:text-blue-700">
                          <Icon name="ExternalLink" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Function Calls View */}
      {activeView === 'functions' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Function</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Caller</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Timestamp</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Gas Used</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {functionCalls?.map((call) => (
                <tr key={call?.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className="text-sm font-mono text-gray-900">{call?.function}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-mono text-gray-600">{call?.caller}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{call?.timestamp}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{call?.gasUsed}</span>
                  </td>
                  <td className="py-4 px-4">
                    <StatusIndicator status="success" label="Success" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* State Variables View */}
      {activeView === 'state' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {stateVariables?.map((variable, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{variable?.name}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{variable?.type}</span>
              </div>
              <p className="text-sm font-mono text-gray-900 break-all">{variable?.value}</p>
            </div>
          ))}
        </div>
      )}
      {/* Gas Analytics */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Icon name="BarChart3" size={20} />
          Gas Consumption Analytics
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Gas Used</p>
            <p className="text-2xl font-bold text-gray-900">141,835</p>
            <p className="text-xs text-green-600 mt-1">-12% vs average</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Average per Transaction</p>
            <p className="text-2xl font-bold text-gray-900">35,459</p>
            <p className="text-xs text-blue-600 mt-1">Optimized</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Cost (ETH)</p>
            <p className="text-2xl font-bold text-gray-900">0.045</p>
            <p className="text-xs text-gray-600 mt-1">~$135 USD</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutionMonitor;