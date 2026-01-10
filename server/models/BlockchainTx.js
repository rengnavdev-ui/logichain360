// server/models/BlockchainTx.js
const mongoose = require('mongoose');

const BlockchainTxSchema = new mongoose.Schema({
    trackingId: {
        type: String,
        required: true,
        index: true
    },
    shipmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shipment',
        default: null
    },
    txHash: {
        type: String,
        required: true,
        unique: true
    },
    network: {
        type: String,
        enum: ['polygon-amoy', 'polygon-mainnet', 'ethereum', 'local'],
        default: 'polygon-amoy'
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'failed'],
        default: 'pending'
    },
    blockNumber: {
        type: Number,
        default: null
    },
    gasUsed: {
        type: String, // Store as string for big numbers
        default: null
    },
    eventType: {
        type: String,
        enum: ['shipment_created', 'shipment_picked', 'shipment_delivered', 'payment_released', 'escrow_funded'],
        required: true
    },
    data: {
        type: mongoose.Schema.Types.Mixed, // Contract call data
        default: null
    },
    explorerUrl: {
        type: String,
        default: null
    },
    confirmedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

// Generate explorer URL based on network
BlockchainTxSchema.pre('save', function (next) {
    if (this.txHash && !this.explorerUrl) {
        const explorers = {
            'polygon-amoy': 'https://amoy.polygonscan.com/tx/',
            'polygon-mainnet': 'https://polygonscan.com/tx/',
            'ethereum': 'https://etherscan.io/tx/',
            'local': null
        };
        const base = explorers[this.network] || explorers['polygon-amoy'];
        this.explorerUrl = base ? `${base}${this.txHash}` : null;
    }
    next();
});

module.exports = mongoose.model('BlockchainTx', BlockchainTxSchema);
