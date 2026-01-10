import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContacts = () => {
  const contacts = [
    {
      id: 1,
      name: 'Dispatch Center',
      role: 'Operations Support',
      phone: '+91 98765 43210',
      icon: 'Headphones',
      color: 'primary',
      available: true,
    },
    {
      id: 2,
      name: 'Emergency Helpline',
      role: '24/7 Support',
      phone: '+91 98765 43211',
      icon: 'AlertCircle',
      color: 'error',
      available: true,
    },
    {
      id: 3,
      name: 'Technical Support',
      role: 'App & Device Help',
      phone: '+91 98765 43212',
      icon: 'Wrench',
      color: 'secondary',
      available: true,
    },
  ];

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-4 md:p-6 shadow-glow-md">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-error/10 flex items-center justify-center">
          <Icon name="Phone" size={20} color="var(--color-error)" />
        </div>
        <div>
          <h3 className="text-base md:text-lg font-semibold text-foreground">Emergency Contacts</h3>
          <p className="text-xs md:text-sm text-muted-foreground">Quick access to support</p>
        </div>
      </div>
      <div className="space-y-3">
        {contacts?.map((contact) => (
          <div
            key={contact?.id}
            className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-muted/30 rounded-xl border border-border hover:bg-muted/50 transition-colors"
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-${contact?.color}/10 flex items-center justify-center flex-shrink-0`}>
              <Icon name={contact?.icon} size={20} color={`var(--color-${contact?.color})`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm md:text-base font-medium text-foreground">{contact?.name}</p>
                {contact?.available && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-xs text-success">Available</span>
                  </div>
                )}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground">{contact?.role}</p>
              <p className="text-xs md:text-sm text-muted-foreground font-mono mt-1">{contact?.phone}</p>
            </div>

            <Button
              variant="default"
              size="icon"
              iconName="Phone"
              onClick={() => handleCall(contact?.phone)}
              className="flex-shrink-0"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 md:mt-6 grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          size="sm"
          iconName="MessageSquare"
          iconPosition="left"
          fullWidth
        >
          Chat Support
        </Button>

        <Button
          variant="outline"
          size="sm"
          iconName="MapPin"
          iconPosition="left"
          fullWidth
        >
          Share Location
        </Button>
      </div>
      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-error/5 rounded-xl border border-error/20">
        <div className="flex items-start gap-2 md:gap-3">
          <Icon name="AlertTriangle" size={16} color="var(--color-error)" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs md:text-sm text-foreground font-medium mb-1">Emergency Protocol</p>
            <p className="text-xs text-muted-foreground">
              In case of accident or emergency, immediately contact Emergency Helpline. Your location is automatically shared with dispatch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;