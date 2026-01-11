// server/scripts/seedDatabase.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Shipment = require('../models/Shipment');

/**
 * MongoDB Database Seeding Script
 * Creates test users and sample shipments for development/demo
 */

const seedDatabase = async () => {
    try {
        console.log('📦 Starting database seed...');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data (CAUTION: Only for development!)
        await User.deleteMany({});
        await Shipment.deleteMany({});
        console.log('🗑️  Cleared existing data');

        // ============================================
        // SEED USERS
        // ============================================
        const users = [
            {
                email: 'admin@NexLogica.com',
                password: 'admin123',
                name: 'Admin User',
                role: 'admin',
                phone: '+919876543210',
                isActive: true
            },
            {
                email: 'manager@NexLogica.com',
                password: 'manager123',
                name: 'Manager User',
                role: 'manager',
                phone: '+919876543211',
                isActive: true
            },
            {
                email: 'driver1@NexLogica.com',
                password: 'driver123',
                name: 'Rajesh Kumar',
                role: 'driver',
                phone: '+919876543212',
                isActive: true,
                currentLocation: {
                    lat: 28.6139,
                    lng: 77.2090
                }
            },
            {
                email: 'driver2@NexLogica.com',
                password: 'driver123',
                name: 'Amit Singh',
                role: 'driver',
                phone: '+919876543213',
                isActive: true,
                currentLocation: {
                    lat: 28.7041,
                    lng: 77.1025
                }
            },
            {
                email: 'driver3@NexLogica.com',
                password: 'driver123',
                name: 'Priya Sharma',
                role: 'driver',
                phone: '+919876543214',
                isActive: true,
                currentLocation: {
                    lat: 28.5355,
                    lng: 77.3910
                }
            }
        ];

        const createdUsers = await User.create(users);
        console.log(`✅ Created ${createdUsers.length} users`);

        // Get driver IDs
        const drivers = createdUsers.filter(u => u.role === 'driver');

        // ============================================
        // SEED SHIPMENTS
        // ============================================
        const statuses = ['Created', 'PickedUp', 'InTransit', 'Delivered'];
        const shipments = [];

        // Generate 25 sample shipments
        for (let i = 1; i <= 25; i++) {
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
            const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];

            const pickup = {
                lat: 28.5 + Math.random() * 0.3,
                lng: 77.0 + Math.random() * 0.5
            };

            const dropoff = {
                lat: 28.5 + Math.random() * 0.3,
                lng: 77.0 + Math.random() * 0.5
            };

            shipments.push({
                trackingId: `LC360-${String(i).padStart(4, '0')}`,
                sender: {
                    name: `Sender ${i}`,
                    phone: `+9198765432${String(i).padStart(2, '0')}`,
                    address: `Warehouse ${i}, Delhi`
                },
                receiver: {
                    name: `Receiver ${i}`,
                    phone: `+9187654321${String(i).padStart(2, '0')}`,
                    address: `Delivery Point ${i}, Delhi`
                },
                pickup,
                dropoff,
                status: randomStatus,
                priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
                price: Math.floor(Math.random() * 1000) + 500,
                distanceKm: Math.floor(Math.random() * 50) + 10,
                estimatedDelivery: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
                driverId: randomStatus !== 'Created' ? randomDriver._id : null,
                packageDetails: {
                    weight: Math.floor(Math.random() * 50) + 1,
                    dimensions: `${Math.floor(Math.random() * 50)}x${Math.floor(Math.random() * 50)}x${Math.floor(Math.random() * 50)}`,
                    description: `Package ${i} - Electronics/General Cargo`
                },
                carbonOffset: Math.floor(Math.random() * 20) + 5
            });
        }

        const createdShipments = await Shipment.create(shipments);
        console.log(`✅ Created ${createdShipments.length} shipments`);

        // ============================================
        // SUMMARY
        // ============================================
        console.log('\n📊 Seeding Summary:');
        console.log(`   Admins: 1`);
        console.log(`   Managers: 1`);
        console.log(`   Drivers: ${drivers.length}`);
        console.log(`   Shipments: ${createdShipments.length}`);
        console.log(`   Status breakdown:`);
        statuses.forEach(status => {
            const count = createdShipments.filter(s => s.status === status).length;
            console.log(`     - ${status}: ${count}`);
        });

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📝 Test Credentials:');
        console.log('   Admin:   admin@NexLogica.com / admin123');
        console.log('   Manager: manager@NexLogica.com / manager123');
        console.log('   Driver:  driver1@NexLogica.com / driver123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

// Run if executed directly
if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;
