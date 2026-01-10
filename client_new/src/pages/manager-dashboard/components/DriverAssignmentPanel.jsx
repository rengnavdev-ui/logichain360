import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DriverAssignmentPanel = ({ drivers, onAssign, selectedShipmentId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredDrivers = drivers?.filter(driver => {
    const matchesSearch = driver?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         driver?.vehicleNumber?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesStatus = filterStatus === 'all' || driver?.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    const colors = {
      'Available': 'text-success bg-success/10 border-success/30',
      'On Route': 'text-primary bg-primary/10 border-primary/30',
      'Offline': 'text-muted-foreground bg-muted border-border'
    };
    return colors?.[status] || colors?.['Offline'];
  };

  const getWorkloadColor = (workload) => {
    if (workload >= 80) return 'bg-error';
    if (workload >= 50) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Icon name="Users" size={20} color="var(--color-secondary)" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Available Drivers</h3>
        </div>
        <span className="text-sm text-muted-foreground">{filteredDrivers?.length} drivers</span>
      </div>
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or vehicle number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 md:py-3 bg-surface border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto scrollbar-custom pb-2">
          {['all', 'Available', 'On Route', 'Offline']?.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                filterStatus === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-muted-foreground hover:bg-muted'
              }`}
            >
              {status === 'all' ? 'All Drivers' : status}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-custom">
        {filteredDrivers?.map((driver) => (
          <div 
            key={driver?.id}
            className="p-4 bg-surface rounded-xl border border-border hover:border-primary/50 transition-all"
          >
            <div className="flex items-start gap-4">
              <Image
                src={driver?.avatar}
                alt={driver?.avatarAlt}
                className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm md:text-base font-semibold text-foreground truncate">{driver?.name}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground">{driver?.vehicleNumber}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border flex-shrink-0 ${getStatusColor(driver?.status)}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${driver?.status === 'Available' ? 'bg-success' : driver?.status === 'On Route' ? 'bg-primary' : 'bg-muted-foreground'}`} />
                    {driver?.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={14} className="text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-muted-foreground truncate">{driver?.currentLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Package" size={14} className="text-muted-foreground flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{driver?.activeDeliveries} active</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Workload</span>
                    <span className="text-xs font-medium text-foreground">{driver?.workload}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${getWorkloadColor(driver?.workload)}`}
                      style={{ width: `${driver?.workload}%` }}
                    />
                  </div>
                </div>

                {selectedShipmentId && driver?.status === 'Available' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAssign(selectedShipmentId, driver?.id)}
                    iconName="UserPlus"
                    iconPosition="left"
                    className="w-full mt-3"
                  >
                    Assign to Shipment #{selectedShipmentId}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}

        {filteredDrivers?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Users" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No drivers found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverAssignmentPanel;