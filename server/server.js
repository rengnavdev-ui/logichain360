require('dotenv').config();
const http = require('http');
const app = require('./app');
const vehicleSimulator = require('./services/vehicleSimulator');

// Create HTTP server from Express app
const server = http.createServer(app);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  
  // 🚀 START VEHICLE SIMULATION (18 vehicles)
  vehicleSimulator.initializeFleet(18);
  vehicleSimulator.start();
  
  console.log('✅ Vehicle simulator started with 18 vehicles');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⏹️  SIGTERM received, stopping simulator...');
  vehicleSimulator.stop();
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
