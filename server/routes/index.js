// server/routes/index.js
const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const adminRoutes = require('./admin');
const managerRoutes = require('./manager');
const driverRoutes = require('./driver');
const shipmentsRoutes = require('./shipments');

// Mount routes
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/manager', managerRoutes);
router.use('/driver', driverRoutes);
router.use('/shipments', shipmentsRoutes); // Legacy endpoint

// API root - show available endpoints
router.get('/', (req, res) => {
    res.json({
        success: true,
        name: 'LogiChain360 API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth - Authentication (login, register)',
            admin: '/api/admin - Admin dashboard APIs',
            manager: '/api/manager - Manager dashboard APIs',
            driver: '/api/driver - Driver dashboard APIs',
            health: '/api/health - Health check'
        }
    });
});

// Health check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

module.exports = router;

