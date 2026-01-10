import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const ActiveContractsTable = ({ onViewDetails }) => {
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');

  const contracts = [
    {
      id: 'CT-2024-001',
      name: 'Mumbai-Delhi Shipment',
      type: 'Shipping Agreement',
      status: 'active',
      deployedDate: '2024-01-15',
      network: 'Ethereum',
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      gasUsed: '0.045 ETH',
      milestones: { completed: 3, total: 5 },
      value: '2.5 ETH'
    },
    {
      id: 'CT-2024-002',
      name: 'Cold Chain Transport',
      type: 'Cold Chain Compliance',
      status: 'active',
      deployedDate: '2024-01-18',
      network: 'Polygon',
      address: '0x8ba1f109551bD432803012645Ac136ddd64DBA72',
      gasUsed: '0.032 ETH',
      milestones: { completed: 2, total: 4 },
      value: '1.8 ETH'
    },
    {
      id: 'CT-2024-003',
      name: 'Multi-Carrier Logistics',
      type: 'Multi-Party Logistics',
      status: 'pending',
      deployedDate: '2024-01-20',
      network: 'Ethereum',
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      gasUsed: '0.068 ETH',
      milestones: { completed: 0, total: 6 },
      value: '4.2 ETH'
    },
    {
      id: 'CT-2024-004',
      name: 'Payment Escrow - Batch 5',
      type: 'Payment Escrow',
      status: 'completed',
      deployedDate: '2024-01-10',
      network: 'BSC',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      gasUsed: '0.028 ETH',
      milestones: { completed: 3, total: 3 },
      value: '3.1 ETH'
    },
    {
      id: 'CT-2024-005',
      name: 'Performance Bond Contract',
      type: 'Performance Bond',
      status: 'active',
      deployedDate: '2024-01-22',
      network: 'Polygon',
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      gasUsed: '0.041 ETH',
      milestones: { completed: 4, total: 5 },
      value: '2.0 ETH'
    },
    {
      id: 'CT-2024-006',
      name: 'Customs Clearance - Import',
      type: 'Customs Clearance',
      status: 'disputed',
      deployedDate: '2024-01-12',
      network: 'Ethereum',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      gasUsed: '0.055 ETH',
      milestones: { completed: 2, total: 4 },
      value: '1.5 ETH'
    }
  ];

  const statusConfig = {
    active: { label: 'Active', color: 'success' },
    pending: { label: 'Pending', color: 'warning' },
    completed: { label: 'Completed', color: 'info' },
    disputed: { label: 'Disputed', color: 'error' }
  };

  const filteredContracts = filterStatus === 'all' 
    ? contracts 
    : contracts?.filter(c => c?.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {['all', 'active', 'pending', 'completed', 'disputed']?.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                filterStatus === status
                  ? 'bg-blue-600 text-white' :'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status} ({status === 'all' ? contracts?.length : contracts?.filter(c => c?.status === status)?.length})
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Icon name="SortDesc" size={18} className="text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="value">Sort by Value</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>
      {/* Contracts Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Contract ID</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name & Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Network</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Progress</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Value</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContracts?.map((contract) => (
              <tr key={contract?.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Icon name="FileCode" size={16} className="text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">{contract?.id}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{contract?.name}</p>
                    <p className="text-xs text-gray-500">{contract?.type}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <StatusIndicator 
                    status={statusConfig?.[contract?.status]?.color}
                    label={statusConfig?.[contract?.status]?.label}
                  />
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <Icon name="Network" size={12} className="text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-700">{contract?.network}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{contract?.milestones?.completed}/{contract?.milestones?.total} milestones</span>
                      <span>{Math.round((contract?.milestones?.completed / contract?.milestones?.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${(contract?.milestones?.completed / contract?.milestones?.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm font-semibold text-gray-900">{contract?.value}</span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      iconName="Eye"
                      onClick={() => onViewDetails(contract)}
                    >
                      View
                    </Button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Icon name="MoreVertical" size={16} className="text-gray-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredContracts?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileX" size={48} className="text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No contracts found</p>
        </div>
      )}
    </div>
  );
};

export default ActiveContractsTable;