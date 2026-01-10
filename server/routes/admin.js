// server/routes/admin.js
const express = require('express');
const router = express.Router();

const asyncHandler = require('../middleware/asyncHandler');
const { authenticate, requireRole } = require('../middleware/auth');

const blockchainService = require('../services/blockchainService');
const vehicleSimulator = require('../services/vehicleSimulator');

// Models
const Shipment = require('../models/Shipment');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const BlockchainTx = require('../models/BlockchainTx');

// -------------------------------------------------------------------
// GLOBAL ADMIN AUTH
// -------------------------------------------------------------------
router.use(authenticate);
router.use(requireRole('admin'));

// -------------------------------------------------------------------
// ADMIN DASHBOARD STATS
// -------------------------------------------------------------------
router.get('/stats', asyncHandler(async (req, res) => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [
        totalShipments,
        shipmentsToday,
        activeDrivers,
        deliveredToday,
        allDrivers
    ] = await Promise.all([
        Shipment.countDocuments(),
        Shipment.countDocuments({ createdAt: { $gte: todayStart } }),
        User.countDocuments({ role: 'driver', isActive: true }),
        Shipment.find({
            status: 'delivered',
            updatedAt: { $gte: todayStart }
        }).select('distanceKm'),
        User.countDocuments({ role: 'driver' })
    ]);

    const totalDeliveredKm = deliveredToday.reduce(
        (sum, s) => sum + (s.distanceKm || 0), 0
    );

    const co2Saved = Math.round(totalDeliveredKm * 0.06 * 100) / 100;
    const revenueToday = deliveredToday.length * 150;

    res.json({
        success: true,
        data: {
            totalShipments,
            shipmentsToday,
            activeDrivers,
            totalDrivers: allDrivers,
            deliveriesToday: deliveredToday.length,
            co2Saved,
            revenueToday
        }
    });
}));

// -------------------------------------------------------------------
// BLOCKCHAIN AUDIT
// -------------------------------------------------------------------
router.get('/blockchain/audit', asyncHandler(async (req, res) => {
    const { trackingId } = req.query;

    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const skip = (page - 1) * limit;

    const query = trackingId ? { trackingId } : {};

    const [transactions, total] = await Promise.all([
        BlockchainTx.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        BlockchainTx.countDocuments(query)
    ]);

    res.json({
        success: true,
        data: transactions,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    });
}));

// -------------------------------------------------------------------
// LIVE FLEET MAP
// -------------------------------------------------------------------
router.get('/fleet/live', asyncHandler(async (req, res) => {
    const vehicles = await Vehicle.find()
        .populate('driverId', 'name phone avatar')
        .lean();

    const driversWithLocation = await User.find({
        role: 'driver',
        isActive: true,
        'currentLocation.lat': { $exists: true }
    }).lean();

    const fleetData = vehicles.map(v => ({
        vehicleId: v.vehicleId,
        type: v.type,
        licensePlate: v.licensePlate,
        driverId: v.driverId?._id || null,
        driverName: v.driverId?.name || 'Unassigned',
        driverPhone: v.driverId?.phone || null,
        lat: v.lat,
        lng: v.lng,
        speed: v.speed || 0,
        heading: v.heading || 0,
        status: v.status,
        fuelLevel: v.fuelLevel,
        lastUpdated: v.updatedAt
    }));

    for (const driver of driversWithLocation) {
        if (!fleetData.some(v => String(v.driverId) === String(driver._id))) {
            fleetData.push({
                vehicleId: `driver_${driver._id}`,
                type: 'personal',
                driverId: driver._id,
                driverName: driver.name,
                driverPhone: driver.phone,
                lat: driver.currentLocation?.lat,
                lng: driver.currentLocation?.lng,
                speed: 0,
                status: 'mobile',
                lastUpdated: driver.currentLocation?.updatedAt
            });
        }
    }

    res.json({
        success: true,
        count: fleetData.length,
        data: fleetData
    });
}));

// -------------------------------------------------------------------
// SIMULATOR CONTROL (NEW – COPY SAFE)
// -------------------------------------------------------------------

/**
 * GET /api/admin/fleet/simulated
 * Get all simulated vehicles
 */
router.get('/fleet/simulated', asyncHandler(async (req, res) => {
    const vehicles = vehicleSimulator.getAllVehicles();

    res.json({
        success: true,
        count: vehicles.length,
        data: vehicles
    });
}));

/**
 * POST /api/admin/simulator/start
 * Start vehicle simulator
 */
router.post('/simulator/start', asyncHandler(async (req, res) => {
    const { count = 18 } = req.body;

    vehicleSimulator.initializeFleet(count);
    vehicleSimulator.start();

    res.json({
        success: true,
        message: `Simulator started with ${count} vehicles`
    });
}));

/**
 * POST /api/admin/simulator/stop
 * Stop vehicle simulator
 */
router.post('/simulator/stop', asyncHandler(async (req, res) => {
    vehicleSimulator.stop();

    res.json({
        success: true,
        message: 'Simulator stopped'
    });
}));

// -------------------------------------------------------------------
// SUSTAINABILITY METRICS
// -------------------------------------------------------------------
router.get('/sustainability', asyncHandler(async (req, res) => {
    const days = Math.min(365, parseInt(req.query.period) || 30);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const shipments = await Shipment.find({
        status: 'delivered',
        updatedAt: { $gte: startDate }
    }).select('distanceKm').lean();

    const totalDistanceKm = shipments.reduce(
        (sum, s) => sum + (s.distanceKm || 0), 0
    );

    const traditionalCo2 = totalDistanceKm * 0.25;
    const actualCo2 = totalDistanceKm * 0.12;
    const co2Saved = Math.round((traditionalCo2 - actualCo2) * 100) / 100;

    res.json({
        success: true,
        data: {
            totalDistanceKm,
            co2Saved,
            greenTokensMinted: Math.floor(co2Saved / 10)
        }
    });
}));

// -------------------------------------------------------------------
// USERS
// -------------------------------------------------------------------
router.get('/users', asyncHandler(async (req, res) => {
    const limit = Math.min(100, parseInt(req.query.limit) || 20);
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const skip = (page - 1) * limit;

    const query = {};
    if (req.query.role) query.role = req.query.role;

    const [users, total] = await Promise.all([
        User.find(query)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        User.countDocuments(query)
    ]);

    res.json({
        success: true,
        data: users,
        pagination: {
            page,
            limit,
            total,
            pages: Math.ceil(total / limit)
        }
    });
}));

// -------------------------------------------------------------------
// SYSTEM HEALTH
// -------------------------------------------------------------------
router.get('/health', asyncHandler(async (req, res) => {
    const blockchainHealth = await blockchainService.healthCheck();

    res.json({
        success: true,
        data: {
            server: 'healthy',
            database: 'connected',
            blockchain: blockchainHealth,
            timestamp: new Date().toISOString()
        }
    });
}));

module.exports = router;

