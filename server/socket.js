const socketIo = require('socket.io');
const gpsService = require('./services/gpsService');

let io;

module.exports = {
  init: (server) => {
    io = socketIo(server, {
      cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:4028',
        methods: ['GET', 'POST']
      }
    });

    io.on('connection', (socket) => {
      console.log('Socket connected:', socket.id);

      // ✅ REAL GPS STREAMING FROM DRIVER PHONE
      socket.on('gps:stream', async (data) => {
        try {
          const { driverId, lat, lng, speed, heading, accuracy, timestamp } = data;

          // Process GPS update
          await gpsService.handleGPSUpdate(driverId, {
            lat,
            lng,
            speed,
            heading,
            accuracy,
            timestamp: timestamp || Date.now()
          });

          // Acknowledge to driver
          socket.emit('gps:ack', {
            success: true,
            timestamp: Date.now()
          });
        } catch (error) {
          console.error('GPS stream error:', error);
          socket.emit('gps:error', {
            error: error.message
          });
        }
      });

      // Get all active drivers (for admin dashboard)
      socket.on('gps:getActive', () => {
        const activeDrivers = gpsService.getAllActiveDrivers();
        socket.emit('gps:activeList', activeDrivers);
      });

      // Get route history
      socket.on('gps:getHistory', async (data) => {
        const { driverId, startTime, endTime } = data;
        const history = await gpsService.getRouteHistory(driverId, startTime, endTime);
        socket.emit('gps:history', history);
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
      });
    });

    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error('Socket.io not initialized!');
    }
    return io;
  }
};
