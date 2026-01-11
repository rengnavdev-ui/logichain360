// Manual user registration via API
const http = require('http');

function registerUser(userData) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(userData);

        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/auth/register',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                console.log(`\n${userData.role.toUpperCase()}: ${userData.email}`);
                console.log(`Status: ${res.statusCode}`);
                try {
                    const json = JSON.parse(body);
                    console.log('Response:', json.success ? '✅ Created' : `❌ ${json.message}`);
                    resolve(json);
                } catch {
                    console.log('Response:', body.substring(0, 100));
                    resolve();
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function createTestUsers() {
    console.log('🔧 Creating test users via API...\n');

    const users = [
        { email: 'admin@NexLogica.com', password: 'admin123', name: 'Admin User', role: 'admin' },
        { email: 'manager@NexLogica.com', password: 'manager123', name: 'Manager User', role: 'manager' },
        { email: 'driver1@NexLogica.com', password: 'driver123', name: 'Driver One', role: 'driver' },
        { email: 'driver2@NexLogica.com', password: 'driver123', name: 'Driver Two', role: 'driver' }
    ];

    for (const user of users) {
        await registerUser(user);
        await new Promise(r => setTimeout(r, 500)); // Small delay between requests
    }

    console.log('\n✅ User creation complete!');
    console.log('\n📝 Test Credentials:');
    console.log('   Admin:   admin@NexLogica.com / admin123');
    console.log('   Manager: manager@NexLogica.com / manager123');
    console.log('   Driver:  driver1@NexLogica.com / driver123');
}

createTestUsers();
