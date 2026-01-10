import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ShipmentTable = ({ shipments, onViewDetails, onAssignDriver }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  const sortedShipments = [...shipments]?.sort((a, b) => {
    if (sortConfig?.key === 'id' || sortConfig?.key === 'priority') {
      return sortConfig?.direction === 'asc' 
        ? a?.[sortConfig?.key] - b?.[sortConfig?.key]
        : b?.[sortConfig?.key] - a?.[sortConfig?.key];
    }
    return sortConfig?.direction === 'asc'
      ? String(a?.[sortConfig?.key])?.localeCompare(String(b?.[sortConfig?.key]))
      : String(b?.[sortConfig?.key])?.localeCompare(String(a?.[sortConfig?.key]));
  });

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'In Transit': 'text-primary',
      'Pending': 'text-warning',
      'Delivered': 'text-success',
      'Delayed': 'text-error'
    };
    return colors?.[status] || 'text-muted-foreground';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      1: { label: 'High', className: 'bg-error/20 text-error border-error/30' },
      2: { label: 'Medium', className: 'bg-warning/20 text-warning border-warning/30' },
      3: { label: 'Low', className: 'bg-success/20 text-success border-success/30' }
    };
    return badges?.[priority] || badges?.[3];
  };

  return (
    <div className="overflow-x-auto scrollbar-custom">
      <table className="w-full min-w-[800px]">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-4 px-4 md:px-6">
              <button 
                onClick={() => handleSort('id')}
                className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                ID
                <Icon name={sortConfig?.key === 'id' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={16} />
              </button>
            </th>
            <th className="text-left py-4 px-4 md:px-6">
              <button 
                onClick={() => handleSort('origin')}
                className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                Route
                <Icon name={sortConfig?.key === 'origin' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={16} />
              </button>
            </th>
            <th className="text-left py-4 px-4 md:px-6">
              <button 
                onClick={() => handleSort('status')}
                className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                Status
                <Icon name={sortConfig?.key === 'status' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={16} />
              </button>
            </th>
            <th className="text-left py-4 px-4 md:px-6">
              <button 
                onClick={() => handleSort('driver')}
                className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                Driver
                <Icon name={sortConfig?.key === 'driver' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={16} />
              </button>
            </th>
            <th className="text-left py-4 px-4 md:px-6">
              <span className="text-sm font-semibold text-foreground">Progress</span>
            </th>
            <th className="text-left py-4 px-4 md:px-6">
              <button 
                onClick={() => handleSort('priority')}
                className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                Priority
                <Icon name={sortConfig?.key === 'priority' ? (sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} size={16} />
              </button>
            </th>
            <th className="text-right py-4 px-4 md:px-6">
              <span className="text-sm font-semibold text-foreground">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedShipments?.map((shipment) => {
            const priorityBadge = getPriorityBadge(shipment?.priority);
            return (
              <tr key={shipment?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4 md:px-6">
                  <span className="text-sm font-medium text-foreground">#{shipment?.id}</span>
                </td>
                <td className="py-4 px-4 md:px-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-foreground">{shipment?.origin}</span>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="ArrowDown" size={12} />
                      <span>{shipment?.destination}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 md:px-6">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(shipment?.status)?.replace('text-', 'bg-')}`} />
                    <span className={`text-sm font-medium ${getStatusColor(shipment?.status)}`}>
                      {shipment?.status}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 md:px-6">
                  {shipment?.driver ? (
                    <span className="text-sm text-foreground">{shipment?.driver}</span>
                  ) : (
                    <Button 
                      variant="outline" 
                      size="xs"
                      onClick={() => onAssignDriver(shipment?.id)}
                    >
                      Assign
                    </Button>
                  )}
                </td>
                <td className="py-4 px-4 md:px-6">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${shipment?.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{shipment?.progress}%</span>
                  </div>
                </td>
                <td className="py-4 px-4 md:px-6">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${priorityBadge?.className}`}>
                    {priorityBadge?.label}
                  </span>
                </td>
                <td className="py-4 px-4 md:px-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onViewDetails(shipment?.id)}
                      aria-label="View shipment details"
                    >
                      <Icon name="Eye" size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentTable;