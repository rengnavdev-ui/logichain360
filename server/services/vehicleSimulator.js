const io = require('../socket');

class VehicleSimulator {
  constructor() {
    this.vehicles = [];
    this.simulationInterval = null;
    this.routes = this.generateMumbaiRoutes();
  }

  // Generate realistic routes in Mumbai/Thane area
  generateMumbaiRoutes() {
    return [
      {
        name: 'Mumbai → Thane',
        waypoints: [
          { lat: 19.0760, lng: 72.8777 }, // Mumbai CST
          { lat: 19.0896, lng: 72.8656 }, // Dadar
          { lat: 19.1075, lng: 72.8835 }, // Ghatkopar
          { lat: 19.1136, lng: 72.8697 }  // Thane
        ]
      },
      {
        name: 'Andheri → Navi Mumbai',
        waypoints: [
          { lat: 19.1136, lng: 72.8467 }, // Andheri
          { lat: 19.0896, lng: 72.8656 }, // Dadar
          { lat: 19.0330, lng: 73.0297 }, // Vashi
          { lat: 19.0176, lng: 73.0696 }  // Navi Mumbai
        ]
      },
      {
        name: 'Borivali → Pune',
        waypoints: [
          { lat: 19.2304, lng: 72.8562 }, // Borivali
          { lat: 19.0760, lng: 72.8777 }, // Mumbai
          { lat: 18.9220, lng: 73.7399 }, // Lonavala
          { lat: 18.5204, lng: 73.8567 }  // Pune
        ]
      },
      {
        name: 'South Mumbai → Gurgaon',
        waypoints: [
          { lat: 18.9220, lng: 72.8347 }, // South Mumbai
          { lat: 19.0760, lng: 72.8777 }, // CST
          { lat: 19.2183, lng: 72.9781 }, // Nashik Road
          { lat: 28.4595, lng: 77.0266 }  // Gurgaon
        ]
      },
      {
        name: 'Local Delivery - Thane',
        waypoints: [
          { lat: 19.2183, lng: 72.9781 }, // Thane West
          { lat: 19.2403, lng: 72.9633 }, // Ghodbunder
          { lat: 19.1895, lng: 72.9622 }, // Majiwada
          { lat: 19.1136, lng: 72.8697 }  // Thane Station
        ]
      }
    ];
  }

  // Initialize fleet of simulated vehicles
  initializeFleet(count = 18) {
    this.vehicles = [];

    const vehicleTypes = ['Van', 'Truck', 'Mini-Truck', 'Bike'];
    const statuses = ['In Transit', 'Assigned', 'Delivered', 'Picked Up'];
    const drivers = [
      'Amit Singh', 'Vikram Patel', 'Rahul Kumar', 'Suresh Sharma',
      'Rakesh Gupta', 'Pradeep Verma', 'Ajay Desai', 'Manoj Yadav',
      'Sanjay Mehta', 'Deepak Joshi', 'Anil Reddy', 'Kiran More',
      'Nitin Kapoor', 'Sachin Pawar', 'Ravi Nair', 'Vijay Kulkarni',
      'Ashok Patil', 'Santosh Iyer'
    ];

    for (let i = 0; i < count; i++) {
      const route = this.routes[i % this.routes.length];
      const startWaypoint = route.waypoints[0];

      this.vehicles.push({
        id: `SIM-VH-${String(i + 1).padStart(3, '0')}`,
        driverId: `sim-driver-${i + 1}`,
        driverName: drivers[i % drivers.length],
        vehicleType: vehicleTypes[i % vehicleTypes.length],
        status: statuses[i % statuses.length],
        currentLat: startWaypoint.lat + (Math.random() - 0.5) * 0.01,
        currentLng: startWaypoint.lng + (Math.random() - 0.5) * 0.01,
        speed: 30 + Math.random() * 50, // 30-80 km/h
        heading: Math.random() * 360,
        route: route,
        waypointIndex: 0,
        progress: 0,
        shipmentId: `LC-${String(5000 + i).padStart(4, '0')}`,
        origin: route.name.split(' → ')[0],
        destination: route.name.split(' → ')[1] || route.name.split(' - ')[1]
      });
    }

    console.log(`✅ Initialized ${count} simulated vehicles`);
  }

  // Start real-time simulation
  start() {
    if (this.simulationInterval) {
      console.warn('Simulation already running');
      return;
    }

    console.log('🚀 Starting vehicle simulation...');

    // Update every 2 seconds (realistic GPS update rate)
    this.simulationInterval = setInterval(() => {
      this.updateAllVehicles();
      this.broadcastPositions();
    }, 2000);
  }

