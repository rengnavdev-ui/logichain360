// server/routes/driver.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const asyncHandler = require('../middleware/asyncHandler');
const { authenticate, requireRole } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const blockchainService = require('../services/blockchainService');
const crypto = require('crypto');

// Models
const Shipment = require('../models/Shipment');
const GPSLog = require('../models/GPSLog');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Notification = require('../models/Notification');

// Configure multer for file uploads (proof of delivery)
const uploadDir = path.join(__dirname, '..', 'uploads', 'proof');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        const ext = path.extname(file.originalname);
        const id = req.body?.trackingId || req.params?.trackingId || 'unknown';
        cb(null, `${id}-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mime = allowedTypes.test(file.mimetype);
        if (ext && mime) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// All driver routes require driver role (or admin for testing)
router.use(authenticate);
router.use(requireRole('driver', 'admin'));

/**
 * GET /api/driver/shipment/active
 * Get driver's current active shipment
 */
router.get('/shipment/active', asyncHandler(async (req, res) => {
    const driverId = req.userId;

    // Find active shipment for this driver
    const shipment = await Shipment.findOne({
        driverId,
        status: { $in: ['assigned', 'picked_up', 'in_transit'] }
    }).lean();

    if (!shipment) {
        return res.json({
            success: true,
            data: null,
            message: 'No active shipment'
        });
    }

    res.json({
        success: true,
        data: {
            trackingId: shipment.trackingId,
            pickup: {
                lat: shipment.origin?.lat || shipment.pickup?.lat,
                lng: shipment.origin?.lng || shipment.pickup?.lng,
                address: shipment.origin?.address || shipment.pickup?.address
            },
            drop: {
                lat: shipment.destination?.lat || shipment.drop?.lat,
                lng: shipment.destination?.lng || shipment.drop?.lng,
                address: shipment.destination?.address || shipment.drop?.address
            },
            eta: shipment.eta,
            status: shipment.status,
            priority: shipment.priority,
            weight: shipment.weight,
            distanceKm: shipment.distanceKm,
            createdAt: shipment.createdAt
        }
    });
}));

/**
 * GET /api/driver/shipments
 * Get all shipments for this driver
 */
router.get('/shipments', asyncHandler(async (req, res) => {
    const { status } = req.query;
    const parseLimit = (v, def = 20) => {
        const n = parseInt(v, 10);
        if (Number.isNaN(n) || n < 1) return def;
        return Math.min(100, n);
    };
    const parsePage = (v, def = 1) => {
        const n = parseInt(v, 10);
        if (Number.isNaN(n) || n < 1) return def;
        return n;
    };
    const limit = parseLimit(req.query.limit, 20);
    const page = parsePage(req.query.page, 1);
    const driverId = req.userId;

    const query = { driverId };
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const [shipments, total] = await Promise.all([
        Shipment.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Shipment.countDocuments(query)
    ]);

    res.json({
        success: true,
        data: shipments.map(s => ({
            trackingId: s.trackingId,
            pickup: s.origin?.address || s.pickup?.address,
            drop: s.destination?.address || s.drop?.address,
            status: s.status,
            priority: s.priority,
            eta: s.eta,
            createdAt: s.createdAt
        })),
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    });
}));

/**
 * GET /api/driver/route/:trackingId
 * Get navigation route for a shipment
 */
router.get('/route/:trackingId',
    validate({
        params: {
            trackingId: { required: true, type: 'trackingId' }
        }
    }),
    asyncHandler(async (req, res) => {
        const { trackingId } = req.params;

        // Get shipment
        const shipment = await Shipment.findOne({ trackingId }).lean();
        if (!shipment) {
            return res.status(404).json({
                success: false,
                message: 'Shipment not found'
            });
        }

        // Get driver's current location
        const driver = await User.findById(req.userId).select('currentLocation').lean();

        // Get GPS history for this shipment
        const gpsHistory = await GPSLog.find({ trackingId })
            .sort({ createdAt: 1 })
            .limit(100)
            .lean();

        // Build path: current location → pickup → dropoff
        const origin = shipment.origin || shipment.pickup;
        const destination = shipment.destination || shipment.drop;

        const path = [];

        // Add driver's current location if available
        if (driver?.currentLocation?.lat) {
            path.push({
                lat: driver.currentLocation.lat,
                lng: driver.currentLocation.lng,
                type: 'current'
            });
        }

        // Add pickup
        if (origin?.lat && origin?.lng) {
            path.push({
                lat: origin.lat,
                lng: origin.lng,
                type: 'pickup',
                address: origin.address
            });
        }

        // Add dropoff
        if (destination?.lat && destination?.lng) {
            path.push({
                lat: destination.lat,
                lng: destination.lng,
                type: 'dropoff',
                address: destination.address
            });
        }

        // Calculate simple distance
        let distance = 0;
        for (let i = 1; i < path.length; i++) {
            distance += haversineDistance(
                path[i - 1].lat, path[i - 1].lng,
                path[i].lat, path[i].lng
            );
        }

        // Estimate ETA (40 km/h average)
        const etaMinutes = Math.round((distance / 40) * 60);

        res.json({
            success: true,
            data: {
                trackingId,
                path,
                distance: Math.round(distance * 10) / 10,
                eta: etaMinutes,
                gpsHistory: gpsHistory.map(g => ({
                    lat: g.lat,
                    lng: g.lng,
                    timestamp: g.createdAt
                }))
            }
        });
    })
);

/**
 * POST /api/driver/gps/update
 * Update driver's GPS position
 */
router.post('/gps/update',
    validate({
        body: {
            lat: { required: true, type: 'lat' },
            lng: { required: true, type: 'lng' },
            speed: { type: 'number', min: 0, max: 300 }
        }
    }),
    asyncHandler(async (req, res) => {
        const { trackingId, lat, lng, speed = 0, heading, accuracy, altitude } = req.body;
        const driverId = req.userId;

        // Update driver's current location
        await User.findByIdAndUpdate(driverId, {
            'currentLocation.lat': lat,
            'currentLocation.lng': lng,
            'currentLocation.updatedAt': new Date()
        });

        // If driver has a vehicle, update that too
        await Vehicle.findOneAndUpdate(
            { driverId },
            { lat, lng, speed, heading, updatedAt: new Date() }
        );

        // If trackingId provided, log GPS for that shipment
        if (trackingId) {
            await GPSLog.create({
                trackingId,
                driverId,
                lat,
                lng,
                speed,
                heading,
                accuracy,
                altitude,
                eventType: 'position'
            });
        }

        res.json({
            success: true,
            status: 'ok',
            timestamp: new Date().toISOString()
        });
    })
);

/**
 * POST /api/driver/shipment/:trackingId/pickup
 * Mark shipment as picked up
 */
router.post('/shipment/:trackingId/pickup', asyncHandler(async (req, res) => {
    const { trackingId } = req.params;
    const driverId = req.userId;

    const shipment = await Shipment.findOneAndUpdate(
        { trackingId, driverId, status: 'assigned' },
        { status: 'picked_up' },
        { new: true }
    );

    if (!shipment) {
        return res.status(404).json({
            success: false,
            message: 'Shipment not found or not assigned to you'
        });
    }

    // Log GPS event
    const { lat, lng } = req.body;
    if (lat && lng) {
        await GPSLog.create({
            trackingId,
            driverId,
            lat,
            lng,
            eventType: 'pickup'
        });
    }

    res.json({
        success: true,
        data: {
            trackingId: shipment.trackingId,
            status: 'picked_up'
        }
    });
}));

/**
 * POST /api/driver/shipment/:trackingId/in-transit
 * Mark shipment as in transit
 */
router.post('/shipment/:trackingId/in-transit', asyncHandler(async (req, res) => {
    const { trackingId } = req.params;
    const driverId = req.userId;

    const shipment = await Shipment.findOneAndUpdate(
        { trackingId, driverId, status: 'picked_up' },
        { status: 'in_transit' },
        { new: true }
    );

    if (!shipment) {
        return res.status(404).json({
            success: false,
            message: 'Shipment not found or not in correct state'
        });
    }

    res.json({
        success: true,
        data: {
            trackingId: shipment.trackingId,
            status: 'in_transit'
        }
    });
}));

/**
 * POST /api/driver/delivery/confirm
 * Confirm delivery with photo/signature proof
 */
router.post('/delivery/confirm',
    upload.fields([
        { name: 'photo', maxCount: 1 },
        { name: 'signature', maxCount: 1 }
    ]),
    validate({
        body: {
            trackingId: { required: true, type: 'trackingId' },
            lat: { type: 'lat' },
            lng: { type: 'lng' }
        }
    }),
    asyncHandler(async (req, res) => {
        const { trackingId, lat, lng } = req.body;
        const driverId = req.userId;

        if (!trackingId) {
            return res.status(400).json({
                success: false,
                message: 'trackingId is required'
            });
        }

        // Find and update shipment
        const shipment = await Shipment.findOne({
            trackingId,
            driverId,
            status: { $in: ['picked_up', 'in_transit'] }
        });

        if (!shipment) {
            return res.status(404).json({
                success: false,
                message: 'Shipment not found or cannot be delivered'
            });
        }

        // Get uploaded files
        const photoFile = req.files?.photo?.[0];
        const signatureFile = req.files?.signature?.[0];

        // Update shipment with proof
        shipment.status = 'delivered';
        shipment.proofOfDelivery = {
            photo: photoFile?.filename || null,
            signature: signatureFile?.filename || null,
            confirmedAt: new Date()
        };
        await shipment.save();

        // Log delivery GPS event - validate coordinates before creating GPSLog
        if (lat != null && lng != null) {
            const parsedLat = parseFloat(String(lat).trim());
            const parsedLng = parseFloat(String(lng).trim());
            const isFiniteLat = Number.isFinite(parsedLat);
            const isFiniteLng = Number.isFinite(parsedLng);
            const latOk = isFiniteLat && parsedLat >= -90 && parsedLat <= 90;
            const lngOk = isFiniteLng && parsedLng >= -180 && parsedLng <= 180;
            if (latOk && lngOk) {
                await GPSLog.create({
                    trackingId,
                    driverId,
                    lat: parsedLat,
                    lng: parsedLng,
                    eventType: 'delivery'
                });
            } else {
                console.warn('Invalid delivery GPS coordinates, skipping GPSLog creation', { trackingId, lat: parsedLat, lng: parsedLng });
            }
        }

        // Record on blockchain using a cryptographic proof hash
        const payload = `${trackingId}|${shipment.proofOfDelivery.confirmedAt.getTime()}`;
        const proofHash = crypto.createHash('sha256').update(payload).digest('hex');
        const proofHex = `0x${proofHash}`;
        const blockchainResult = await blockchainService.recordDeliveryConfirmed(trackingId, proofHex);

        // Update driver stats
        await User.findByIdAndUpdate(driverId, {
            $inc: { totalDeliveries: 1 }
        });

        // Create notification
        await Notification.create({
            recipient: driverId,
            type: 'success',
            title: 'Delivery Completed',
            message: `Shipment ${trackingId} delivered successfully!`,
            data: { trackingId }
        });

        res.json({
            success: true,
            data: {
                trackingId: shipment.trackingId,
                status: 'delivered',
                blockchainTx: blockchainResult.txHash || null,
                paymentStatus: blockchainResult.success ? 'released' : 'pending',
                explorerUrl: blockchainResult.explorerUrl || null,
                warning: blockchainResult.warning || null
            }
        });
    })
);

/**
 * GET /api/driver/notifications
 * Get driver's notifications
 */
router.get('/notifications', asyncHandler(async (req, res) => {
    const parseLimit = (v, def) => {
        const n = parseInt(v, 10);
        if (Number.isNaN(n) || n < 1) return def;
        return Math.min(100, n);
    };
    const limit = parseLimit(req.query.limit, 20);

    const notifications = await Notification.find({ recipient: req.userId })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();

    res.json({
        success: true,
        data: notifications.map(n => ({
            id: n._id,
            type: n.type,
            title: n.title,
            message: n.message,
            isRead: n.isRead,
            timestamp: n.createdAt
        }))
    });
}));

/**
 * GET /api/driver/stats
 * Get driver's personal statistics
 */
router.get('/stats', asyncHandler(async (req, res) => {
    const driverId = req.userId;

    const [driver, todayDeliveries, weekDeliveries] = await Promise.all([
        User.findById(driverId).select('name totalDeliveries rating').lean(),
        Shipment.countDocuments({
            driverId,
            status: 'delivered',
            'proofOfDelivery.confirmedAt': { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
        }),
        Shipment.countDocuments({
            driverId,
            status: 'delivered',
            'proofOfDelivery.confirmedAt': { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        })
    ]);

    res.json({
        success: true,
        data: {
            name: driver.name,
            totalDeliveries: driver.totalDeliveries,
            rating: driver.rating,
            todayDeliveries,
            // Use delivery timestamp instead of updatedAt for delivery counts
            weekDeliveries
        }
    });
}));

// Helper function: Haversine distance calculation
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

module.exports = router;
