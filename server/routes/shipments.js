const express = require('express');
const router = express.Router();
const Shipment = require('../models/Shipment');
const { validate } = require('../middleware/validate');
const { v4: uuidv4 } = require('uuid');

// --- Standard CRUD Operations (User Requested) ---

// CREATE shipment
router.post('/', validate({
  body: {
    pickup: { required: true }, // Expecting object or legacy string
    drop: { required: true },   // Expecting object or legacy string
    weight: { type: 'number' }
  }
}), async (req, res, next) => {
  try {
    const { 
        pickup, drop, weight, driverId, status, 
        // New fields
        price, senderWallet, vehicleType, priority 
    } = req.body;

    // Normalize location data (support both legacy 'pickup' and new 'pickupLocation' formats if mixed)
    // The model expects pickupLocation / dropoffLocation
    const pickupLocation = typeof pickup === 'string' ? { address: pickup, lat: 0, lng: 0 } : pickup;
    const dropoffLocation = typeof drop === 'string' ? { address: drop, lat: 0, lng: 0 } : drop;

    const trackingId = `LC-${uuidv4()}`;

    const doc = await Shipment.create({
      trackingId,
      pickupLocation, // Map to schema field
      dropoffLocation, // Map to schema field
      // Also keep legacy fields populated if strict backward compat needed, but Virtuals handle reading
      weight: weight || 0,
      driverId: driverId ?? null,
      status: status ?? 'created',
      price: price || 0,
      senderWallet,
      vehicleType: vehicleType || 'van',
      priority: priority || 'normal'
    });

    return res.status(201).json(doc);
  } catch (err) {
    return next(err);
  }
});

// GET all shipments
router.get('/', async (req, res, next) => {
  try {
    const { driverId, status, senderWallet } = req.query;
    let query = {};
    if (driverId) query.driverId = driverId;
    if (status) query.status = status;
    if (senderWallet) query.senderWallet = senderWallet;

    const docs = await Shipment.find(query).sort({ createdAt: -1 });
    return res.json(docs);
  } catch (err) {
    return next(err);
  }
});

// GET one shipment by id (Direct DB ID)
router.get('/:id', async (req, res, next) => {
  try {
    // Check if it's a valid ObjectId, otherwise try trackingId
    let doc;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        doc = await Shipment.findById(req.params.id);
    } else {
        doc = await Shipment.findOne({ trackingId: req.params.id });
    }
    
    if (!doc) return res.status(404).json({ message: 'Shipment not found' });
    return res.json(doc);
  } catch (err) {
    return next(err);
  }
});

// UPDATE shipment (General)
router.patch('/:id', async (req, res, next) => {
  try {
    const doc = await Shipment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return res.status(404).json({ message: 'Shipment not found' });
    return res.json(doc);
  } catch (err) {
    return next(err);
  }
});

// DELETE shipment
router.delete('/:id', async (req, res, next) => {
  try {
    const doc = await Shipment.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Shipment not found' });
    return res.json({ message: 'Deleted', id: req.params.id });
  } catch (err) {
    return next(err);
  }
});

// --- Specific Business Logic Operations (Refactored Features) ---

// PUT /api/shipments/:trackingId/assign - Assign Driver
router.put('/tracking/:trackingId/assign', async (req, res) => {
    try {
        const { driverId, driverWallet, driverName } = req.body;
        
        const shipment = await Shipment.findOne({ trackingId: req.params.trackingId });
        if (!shipment) return res.status(404).json({ success: false, message: "Shipment not found" });

        shipment.driverId = driverId || shipment.driverId;
        shipment.driverWallet = driverWallet || shipment.driverWallet;
        shipment.driverName = driverName || shipment.driverName;
        shipment.status = 'assigned';
        
        await shipment.save();
        res.json({ success: true, shipment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// PUT /api/shipments/:trackingId/status - Update Status
router.put('/tracking/:trackingId/status', async (req, res) => {
    try {
        const { status, proofOfDelivery } = req.body;
        
        const shipment = await Shipment.findOne({ trackingId: req.params.trackingId });
        if (!shipment) return res.status(404).json({ success: false, message: "Shipment not found" });

        if (status === 'delivered') {
            if (proofOfDelivery) {
                 shipment.proofOfDelivery = {
                    ...proofOfDelivery,
                    confirmedAt: new Date()
                };
            }
            shipment.deliveredAt = new Date();
        }

        shipment.status = status;
        await shipment.save();

        res.json({ success: true, shipment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