  // Stop simulation
  stop() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
      console.log('⏹️ Stopped vehicle simulation');
    }
  }

  // Update positions of all vehicles
  updateAllVehicles() {
    this.vehicles.forEach(vehicle => {
      // Skip delivered vehicles
      if (vehicle.status === 'Delivered') {
        vehicle.speed = 0;
        return;
      }

      // Get current and next waypoint
      const currentWaypoint = vehicle.route.waypoints[vehicle.waypointIndex];
      const nextWaypoint = vehicle.route.waypoints[vehicle.waypointIndex + 1];

      if (!nextWaypoint) {
        // Reached destination
        vehicle.status = 'Delivered';
        vehicle.speed = 0;
        return;
      }

      // Calculate movement (simple linear interpolation)
      const speed = vehicle.speed; // km/h
      const distancePerUpdate = (speed / 3600) * 2; // km moved in 2 seconds

      // Calculate bearing and move vehicle
      const bearing = this.calculateBearing(
        currentWaypoint.lat, currentWaypoint.lng,
        nextWaypoint.lat, nextWaypoint.lng
      );

      vehicle.heading = bearing;

      // Move vehicle towards next waypoint
      const distanceToWaypoint = this.calculateDistance(
        vehicle.currentLat, vehicle.currentLng,
        nextWaypoint.lat, nextWaypoint.lng
      );

      if (distanceToWaypoint < distancePerUpdate) {
        // Reached waypoint, move to next
        vehicle.waypointIndex++;
        vehicle.currentLat = nextWaypoint.lat;
        vehicle.currentLng = nextWaypoint.lng;
      } else {
        // Move towards waypoint
        const fraction = distancePerUpdate / distanceToWaypoint;
        vehicle.currentLat += (nextWaypoint.lat - vehicle.currentLat) * fraction;
        vehicle.currentLng += (nextWaypoint.lng - vehicle.currentLng) * fraction;
      }

      // Add realistic speed variation
      vehicle.speed += (Math.random() - 0.5) * 5;
      vehicle.speed = Math.max(20, Math.min(80, vehicle.speed));

      // Update progress
      const totalWaypoints = vehicle.route.waypoints.length;
      vehicle.progress = Math.round((vehicle.waypointIndex / totalWaypoints) * 100);
    });
  }

  // Broadcast all vehicle positions via Socket.IO
  broadcastPositions() {
    try {
      const positions = this.vehicles.map(v => ({
        vehicleId: v.id,
        driverId: v.driverId,
        driverName: v.driverName,
        vehicleType: v.vehicleType,
        type: v.vehicleType?.toLowerCase() || 'truck', // Add type for marker icons
        status: v.status,
        lat: v.currentLat,
        lng: v.currentLng,
        speed: Math.round(v.speed),
        heading: Math.round(v.heading),
        accuracy: 5 + Math.random() * 10, // Simulated GPS accuracy
        shipmentId: v.shipmentId,
        origin: v.origin,
        destination: v.destination,
        progress: v.progress,
        timestamp: Date.now(),
        isSimulated: true
      }));

      // Safely get socket IO instance
      const socketModule = require('../socket');
      if (socketModule && typeof socketModule.getIO === 'function') {
        const io = socketModule.getIO();
        if (io) {
          io.emit('fleet:update', positions);
        }
      }
    } catch (error) {
      // Silently ignore socket errors - don't crash the simulator
      console.warn('Socket broadcast skipped:', error.message);
    }
  }

  // Get all current vehicle positions
  getAllVehicles() {
    return this.vehicles.map(v => ({
      vehicleId: v.id,
      driverId: v.driverId,
      driverName: v.driverName,
      status: v.status,
      lat: v.currentLat,
      lng: v.currentLng,
      speed: Math.round(v.speed),
      shipmentId: v.shipmentId,
      origin: v.origin,
      destination: v.destination,
      progress: v.progress,
      isSimulated: true
    }));
  }

  // Haversine formula for distance calculation
  calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Calculate bearing between two points
  calculateBearing(lat1, lng1, lat2, lng2) {
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const y = Math.sin(dLng) * Math.cos(lat2 * Math.PI / 180);
    const x = Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
      Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.cos(dLng);
    const bearing = Math.atan2(y, x) * 180 / Math.PI;
    return (bearing + 360) % 360;
  }
}

module.exports = new VehicleSimulator();
