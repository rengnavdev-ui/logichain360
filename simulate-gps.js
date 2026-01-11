const { io } = require('socket.io-client');

const socket = io('http://localhost:5000');

const driverId = '65a1234567890abcdef12345'; // Example MongoDB ID
const vehicleId = 'VH-001';

console.log('🚀 Starting GPS Simulator...');

socket.on('connect', () => {
    console.log('✅ Connected to NexLogica Server');

    let lat = 19.0760;
    let lng = 72.8777;

    setInterval(() => {
        lat += (Math.random() - 0.5) * 0.001;
        lng += (Math.random() - 0.5) * 0.001;
        const speed = 40 + Math.random() * 20;

        console.log(`Sending update: ${lat.toFixed(4)}, ${lng.toFixed(4)} at ${speed.toFixed(1)} km/h`);

        socket.emit('gps:stream', {
            driverId,
            lat,
            lng,
            speed,
            heading: Math.random() * 360,
            accuracy: 10,
            timestamp: Date.now()
        });
    }, 2000);
});

socket.on('gps:ack', (data) => {
    console.log('📡 Server acknowledged:', data.timestamp);
});

socket.on('disconnect', () => {
    console.log('❌ Disconnected');
});
