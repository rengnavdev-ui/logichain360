const io = require('../socket');
const User = require('../models/User');
const GPSLog = require('../models/GPSLog');

class GPSService {
  constructor() {
    this.activeDrivers = new Map();
  }

  // Stream GPS update from driver phone
  async handleGPSUpdate(driverId, gpsData) {
    const { lat, lng, speed, heading, accuracy, timestamp } = gpsData;

    // Validate GPS accuracy (must be < 50m for real tracking)
    if (accuracy > 50) {
      console.warn(`Low GPS accuracy: ${accuracy}m for driver ${driverId}`);
    }

    // Update driver's current position in database
    await User.findByIdAndUpdate(driverId, {
      currentLocation: {
        lat,
        lng,
        updatedAt: new Date()
      },
      lastSeen: new Date(),
      speed,
      heading
    });

    // Log GPS point for route history (store every 30 seconds)
    const shouldLog = this.shouldLogGPSPoint(driverId, timestamp);
    if (shouldLog) {
      await GPSLog.create({
        driverId,
        trackingId: `TRK-${driverId?.toString()?.slice(-4)}`, // Fallback tracking id
        vehicleId: 'VH-DEFAULT', // Fallback vehicle id
        lat,
        lng,
        speed,
        heading,
        accuracy,
        timestamp: new Date(timestamp)
      });
    }

    // Store in memory for real-time tracking
    this.activeDrivers.set(driverId, {
      lat,
      lng,
      speed,
      heading,
      accuracy,
      timestamp
    });

    // Broadcast to all admin/manager dashboards
    io.emit('gps:update', {
      driverId,
      lat,
      lng,
      speed,
      heading,
      accuracy,
      timestamp
    });

    return { success: true };
  }

  // Only log every 30 seconds to save database space
  shouldLogGPSPoint(driverId, timestamp) {
    const lastLog = this.activeDrivers.get(driverId);
    if (!lastLog) return true;

    const timeDiff = timestamp - lastLog.timestamp;
    return timeDiff >= 30000; // 30 seconds
  }

  // Get current positions of all active drivers
  getAllActiveDrivers() {
    const drivers = [];
    this.activeDrivers.forEach((data, driverId) => {
      drivers.push({
        driverId,
        ...data
      });
    });
    return drivers;
  }

  // Get route history for a driver
  async getRouteHistory(driverId, startTime, endTime) {
    const logs = await GPSLog.find({
      driver: driverId,
      timestamp: {
        $gte: new Date(startTime),
        $lte: new Date(endTime)
      }
    }).sort({ timestamp: 1 });

    return logs.map(log => ({
      lat: log.lat,
      lng: log.lng,
      speed: log.speed,
      timestamp: log.timestamp
    }));
  }
}

module.exports = new GPSService();
