// server/routes/manager.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler');
const { authenticate, requireRole } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const aiService = require('../services/aiService');
const blockchainService = require('../services/blockchainService');

// Models
const Shipment = require('../models/Shipment');
const Warehouse = require('../models/Warehouse');
const Notification = require('../models/Notification');
const User = require('../models/User');

// All manager routes require manager or admin role
router.use(authenticate);
router.use(requireRole('manager', 'admin'));

// Pagination helpers
const parseLimit = (v, def = 20, max = 200) => {
    const n = parseInt(v, 10);
    if (Number.isNaN(n) || n < 1) return def;
    return Math.min(max, n);
};
const parsePage = (v, def = 1) => {
    const n = parseInt(v, 10);
    if (Number.isNaN(n) || n < 1) return def;
    return n;
};

/**
 * GET /api/manager/shipments
 * List shipments with pagination and filters
 */
router.get('/shipments', asyncHandler(async (req, res) => {
    const {
        status,
        priority,
        driverId,
        startDate,
        endDate,
        // pagination handled below
        sort = '-createdAt'
    } = req.query;

    const parseLimit = (v, def = 20) => {
        const n = parseInt(v, 10);
        if (Number.isNaN(n) || n < 1) return def;
        return Math.min(200, n);
    };
    const parsePage = (v, def = 1) => {
        const n = parseInt(v, 10);
        if (Number.isNaN(n) || n < 1) return def;
        return n;
    };
    const limit = parseLimit(req.query.limit, 20);
    const page = parsePage(req.query.page, 1);

    // Build query
    const query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (driverId) query.driverId = driverId;
    if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const [shipments, total] = await Promise.all([
        Shipment.find(query)
            .populate('driverId', 'name phone')
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean(),
        Shipment.countDocuments(query)
    ]);

    // Format response
    const formattedShipments = shipments.map(s => ({
        trackingId: s.trackingId,
        origin: s.origin?.address || s.pickup?.address || 'Unknown',
        destination: s.destination?.address || s.drop?.address || 'Unknown',
        status: s.status,
        priority: s.priority,
        driver: s.driverName || s.driverId?.name || 'Unassigned',
        driverId: s.driverId?._id || s.driverId,
        eta: s.eta,
        distanceKm: s.distanceKm,
        weight: s.weight,
        vehicleType: s.vehicleType,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt
    }));

    res.json({
        success: true,
        data: formattedShipments,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    });
}));

/**
 * POST /api/manager/shipments
 * Create a new shipment
 */
router.post('/shipments',
    validate({
        body: {
            origin: { required: true },
            destination: { required: true },
            priority: { enum: ['low', 'normal', 'high', 'urgent'] },
            vehicleType: { enum: ['bike', 'van', 'truck', 'container'] }
        }
    }),
    asyncHandler(async (req, res) => {
        const { origin, destination, priority, vehicleType, weight, driverId } = req.body;

        // Create shipment
        const shipment = await Shipment.create({
            origin: typeof origin === 'string' ? { address: origin } : origin,
            destination: typeof destination === 'string' ? { address: destination } : destination,
            priority: priority || 'normal',
            vehicleType: vehicleType || 'van',
            weight: weight || 0,
            driverId: driverId || null,
            status: 'created'
        });

        // Record on blockchain (async, don't wait)
        blockchainService.recordShipmentCreated(shipment.trackingId)
            .catch(err => console.error('Blockchain record failed:', err.message));

        // Create notification for assigned driver if any
        if (driverId) {
            await Notification.create({
                recipient: driverId,
                type: 'shipment',
                title: 'New Shipment Assigned',
                message: `Shipment ${shipment.trackingId} has been assigned to you.`,
                data: { trackingId: shipment.trackingId }
            });
        }

        res.status(201).json({
            success: true,
            data: {
                trackingId: shipment.trackingId,
                status: shipment.status,
                message: 'Shipment created successfully'
            }
        });
    })
);

/**
 * PUT /api/manager/shipments/:trackingId
 * Update a shipment
 */
router.put('/shipments/:trackingId', validate({ params: { trackingId: { required: true, type: 'trackingId' } } }), asyncHandler(async (req, res) => {
    const { trackingId } = req.params;
    const updates = req.body;

    // Don't allow updating certain fields
    delete updates._id;
    delete updates.trackingId;
    delete updates.createdAt;

    const shipment = await Shipment.findOneAndUpdate(
        { trackingId },
        updates,
        { new: true, runValidators: true }
    );

    if (!shipment) {
        return res.status(404).json({
            success: false,
            message: 'Shipment not found'
        });
    }

    res.json({
        success: true,
        data: shipment
    });
}));

/**
 * POST /api/manager/shipments/:trackingId/assign
 * Assign driver to shipment
 */
router.post('/shipments/:trackingId/assign',
    validate({
        body: {
            driverId: { required: true, type: 'objectId' }
        }
    }),
    asyncHandler(async (req, res) => {
        const { trackingId } = req.params;
        const { driverId } = req.body;

        // Verify driver exists and is active
        const driver = await User.findOne({ _id: driverId, role: 'driver', isActive: true });
        if (!driver) {
            return res.status(400).json({
                success: false,
                message: 'Driver not found or inactive'
            });
        }

        const shipment = await Shipment.findOneAndUpdate(
            { trackingId },
            {
                driverId: driver._id,
                driverName: driver.name,
                status: 'assigned'
            },
            { new: true }
        );

        if (!shipment) {
            return res.status(404).json({
                success: false,
                message: 'Shipment not found'
            });
        }

        // Notify driver
        await Notification.create({
            recipient: driverId,
            type: 'shipment',
            title: 'Shipment Assigned',
            message: `Shipment ${trackingId} has been assigned to you.`,
            data: { trackingId }
        });

        res.json({
            success: true,
            data: {
                trackingId: shipment.trackingId,
                driverId: driver._id,
                driverName: driver.name,
                status: shipment.status
            }
        });
    })
);

