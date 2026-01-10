import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StatusUpdateControls = ({ currentStatus, onStatusUpdate, onPhotoCapture }) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const statusOptions = [
    { value: 'En Route', label: 'En Route', icon: 'Truck', color: 'warning' },
    { value: 'Arrived', label: 'Arrived', icon: 'MapPin', color: 'primary' },
    { value: 'Delivered', label: 'Delivered', icon: 'CheckCircle', color: 'success' },
    { value: 'Delayed', label: 'Delayed', icon: 'Clock', color: 'error' },
  ];

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    setTimeout(() => {
      if (onStatusUpdate) {
        onStatusUpdate(selectedStatus);
      }
      setIsUpdating(false);
    }, 1000);
  };

  const handlePhotoCapture = () => {
    if (onPhotoCapture) {
      onPhotoCapture();
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-4 md:p-6 shadow-glow-md">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center">
          <Icon name="RefreshCw" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">Update Status</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Change delivery progress</p>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
        {statusOptions?.map((option) => (
          <button
            key={option?.value}
            onClick={() => setSelectedStatus(option?.value)}
            className={`w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border-2 transition-all ${
              selectedStatus === option?.value
                ? `border-${option?.color} bg-${option?.color}/10`
                : 'border-border bg-muted/30 hover:bg-muted/50'
            }`}
          >
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${
                selectedStatus === option?.value
                  ? `bg-${option?.color}/20`
                  : 'bg-muted'
              }`}
            >
              <Icon
                name={option?.icon}
                size={20}
                color={selectedStatus === option?.value ? `var(--color-${option?.color})` : 'var(--color-muted-foreground)'}
              />
            </div>
            <div className="flex-1 text-left">
              <p className={`text-sm md:text-base font-medium ${
                selectedStatus === option?.value ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {option?.label}
              </p>
            </div>
            {selectedStatus === option?.value && (
              <Icon name="Check" size={20} color={`var(--color-${option?.color})`} />
            )}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Button
          variant="default"
          size="lg"
          iconName="Upload"
          iconPosition="left"
          loading={isUpdating}
          onClick={handleStatusUpdate}
          disabled={selectedStatus === currentStatus}
          fullWidth
        >
          Update Status
        </Button>

        <Button
          variant="outline"
          size="lg"
          iconName="Camera"
          iconPosition="left"
          onClick={handlePhotoCapture}
          fullWidth
        >
          Capture Proof
        </Button>
      </div>
      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-muted/50 rounded-xl">
        <div className="flex items-start gap-2 md:gap-3">
          <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="flex-shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-muted-foreground">
            Status updates are synced in real-time with dispatch. Photo proof is required for delivery completion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateControls;