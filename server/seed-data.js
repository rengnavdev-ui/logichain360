require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Vehicle = require('./models/Vehicle');
const Shipment = require('./models/Shipment');
const { v4: uuidv4 } = require('uuid');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/logichain360';

// Fleet Data matching simulate-fleet.js
const fleetData = [
    // North India
    { id: 'VH-101', type: 'truck', driver: 'Rajesh Kumar', region: 'North' },
    { id: 'VH-102', type: 'van', driver: 'Suresh Singh', region: 'North' },
    { id: 'VH-103', type: 'truck', driver: 'Amit Verma', region: 'North' },
    // West India
    { id: 'VH-201', type: 'truck', driver: 'Vikram Seth', region: 'West' },
    { id: 'VH-202', type: 'container', driver: 'Rahul Patil', region: 'West' },
    { id: 'VH-203', type: 'van', driver: 'Ganesh Naik', region: 'West' },
    // South India
    { id: 'VH-301', type: 'truck', driver: 'Karthik R', region: 'South' },
    { id: 'VH-302', type: 'truck', driver: 'Mani S', region: 'South' },
    { id: 'VH-303', type: 'container', driver: 'Arjun K', region: 'South' },
    // East India
    { id: 'VH-401', type: 'truck', driver: 'Debasish M', region: 'East' },
    { id: 'VH-402', type: 'van', driver: 'Sourav G', region: 'East' },
    // Central India
    { id: 'VH-501', type: 'truck', driver: 'Ravi Yadav', region: 'Central' },
    { id: 'VH-502', type: 'truck', driver: 'Ankit Tiwari', region: 'Central' },
    // Express
    { id: 'VH-601', type: 'bike', driver: 'Speedy Singh', region: 'Metro' },
    { id: 'VH-602', type: 'bike', driver: 'Rocket Ramesh', region: 'Metro' },
    // Long Haul
    { id: 'VH-701', type: 'truck', driver: 'Big John', region: 'National' },
    { id: 'VH-702', type: 'truck', driver: 'Heavy Harry', region: 'National' },
    { id: 'VH-703', type: 'truck', driver: 'Captain Cool', region: 'National' },
    // New Additions
    { id: 'VH-801', type: 'truck', driver: 'Tenzing N', region: 'NorthEast' },
    { id: 'VH-802', type: 'van', driver: 'Arun Das', region: 'NorthEast' },
    { id: 'VH-901', type: 'truck', driver: 'Balwinder S', region: 'North' },
    { id: 'VH-902', type: 'container', driver: 'Jose P', region: 'South' },
    { id: 'VH-903', type: 'van', driver: 'Green Go', region: 'South' },
    { id: 'VH-904', type: 'bike', driver: 'Fast Eddie', region: 'South' },
];

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await User.deleteMany({});
        await Vehicle.deleteMany({});
        await Shipment.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // 1. Create Admin
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@logichain.com',
            password: 'password123',
            role: 'admin',
            avatar: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
        });
        console.log('👤 Created Admin');

        // 2. Create Manager
        const manager = await User.create({
            name: 'Logistics Manager',
            email: 'manager@logichain.com',
            password: 'password123',
            role: 'manager',
            avatar: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png'
        });
        console.log('👤 Created Manager');

        // 3. Create Drivers & Vehicles
        const drivers = [];
        const vehicles = [];

        for (const data of fleetData) {
            // Create Vehicle
            const vehicle = await Vehicle.create({
                vehicleId: data.id,
                type: data.type,
                licensePlate: `${data.region.substring(0, 2).toUpperCase()}-${Math.floor(10 + Math.random() * 90)}-${data.id.split('-')[1]}`,
                capacity: data.type === 'truck' ? 10000 : 2000,
                status: 'en_route',
                lat: 20.5937 + (Math.random() - 0.5) * 10, // Random init pos
                lng: 78.9629 + (Math.random() - 0.5) * 10,
                speed: Math.floor(Math.random() * 60) + 20,
                fuelLevel: Math.floor(Math.random() * 60) + 40
            });

            // Create Driver
            const driver = await User.create({
                name: data.driver,
                email: `${data.driver.split(' ')[0].toLowerCase()}${data.id.split('-')[1]}@logichain.com`,
                password: 'password123',
                role: 'driver',
                vehicleId: vehicle._id, // Link vehicle
                phone: `+91 ${Math.floor(6000000000 + Math.random() * 3000000000)}`,
                avatar: `https://ui-avatars.com/api/?name=${data.driver.replace(' ', '+')}&background=random`,
                currentLocation: {
                    lat: vehicle.lat,
                    lng: vehicle.lng,
                    updatedAt: new Date()
                }
            });

            // Link driver to vehicle
            vehicle.driverId = driver._id;
            await vehicle.save();

            drivers.push(driver);
            vehicles.push(vehicle);
        }
        console.log(`🚚 Created ${vehicles.length} Vehicles & Drivers`);

        // 4. Create Shipments (One for each driver)
        for (let i = 0; i < drivers.length; i++) {
            await Shipment.create({
                trackingId: `LC-${Math.floor(10000000 + Math.random() * 90000000)}`,
                senderId: manager._id,
                driverId: drivers[i]._id,
                driverName: drivers[i].name,
                pickupLocation: {
                    lat: vehicles[i].lat - 0.5,
                    lng: vehicles[i].lng - 0.5,
                    address: `Warehouse ${String.fromCharCode(65 + i)}`
                },
                dropoffLocation: {
                    lat: vehicles[i].lat + 0.5,
                    lng: vehicles[i].lng + 0.5,
                    address: `Delivery Point ${i + 1}`
                },
                weight: Math.floor(Math.random() * 500) + 50,
                priority: ['normal', 'high', 'urgent'][Math.floor(Math.random() * 3)],
                status: 'in_transit',
                price: Math.floor(Math.random() * 5000) + 1000,
                vehicleType: vehicles[i].type
            });
        }
        console.log(`📦 Created ${drivers.length} Active Shipments`);

        console.log('✨ Seeding Completed Successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Seeding Failed:', error);
        process.exit(1);
    }
};

seedData();