/**
 * POST /api/manager/optimize
 * AI route optimization for multiple shipments
 */
router.post('/optimize',
    validate({
        body: {
            shipments: { required: true, type: 'array' },
            vehicleCapacity: { type: 'number', min: 0, max: 50000 }
        }
    }),
    asyncHandler(async (req, res) => {
        const { shipments: shipmentIds, vehicleCapacity = 1200, vehicleType } = req.body;

        // Fetch shipment details from DB
        const shipments = await Shipment.find({
            $or: [
                { trackingId: { $in: shipmentIds } },
                { _id: { $in: shipmentIds.filter(id => /^[0-9a-fA-F]{24}$/.test(id)) } }
            ]
        }).lean();

        if (shipments.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid shipments found'
            });
        }

        // Call AI service for optimization
        const result = await aiService.optimizeRoute(shipments, {
            vehicleCapacity,
            vehicleType
        });

        res.json({
            success: true,
            data: {
                distanceKm: result.distanceKm,
                etaMinutes: result.etaMinutes,
                co2Kg: result.co2Kg,
                path: result.path,
                source: result.source,
                warning: result.warning,
                optimizedOrder: shipments.map(s => s.trackingId)
            }
        });
    })
);

/**
 * GET /api/manager/warehouses
 * List all warehouses
 */
router.get('/warehouses', asyncHandler(async (req, res) => {
    const { status, city } = req.query;
    const limit = parseLimit(req.query.limit, 50, 100);
    const page = parsePage(req.query.page, 1);

    const query = {};
    if (status) query.status = status;
    if (city) query['location.city'] = new RegExp(city, 'i');

    const skip = (page - 1) * limit;

    const [warehouses, total] = await Promise.all([
        Warehouse.find(query)
            .populate('manager', 'name email')
            .sort({ name: 1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Warehouse.countDocuments(query)
    ]);

    // Add utilization percentage
    const formattedWarehouses = warehouses.map(w => ({
        id: w._id,
        code: w.code,
        name: w.name,
        location: {
            lat: w.location.lat,
            lng: w.location.lng,
            address: w.location.address,
            city: w.location.city
        },
        capacity: w.capacity,
        currentLoad: w.currentLoad,
        utilizationPercent: w.capacity ? Math.round((w.currentLoad / w.capacity) * 100) : 0,
        status: w.status,
        manager: w.manager?.name || 'Unassigned',
        amenities: w.amenities || []
    }));

    res.json({
        success: true,
        data: formattedWarehouses,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    });
}));

/**
 * GET /api/manager/notifications
 * Get notifications for current user
 */
router.get('/notifications', asyncHandler(async (req, res) => {
    const { isRead } = req.query;
    const limit = parseLimit(req.query.limit, 20);
    const page = parsePage(req.query.page, 1);

    const query = { recipient: req.userId };
    if (isRead !== undefined) query.isRead = isRead === 'true';

    const skip = (page - 1) * limit;

    const [notifications, total, unreadCount] = await Promise.all([
        Notification.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Notification.countDocuments(query),
        Notification.countDocuments({ recipient: req.userId, isRead: false })
    ]);

    res.json({
        success: true,
        data: notifications.map(n => ({
            id: n._id,
            type: n.type,
            title: n.title,
            message: n.message,
            data: n.data,
            isRead: n.isRead,
            timestamp: n.createdAt
        })),
        unreadCount,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    });
}));

/**
 * PUT /api/manager/notifications/:id/read
 * Mark notification as read
 */
router.put('/notifications/:id/read', validate({ params: { id: { required: true, type: 'objectId' } } }), asyncHandler(async (req, res) => {
    const notification = await Notification.findOneAndUpdate(
        { _id: req.params.id, recipient: req.userId },
        { isRead: true, readAt: new Date() },
        { new: true }
    );

    if (!notification) {
        return res.status(404).json({
            success: false,
            message: 'Notification not found'
        });
    }

    res.json({
        success: true,
        data: { id: notification._id, isRead: true }
    });
}));

/**
 * GET /api/manager/drivers
 * List available drivers
 */
router.get('/drivers', asyncHandler(async (req, res) => {
    const { available } = req.query;
    const limit = parseLimit(req.query.limit, 50);

    const query = { role: 'driver', isActive: true };

    // If looking for available drivers, exclude those with active shipments
    if (available === 'true') {
        const busyDriverIds = await Shipment.distinct('driverId', {
            status: { $in: ['assigned', 'picked_up', 'in_transit'] }
        });
        query._id = { $nin: busyDriverIds };
    }

    const drivers = await User.find(query)
        .select('name email phone avatar rating totalDeliveries currentLocation')
        .limit(limit)
        .lean();

    res.json({
        success: true,
        data: drivers.map(d => ({
            id: d._id,
            name: d.name,
            phone: d.phone,
            email: d.email,
            avatar: d.avatar,
            rating: d.rating,
            totalDeliveries: d.totalDeliveries,
            hasLocation: !!(d.currentLocation?.lat)
        }))
    });
}));

module.exports = router;
