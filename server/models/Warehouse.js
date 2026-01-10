// server/models/Warehouse.js
const mongoose = require('mongoose');

const WarehouseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        lat: { type: Number, required: true, min: [-90, 'Latitude must be >= -90'], max: [90, 'Latitude must be <= 90'] },
        lng: { type: Number, required: true, min: [-180, 'Longitude must be >= -180'], max: [180, 'Longitude must be <= 180'] },
        address: { type: String, required: true, trim: true },
        city: { type: String, default: null, trim: true },
        country: { type: String, default: null, trim: true }
    },
    capacity: {
        type: Number, // in cubic meters or units
        required: true
    },
    currentLoad: {
        type: Number,
        default: 0
    },
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'maintenance', 'closed'],
        default: 'active'
    },
    operatingHours: {
        open: { type: String, default: '08:00', match: [/^\d{2}:\d{2}$/, 'Invalid time format'] },
        close: { type: String, default: '20:00', match: [/^\d{2}:\d{2}$/, 'Invalid time format'] }
    },
    amenities: [{
        type: String,
        enum: ['cold_storage', 'hazmat', 'loading_dock', 'security', 'cctv']
    }]
}, { timestamps: true });

// Capacity must be greater than 0
WarehouseSchema.path('capacity').validate(function (v) {
    return Number.isFinite(v) && v > 0;
}, 'Capacity must be greater than 0');

// currentLoad must be between 0 and capacity (if capacity defined)
WarehouseSchema.path('currentLoad').validate(function (v) {
    if (!Number.isFinite(v)) return false;
    if (v < 0) return false;
    if (!this.capacity) return true;
    return v <= this.capacity;
}, 'currentLoad must be >= 0 and <= capacity');

// Validate operating hours: open < close (using pre-validate hook for nested objects)
WarehouseSchema.pre('validate', function (next) {
    const val = this.operatingHours;
    if (!val || !val.open || !val.close) return next();
    try {
        const openParts = val.open.split(':').map(Number);
        const closeParts = val.close.split(':').map(Number);
        if (openParts.length !== 2 || closeParts.length !== 2) {
            return next(new Error('Invalid time format for operatingHours'));
        }
        const openMinutes = openParts[0] * 60 + openParts[1];
        const closeMinutes = closeParts[0] * 60 + closeParts[1];
        if (openMinutes >= closeMinutes) {
            return next(new Error('operatingHours.open must be before operatingHours.close'));
        }
        next();
    } catch (e) {
        next(new Error('Invalid operatingHours format'));
    }
});

// Virtual for capacity utilization percentage (clamped to 0-100)
WarehouseSchema.virtual('utilizationPercent').get(function () {
    if (!this.capacity) return 0;
    const pct = Math.round((this.currentLoad / this.capacity) * 100);
    return Math.min(100, Math.max(0, pct));
});

module.exports = mongoose.model('Warehouse', WarehouseSchema);
