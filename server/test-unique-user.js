// Test with unique timestamp user
const http = require('http');

function request(method, path, data = null) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path,
            method,
            headers: { 'Content-Type': 'application/json' }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, data: JSON.parse(body) });
                } catch {
                    resolve({ status: res.statusCode, data: body });
                }
            });
        });

        req.on('error', (e) => resolve({ error: e.message }));
        if (data) req.write(JSON.stringify(data));
        req.end();
    });
}

async function test() {
    const uniqueEmail = `user_${Date.now()}@NexLogica.com`;
    console.log('🧪 Testing with unique email:', uniqueEmail);

    // 1. Register new user
    console.log('\n1️⃣ Registering...');
    const regResult = await request('POST', '/api/auth/register', {
        email: uniqueEmail,
        password: 'password123',
        name: 'Unique User',
        role: 'admin'
    });
    console.log(`   Status: ${regResult.status}`);
    console.log(`   Response:`, JSON.stringify(regResult.data, null, 2).substring(0, 500));

    if (regResult.status === 201 && regResult.data?.data?.token) {
        console.log('\n✅ REGISTRATION SUCCESS!');
        console.log('   Token:', regResult.data.data.token.substring(0, 50) + '...');

        // 2. Now login
        console.log('\n2️⃣ Logging in...');
        const loginResult = await request('POST', '/api/auth/login', {
            email: uniqueEmail,
            password: 'password123'
        });
        console.log(`   Status: ${loginResult.status}`);

        if (loginResult.data?.data?.token) {
            console.log('   ✅ LOGIN SUCCESS!');
            console.log('   Token:', loginResult.data.data.token.substring(0, 50) + '...');
        } else {
            console.log('   ❌ Login failed:', loginResult.data);
        }
    }
}

test();
