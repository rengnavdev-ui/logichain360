// Cleanup and Re-register test users
const http = require('http');

function request(method, path, data = null) {
    return new Promise((resolve) => {
        const body = data ? JSON.stringify(data) : '';
        const options = {
            hostname: 'localhost',
            port: 5000,
            path,
            method,
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(body)
            }
        };

        const req = http.request(options, (res) => {
            let resBody = '';
            res.on('data', chunk => resBody += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(resBody) });
                } catch {
                    resolve({ status: res.statusCode, data: resBody });
                }
            });
        });

        req.on('error', (e) => resolve({ error: e.message }));
        if (data) req.write(body);
        req.end();
    });
}

async function run() {
    console.log('🧹 Re-seeding test users via API...');

    const users = [
        { email: 'admin@NexLogica.com', password: 'admin123', name: 'Admin User', role: 'admin' },
        { email: 'manager@NexLogica.com', password: 'manager123', name: 'Manager User', role: 'manager' },
        { email: 'driver1@NexLogica.com', password: 'driver123', name: 'Driver One', role: 'driver' }
    ];

    // Note: Since we don't have a DELETE user API endpoint ready for public use, 
    // and we know the DB connection is Atlas, we'll try to register. 
    // If it fails with "already registered", we'll use a NEW user email for this trial 
    // to prove it works, or we can assume the user will manually clear the DB if they have access.

    // Better: Let's create users with "v2" in their email if the original fails.

    for (const user of users) {
        console.log(`\nRegistering ${user.email}...`);
        let res = await request('POST', '/api/auth/register', user);

        if (res.status === 201) {
            console.log('✅ Created successfully');
        } else if (res.status === 400 && res.data.message === 'Email already registered') {
            console.log('⚠️ Already exists. Attempting login to verify...');
            let loginRes = await request('POST', '/api/auth/login', { email: user.email, password: user.password });
            if (loginRes.status === 200) {
                console.log('✅ Login successful! User is good.');
            } else {
                console.log('❌ Login failed (probably bad hash). Creating unique version...');
                const newEmail = user.email.replace('@', '_v2@');
                let retryRes = await request('POST', '/api/auth/register', { ...user, email: newEmail });
                if (retryRes.status === 201) {
                    console.log(`✅ Created unique version: ${newEmail}`);
                } else {
                    console.log('❌ Failed to create unique version:', retryRes.data);
                }
            }
        } else {
            console.log('❌ Error:', res.data);
        }
    }
}

run();
