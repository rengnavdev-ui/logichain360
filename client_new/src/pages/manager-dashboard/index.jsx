import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleBasedNavigation from '../../components/ui/RoleBasedNavigation';
import QuickActionButton from '../../components/ui/QuickActionButton';
import ToastNotification from '../../components/ui/ToastNotification';
import ShipmentTable from './components/ShipmentTable';
import CreateShipmentModal from './components/CreateShipmentModal';
import DriverAssignmentPanel from './components/DriverAssignmentPanel';
import LiveFleetMonitor from './components/LiveFleetMonitor';
import RouteOptimizationPanel from './components/RouteOptimizationPanel';
import QuickActionsPanel from './components/QuickActionsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedShipmentId, setSelectedShipmentId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('today');

  const shipments = [
    {
      id: 1001,
      origin: "Mumbai Warehouse",
      destination: "Delhi Distribution Center",
      status: "In Transit",
      driver: "Rajesh Kumar",
      progress: 65,
      priority: 1
    },
    {
      id: 1002,
      origin: "Bangalore Hub",
      destination: "Chennai Port",
      status: "Pending",
      driver: null,
      progress: 0,
      priority: 2
    },
    {
      id: 1003,
      origin: "Pune Depot",
      destination: "Hyderabad Center",
      status: "In Transit",
      driver: "Amit Sharma",
      progress: 45,
      priority: 1
    },
    {
      id: 1004,
      origin: "Kolkata Terminal",
      destination: "Guwahati Station",
      status: "Delivered",
      driver: "Suresh Patel",
      progress: 100,
      priority: 3
    },
    {
      id: 1005,
      origin: "Ahmedabad Warehouse",
      destination: "Jaipur Hub",
      status: "Delayed",
      driver: "Vikram Singh",
      progress: 30,
      priority: 1
    },
    {
      id: 1006,
      origin: "Lucknow Center",
      destination: "Kanpur Depot",
      status: "In Transit",
      driver: "Manoj Verma",
      progress: 80,
      priority: 2
    }];


  const drivers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1f3f78660-1763295972306.png",
      avatarAlt: "Professional headshot of Indian male driver with short black hair wearing blue uniform shirt",
      vehicleNumber: "MH-12-AB-1234",
      status: "On Route",
      currentLocation: "Mumbai-Pune Highway",
      activeDeliveries: 2,
      workload: 75
    },
    {
      id: 2,
      name: "Amit Sharma",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13cdf0bc2-1763296311463.png",
      avatarAlt: "Professional headshot of Indian male driver with mustache wearing white uniform shirt",
      vehicleNumber: "DL-01-CD-5678",
      status: "Available",
      currentLocation: "Delhi Warehouse",
      activeDeliveries: 0,
      workload: 20
    },
    {
      id: 3,
      name: "Suresh Patel",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b686b60e-1763292151580.png",
      avatarAlt: "Professional headshot of Indian male driver with glasses wearing green uniform shirt",
      vehicleNumber: "GJ-05-EF-9012",
      status: "Available",
      currentLocation: "Ahmedabad Hub",
      activeDeliveries: 1,
      workload: 35
    },
    {
      id: 4,
      name: "Vikram Singh",
      avatar: "https://images.unsplash.com/photo-1701253747347-0b387a830873",
      avatarAlt: "Professional headshot of Indian male driver with turban wearing orange uniform shirt",
      vehicleNumber: "PB-10-GH-3456",
      status: "On Route",
      currentLocation: "Chandigarh-Delhi Highway",
      activeDeliveries: 3,
      workload: 90
    },
    {
      id: 5,
      name: "Manoj Verma",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1081b0dfb-1763296336108.png",
      avatarAlt: "Professional headshot of Indian male driver with beard wearing red uniform shirt",
      vehicleNumber: "UP-32-IJ-7890",
      status: "Available",
      currentLocation: "Lucknow Terminal",
      activeDeliveries: 1,
      workload: 40
    },
    {
      id: 6,
      name: "Prakash Rao",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1aad7fbce-1763293266966.png",
      avatarAlt: "Professional headshot of Indian male driver with gray hair wearing blue uniform shirt",
      vehicleNumber: "KA-03-KL-2345",
      status: "Offline",
      currentLocation: "Bangalore Depot",
      activeDeliveries: 0,
      workload: 0
    }];


  const fleetData = {
    activeVehicles: 24,
    onRoute: 18,
    alerts: 3,
    avgSpeed: 62,
    recentAlerts: [
      {
        id: 1,
        type: "delay",
        title: "Shipment #1005 Delayed",
        message: "Traffic congestion on Ahmedabad-Jaipur route causing 45-minute delay",
        location: "NH-48, Rajasthan Border",
        time: "10 mins ago"
      },
      {
        id: 2,
        type: "issue",
        title: "Vehicle Maintenance Required",
        message: "Vehicle MH-12-AB-1234 requires immediate service check",
        location: "Mumbai Warehouse",
        time: "25 mins ago"
      },
      {
        id: 3,
        type: "info",
        title: "Route Optimization Complete",
        message: "12 routes optimized successfully with 18% efficiency improvement",
        location: "System",
        time: "1 hour ago"
      }]

  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification
    };
    setNotifications((prev) => [...prev, newNotification]);
  };

  const handleCreateShipment = (formData) => {
    addNotification({
      type: 'success',
      title: 'Shipment Created',
      message: `New shipment from ${formData?.origin} to ${formData?.destination} has been created successfully.`
    });
    setIsCreateModalOpen(false);
  };

  const handleAssignDriver = (shipmentId, driverId) => {
    const driver = drivers?.find((d) => d?.id === driverId);
    addNotification({
      type: 'success',
      title: 'Driver Assigned',
      message: `${driver?.name} has been assigned to shipment #${shipmentId}.`
    });
    setSelectedShipmentId(null);
  };

  const handleViewDetails = (shipmentId) => {
    navigate('/live-tracking-map', { state: { shipmentId } });
  };

  const handleOptimizeRoutes = (result) => {
    addNotification({
      type: 'success',
      title: 'Routes Optimized',
      message: `${result?.routesOptimized} routes optimized. Saved ${result?.timeSaved} hours and ₹${result?.costReduction?.toLocaleString('en-IN')}.`
    });
  };

  const handleQuickAction = (actionId) => {
    const actions = {
      'bulk-assign': () => addNotification({ type: 'info', title: 'Bulk Assignment', message: 'Opening bulk driver assignment interface...' }),
      'emergency-dispatch': () => addNotification({ type: 'warning', title: 'Emergency Dispatch', message: 'Creating emergency delivery request...' }),
      'route-report': () => addNotification({ type: 'info', title: 'Report Generation', message: 'Generating route performance report...' }),
      'fleet-status': () => navigate('/live-tracking-map')
    };
    actions?.[actionId]?.();
  };

  const handleFabAction = (action) => {
    const actions = {
      'create-shipment': () => setIsCreateModalOpen(true),
      'assign-route': () => addNotification({ type: 'info', title: 'Route Assignment', message: 'Opening route assignment panel...' }),
      'report-issue': () => addNotification({ type: 'warning', title: 'Issue Report', message: 'Opening issue reporting form...' })
    };
    actions?.[action]?.();
  };

  const filteredShipments = shipments?.filter((shipment) => {
    if (filterStatus === 'all') return true;
    return shipment?.status === filterStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Shipments' },
    { value: 'In Transit', label: 'In Transit' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Delivered', label: 'Delivered' },
    { value: 'Delayed', label: 'Delayed' }];


  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'custom', label: 'Custom Range' }];


  useEffect(() => {
    document.title = "Manager Dashboard - NexLogica";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedNavigation userRole="manager" connectionStatus="connected" />
      <main className="pt-20 pb-24 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Operations Dashboard
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Manage shipments, assign drivers, and optimize delivery routes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon name="Package" size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h2 className="text-lg md:text-xl font-semibold text-foreground">Active Shipments</h2>
                      <p className="text-xs md:text-sm text-muted-foreground">{filteredShipments?.length} shipments</p>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    onClick={() => setIsCreateModalOpen(true)}
                    iconName="Plus"
                    iconPosition="left"
                    size="default">

                    Create Shipment
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <Select
                    placeholder="Filter by status"
                    options={statusOptions}
                    value={filterStatus}
                    onChange={setFilterStatus}
                    className="flex-1" />

                  <Select
                    placeholder="Date range"
                    options={dateRangeOptions}
                    value={dateRange}
                    onChange={setDateRange}
                    className="flex-1" />

                </div>

                <ShipmentTable
                  shipments={filteredShipments}
                  onViewDetails={handleViewDetails}
                  onAssignDriver={(shipmentId) => setSelectedShipmentId(shipmentId)} />

              </div>

              <RouteOptimizationPanel onOptimize={handleOptimizeRoutes} />
              <QuickActionsPanel onAction={handleQuickAction} />
            </div>

            <div className="space-y-4 md:space-y-6">
              <DriverAssignmentPanel
                drivers={drivers}
                onAssign={handleAssignDriver}
                selectedShipmentId={selectedShipmentId} />

              <LiveFleetMonitor fleetData={fleetData} />
            </div>
          </div>
        </div>
      </main>
      <CreateShipmentModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateShipment} />

      <QuickActionButton userRole="manager" onAction={handleFabAction} />
      <ToastNotification
        notifications={notifications}
        onDismiss={(id) => setNotifications((prev) => prev?.filter((n) => n?.id !== id))} />

    </div>);

};

export default ManagerDashboard;