// server/models/Vehicle.js
const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    vehicleId: {
        type: String,
        unique: true,
        required: true
    },
    type: {
        type: String,
        enum: ['bike', 'van', 'truck', 'container'],
        default: 'van'
    },
    licensePlate: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    capacity: {
        type: Number, // in kg
        default: 1000
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    // Live tracking data
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
    speed: { type: Number, default: 0 }, // km/h
    heading: { type: Number, default: 0 }, // degrees
    status: {
        type: String,
        enum: ['idle', 'en_route', 'loading', 'unloading', 'maintenance', 'offline'],
        default: 'idle'
    },
    // Fuel/Battery tracking
    fuelLevel: { type: Number, default: 100 }, // percentage
    isElectric: { type: Boolean, default: false },
    // Maintenance
    lastMaintenanceAt: { type: Date, default: null },
    nextMaintenanceDue: { type: Date, default: null },
    totalDistanceKm: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', VehicleSchema);
