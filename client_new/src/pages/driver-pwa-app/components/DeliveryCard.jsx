import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DeliveryCard = ({ delivery, onStatusUpdate }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'En Route':
        return 'text-warning border-warning';
      case 'Arrived':
        return 'text-primary border-primary';
      case 'Delivered':
        return 'text-success border-success';
      default:
        return 'text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-4 md:p-6 shadow-glow-md">
      <div className="flex items-start justify-between mb-4 md:mb-6">
        <div className="flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
            Current Delivery
          </h3>
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getStatusColor(delivery?.status)}`}>
            <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span className="text-sm font-medium">{delivery?.status}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground mb-1">Delivery ID</p>
          <p className="text-base md:text-lg font-semibold text-foreground font-mono">
            {delivery?.id}
          </p>
        </div>
      </div>
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon name="MapPin" size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">Pickup Location</p>
            <p className="text-sm md:text-base font-medium text-foreground line-clamp-2">
              {delivery?.pickupLocation}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{delivery?.pickupTime}</p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full h-px bg-border relative">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface border-2 border-primary flex items-center justify-center">
              <Icon name="ArrowDown" size={16} color="var(--color-primary)" />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
            <Icon name="MapPinned" size={20} color="var(--color-success)" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-muted-foreground mb-1">Destination</p>
            <p className="text-sm md:text-base font-medium text-foreground line-clamp-2">
              {delivery?.destination}
            </p>
            <p className="text-xs text-muted-foreground mt-1">ETA: {delivery?.eta}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Cargo Type</p>
            <p className="text-sm md:text-base font-medium text-foreground">{delivery?.cargoType}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Weight</p>
            <p className="text-sm md:text-base font-medium text-foreground">{delivery?.weight}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Distance</p>
            <p className="text-sm md:text-base font-medium text-foreground">{delivery?.distance}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Priority</p>
            <p className="text-sm md:text-base font-medium text-warning">{delivery?.priority}</p>
          </div>
        </div>

        {delivery?.customerInfo && (
          <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-muted/50 rounded-xl">
            <Image
              src={delivery?.customerInfo?.avatar}
              alt={delivery?.customerInfo?.avatarAlt}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm md:text-base font-medium text-foreground">{delivery?.customerInfo?.name}</p>
              <p className="text-xs md:text-sm text-muted-foreground">{delivery?.customerInfo?.phone}</p>
            </div>
            <button
              onClick={() => window.open(`tel:${delivery?.customerInfo?.phone}`, '_self')}
              className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label="Call customer"
            >
              <Icon name="Phone" size={18} color="var(--color-primary)" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryCard;