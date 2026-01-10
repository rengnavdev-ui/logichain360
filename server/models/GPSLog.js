const mongoose = require('mongoose');

const GPSLogSchema = new mongoose.Schema({
  // === TRACKING IDENTIFIERS ===
  trackingId: {
    type: String,
    required: true,
    index: true,
    description: 'Unique tracking ID for shipment (e.g., LC-0024)'
  },
  shipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shipment',
    default: null,
    description: 'Reference to shipment in Shipment collection'
  },
  vehicleId: {
    type: String,
    required: true,
    index: true,
    description: 'Vehicle identifier (e.g., VH-001, SIM-VH-001)'
  },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    description: 'Reference to driver in User collection'
  },

  // === GPS COORDINATES ===
  lat: {
    type: Number,
    required: true,
    min: [-90, 'Latitude must be >= -90'],
    max: [90, 'Latitude must be <= 90'],
    validate: {
      validator: (v) => Number.isFinite(v),
      message: 'Latitude must be a finite number'
    }
  },
  lng: {
    type: Number,
    required: true,
    min: [-180, 'Longitude must be >= -180'],
    max: [180, 'Longitude must be <= 180'],
    validate: {
      validator: (v) => Number.isFinite(v),
      message: 'Longitude must be a finite number'
    }
  },

  // === TELEMETRY DATA ===
  speed: {
    type: Number, // km/h
    default: 0,
    min: [0, 'Speed cannot be negative'],
    max: [200, 'Speed seems unrealistic (max 200 km/h)']
  },
  heading: {
    type: Number, // degrees (0-360)
    default: 0,
    min: [0, 'Heading must be >= 0'],
    max: [360, 'Heading must be <= 360']
  },
  accuracy: {
    type: Number, // meters
    default: null,
    min: [0, 'Accuracy cannot be negative'],
    description: 'GPS accuracy in meters (lower is better)'
  },
  altitude: {
    type: Number, // meters above sea level
    default: null,
    description: 'Altitude in meters'
  },

  // === EVENT SEMANTICS ===
  eventType: {
    type: String,
    enum: {
      values: ['position', 'start', 'stop', 'pickup', 'delivery', 'break', 'emergency'],
      message: '{VALUE} is not a valid event type'
    },
    default: 'position',
    index: true,
    description: 'Type of GPS event for business logic'
  },

  // === METADATA ===
  isSimulated: {
    type: Boolean,
    default: false,
    description: 'Flag to distinguish real GPS from simulated data'
  },
  source: {
    type: String,
    enum: ['mobile', 'web', 'simulator', 'api'],
    default: 'mobile',
    description: 'Source of GPS data'
  },
  batteryLevel: {
    type: Number,
    min: [0, 'Battery level must be >= 0'],
    max: [100, 'Battery level must be <= 100'],
    default: null,
    description: 'Driver device battery level (%)'
  }
}, {
  timestamps: true, // Auto-creates createdAt and updatedAt
  collection: 'gpslogs'
});

// ============================================
// INDEXES (Performance Optimization)
// ============================================

// 1. TTL Index - Auto-delete logs older than 30 days (CRITICAL!)
GPSLogSchema.index(
  { createdAt: 1 }, 
  { 
    expireAfterSeconds: 30 * 24 * 60 * 60, // 30 days
    name: 'ttl_cleanup_30days'
  }
);

// 2. Route History Query - Get GPS points for a shipment
GPSLogSchema.index(
  { trackingId: 1, createdAt: 1 },
  { name: 'route_history' }
);

// 3. Vehicle Tracking - Get latest position of vehicle
GPSLogSchema.index(
  { vehicleId: 1, createdAt: -1 },
  { name: 'vehicle_latest' }
);

// 4. Event Queries - Filter by event type
GPSLogSchema.index(
  { eventType: 1, createdAt: -1 },
  { name: 'events_timeline' }
);

// 5. Location Index - For basic location queries (if needed)
GPSLogSchema.index(
  { lat: 1, lng: 1 },
  { name: 'location_lookup' }
);

// 6. Driver Activity - Get all GPS points for a driver
GPSLogSchema.index(
  { driverId: 1, createdAt: -1 },
  { name: 'driver_activity' }
);

// 7. Shipment Tracking - Get GPS points by shipment
GPSLogSchema.index(
  { shipmentId: 1, createdAt: 1 },
  { name: 'shipment_tracking' }
);

// ============================================
// INSTANCE METHODS
// ============================================

