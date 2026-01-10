import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import QuickActionButton from '../../components/ui/QuickActionButton';
import ToastNotification from '../../components/ui/ToastNotification';
import DeliveryCard from './components/DeliveryCard';
import NavigationMap from './components/NavigationMap';
import VoiceCommandPanel from './components/VoiceCommandPanel';
import StatusUpdateControls from './components/StatusUpdateControls';
import EmergencyContacts from './components/EmergencyContacts';
import OfflineIndicator from './components/OfflineIndicator';
import DeliveryCompletionModal from './components/DeliveryCompletionModal';

const DriverPWAApp = () => {
  const navigate = useNavigate();
  const [connectionStatus, setConnectionStatus] = useState('connected');
  const [notifications, setNotifications] = useState([]);
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);

  const [currentDelivery, setCurrentDelivery] = useState({
    id: 'DLV-2025-00847',
    status: 'En Route',
    pickupLocation: 'LogiChain Warehouse, Sector 18, Gurugram, Haryana 122015',
    pickupTime: '09:30 AM',
    destination: 'Tech Park Plaza, MG Road, Bengaluru, Karnataka 560001',
    destinationCoords: { lat: 12.9716, lng: 77.5946 },
    eta: '2:45 PM',
    cargoType: 'Electronics',
    weight: '450 kg',
    distance: '12.5 km',
    priority: 'High',
    customerInfo: {
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17de2c40c-1763294952850.png",
      avatarAlt: 'Professional headshot of Indian man with short black hair wearing blue formal shirt'
    }
  });

  useEffect(() => {
    const statusInterval = setInterval(() => {
      const statuses = ['connected', 'syncing', 'connected'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
      setConnectionStatus(randomStatus);
    }, 10000);

    return () => clearInterval(statusInterval);
  }, []);

  const handleStatusUpdate = (newStatus) => {
    setCurrentDelivery((prev) => ({ ...prev, status: newStatus }));
    addNotification({
      type: 'success',
      title: 'Status Updated',
      message: `Delivery status changed to ${newStatus}`
    });

    if (newStatus === 'Delivered') {
      setIsCompletionModalOpen(true);
    }
  };

  const handleVoiceCommand = (command) => {
    addNotification({
      type: 'info',
      title: 'Voice Command',
      message: `Executed: ${command}`
    });
  };

  const handlePhotoCapture = () => {
    addNotification({
      type: 'success',
      title: 'Photo Captured',
      message: 'Delivery proof photo saved successfully'
    });
  };

  const handleDeliveryComplete = (completionData) => {
    addNotification({
      type: 'success',
      title: 'Delivery Completed',
      message: 'Delivery verified on blockchain successfully'
    });
    setTimeout(() => {
      navigate('/live-tracking-map');
    }, 2000);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'mark-delivered':
        setCurrentDelivery((prev) => ({ ...prev, status: 'Delivered' }));
        setIsCompletionModalOpen(true);
        break;
      case 'delay-report':
        addNotification({
          type: 'warning',
          title: 'Delay Reported',
          message: 'Dispatch has been notified of the delay'
        });
        break;
      case 'report-issue':
        addNotification({
          type: 'info',
          title: 'Issue Reported',
          message: 'Support team will contact you shortly'
        });
        break;
      default:
        break;
    }
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const handleDismissNotification = (id) => {
    setNotifications((prev) => prev?.filter((n) => n?.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userRole="driver" connectionStatus={connectionStatus} />
      <OfflineIndicator />
      <ToastNotification notifications={notifications} onDismiss={handleDismissNotification} />
      <QuickActionButton userRole="driver" onAction={handleQuickAction} />
      <main className="pt-20 pb-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Active Delivery
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Manage your current delivery with real-time navigation and updates
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <DeliveryCard delivery={currentDelivery} onStatusUpdate={handleStatusUpdate} />
              <NavigationMap delivery={currentDelivery} />
              <VoiceCommandPanel onVoiceCommand={handleVoiceCommand} />
            </div>

            <div className="space-y-4 md:space-y-6">
              <StatusUpdateControls
                currentStatus={currentDelivery?.status}
                onStatusUpdate={handleStatusUpdate}
                onPhotoCapture={handlePhotoCapture} />

              <EmergencyContacts />
            </div>
          </div>
        </div>
      </main>
      <DeliveryCompletionModal
        isOpen={isCompletionModalOpen}
        onClose={() => setIsCompletionModalOpen(false)}
        onComplete={handleDeliveryComplete}
        delivery={currentDelivery} />

    </div>);

};

export default DriverPWAApp;