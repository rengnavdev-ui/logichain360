// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        select: false // Don't include password in queries by default
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['admin', 'manager', 'driver'],
        default: 'driver'
    },
    phone: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: true
    },
    // Driver-specific fields
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        default: null
    },
    currentLocation: {
        lat: { type: Number, default: null, min: -90, max: 90, validate: { validator: v => v == null ? true : Number.isFinite(v), message: 'Latitude must be a finite number between -90 and 90' } },
        lng: { type: Number, default: null, min: -180, max: 180, validate: { validator: v => v == null ? true : Number.isFinite(v), message: 'Longitude must be a finite number between -180 and 180' } },
        updatedAt: { type: Date, default: null }
    },
    // Stats
    totalDeliveries: { type: Number, default: 0 },
    rating: { type: Number, default: 5.0, min: 0, max: 5 }
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Get public profile (without sensitive data)
UserSchema.methods.toPublicJSON = function () {
    return {
        id: this._id,
        email: this.email,
        name: this.name,
        role: this.role,
        phone: this.phone,
        avatar: this.avatar,
        isActive: this.isActive
    };
};

module.exports = mongoose.model('User', UserSchema);