// Calculate distance from this point to another point
GPSLogSchema.methods.distanceTo = function(lat2, lng2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - this.lat) * Math.PI / 180;
  const dLng = (lng2 - this.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.lat * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// Format for API response
GPSLogSchema.methods.toJSON = function() {
  const obj = this.toObject();
  return {
    id: obj._id,
    trackingId: obj.trackingId,
    vehicleId: obj.vehicleId,
    lat: obj.lat,
    lng: obj.lng,
    speed: obj.speed,
    heading: obj.heading,
    accuracy: obj.accuracy,
    eventType: obj.eventType,
    isSimulated: obj.isSimulated,
    timestamp: obj.createdAt
  };
};

// ============================================
// STATIC METHODS (Query Helpers)
// ============================================

// Get latest GPS position for a vehicle
GPSLogSchema.statics.getLatestPosition = async function(vehicleId) {
  return this.findOne({ vehicleId })
    .sort({ createdAt: -1 })
    .select('lat lng speed heading accuracy eventType createdAt')
    .lean();
};

// Get route history for a shipment
GPSLogSchema.statics.getRouteHistory = async function(trackingId, startTime, endTime) {
  const query = { trackingId };
  
  if (startTime || endTime) {
    query.createdAt = {};
    if (startTime) query.createdAt.$gte = new Date(startTime);
    if (endTime) query.createdAt.$lte = new Date(endTime);
  }
  
  return this.find(query)
    .sort({ createdAt: 1 })
    .select('lat lng speed heading eventType createdAt')
    .lean();
};

// Get all active vehicles (last update within 5 minutes)
GPSLogSchema.statics.getActiveVehicles = async function() {
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  
  return this.aggregate([
    {
      $match: {
        createdAt: { $gte: fiveMinutesAgo }
      }
    },
    {
      $sort: { createdAt: -1 }
    },
    {
      $group: {
        _id: '$vehicleId',
        latestLog: { $first: '$$ROOT' }
      }
    },
    {
      $replaceRoot: { newRoot: '$latestLog' }
    }
  ]);
};

// Get delivery events (pickup, delivery) for analytics
GPSLogSchema.statics.getDeliveryEvents = async function(startDate, endDate) {
  return this.find({
    eventType: { $in: ['pickup', 'delivery'] },
    createdAt: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  })
  .populate('shipmentId', 'trackingId origin destination')
  .populate('driverId', 'name email')
  .sort({ createdAt: -1 })
  .lean();
};

// Calculate total distance traveled by vehicle
GPSLogSchema.statics.calculateDistance = async function(vehicleId, startTime, endTime) {
  const logs = await this.find({
    vehicleId,
    createdAt: {
      $gte: new Date(startTime),
      $lte: new Date(endTime)
    }
  })
  .sort({ createdAt: 1 })
  .select('lat lng')
  .lean();

  let totalDistance = 0;
  for (let i = 1; i < logs.length; i++) {
    const prev = logs[i - 1];
    const curr = logs[i];
    
    // Haversine formula
    const R = 6371; // km
    const dLat = (curr.lat - prev.lat) * Math.PI / 180;
    const dLng = (curr.lng - prev.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(prev.lat * Math.PI / 180) * Math.cos(curr.lat * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    totalDistance += R * c;
  }
  
  return totalDistance; // km
};

// ============================================
// PRE-SAVE HOOKS
// ============================================

// Validate coordinates before saving
GPSLogSchema.pre('save', function(next) {
  // Ensure lat/lng are not NaN or Infinity
  if (!Number.isFinite(this.lat) || !Number.isFinite(this.lng)) {
    return next(new Error('Invalid GPS coordinates'));
  }
  
  // Normalize heading to 0-360
  if (this.heading < 0) this.heading = (this.heading % 360) + 360;
  if (this.heading > 360) this.heading = this.heading % 360;
  
  next();
});

// ============================================
// VIRTUAL PROPERTIES
// ============================================

// Format coordinates as string
GPSLogSchema.virtual('coordinates').get(function() {
  return `${this.lat.toFixed(6)}, ${this.lng.toFixed(6)}`;
});

// Age of GPS point in seconds
GPSLogSchema.virtual('age').get(function() {
  return Math.floor((Date.now() - this.createdAt.getTime()) / 1000);
});

// ============================================
// EXPORT
// ============================================

module.exports = mongoose.model('GPSLog', GPSLogSchema);
