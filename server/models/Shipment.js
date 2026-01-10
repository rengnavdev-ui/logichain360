const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const shipmentSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    unique: true,
    default: () => `LC-${uuidv4()}`
  },
  
  // Parties involved
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  senderWallet: { type: String, trim: true }, // Blockchain wallet address
  
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  driverWallet: { type: String, trim: true }, // Blockchain wallet address
  driverName: { type: String, default: null },

  // Locations
  pickupLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true }
  },
  dropoffLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true }
  },

  // Logistics Details
  weight: { type: Number, default: 0 },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  vehicleType: {
    type: String,
    enum: ['bike', 'van', 'truck', 'container'],
    default: 'van'
  },
  eta: { type: Date, default: null },
  distanceKm: { type: Number, default: null },

  // Status & Timestamps
  status: { 
    type: String, 
    enum: ['created', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled'], 
    default: 'created' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deliveredAt: { type: Date },

  // Blockchain & Payment
  price: { type: Number, required: true },
  escrowContract: { type: String, trim: true }, // Address of specific escrow contract if applicable
  blockchainTx: { type: String, trim: true },   // Transaction hash on blockchain

  // Proof of Delivery
  proofOfDelivery: {
    photo: String,     // URL or IPFS hash
    signature: String,
    confirmedAt: Date
  }
}, { timestamps: true });

// Virtuals for backward compatibility or convenience
shipmentSchema.virtual('origin').get(function() {
  return this.pickupLocation;
});

shipmentSchema.virtual('destination').get(function() {
  return this.dropoffLocation;
});

module.exports = mongoose.model('Shipment', shipmentSchema);
