const express = require('express');
const router = express.Router();
const gpsService = require('../services/gpsService');

// Forwarding Traccar data
// Traccar can be configured to forward data to: http://your-api.com/api/gps/traccar?id={uniqueId}&lat={latitude}&lon={longitude}&speed={speed}&bearing={course}
router.get('/traccar', async (req, res) => {
    try {
        const { id, lat, lon, speed, bearing, alt, acc } = req.query;

        if (id && lat && lon) {
            await gpsService.handleGPSUpdate(id, {
                lat: parseFloat(lat),
                lng: parseFloat(lon),
                speed: parseFloat(speed) || 0,
                heading: parseFloat(bearing) || 0,
                accuracy: parseFloat(acc) || 0,
                timestamp: Date.now()
            });
        }
        res.status(200).send('OK');
    } catch (error) {
        console.error('Traccar forward error:', error);
        res.status(500).send('Error');
    }
});

// Traccar can also send POST
router.post('/traccar', async (req, res) => {
    try {
        // Traccar POST format varies depending on configuration, handles typical one
        const data = req.body;
        if (data && data.device && data.position) {
            await gpsService.handleGPSUpdate(data.device.uniqueId, {
                lat: data.position.latitude,
                lng: data.position.longitude,
                speed: data.position.speed,
                heading: data.position.course,
                accuracy: data.position.accuracy,
                timestamp: data.position.deviceTime
            });
        }
        res.status(200).send('OK');
    } catch (error) {
        console.error('Traccar POST forward error:', error);
        res.status(500).send('Error');
    }
});

module.exports = router;
