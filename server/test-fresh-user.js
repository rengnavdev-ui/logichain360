// Register a fresh test user and login
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
    console.log('🧪 Testing Fresh User Registration + Login\n');

    // 1. Register new user
    console.log('1️⃣ Registering fresh user: test@NexLogica.com');
    const regResult = await request('POST', '/api/auth/register', {
        email: 'test@NexLogica.com',
        password: 'test123',
        name: 'Test User',
        role: 'admin'
    });
    console.log(`   Status: ${regResult.status}`);
    console.log(`   Response:`, regResult.data);

    // 2. Try login with this new user
    console.log('\n2️⃣ Logging in with: test@NexLogica.com / test123');
    const loginResult = await request('POST', '/api/auth/login', {
        email: 'test@NexLogica.com',
        password: 'test123'
    });
    console.log(`   Status: ${loginResult.status}`);

    if (loginResult.data?.data?.token) {
        console.log('   ✅ SUCCESS! Got JWT token');
        console.log('   Token:', loginResult.data.data.token.substring(0, 50) + '...');
        console.log('   User:', loginResult.data.data.user);
    } else {
        console.log('   ❌ Login failed:', loginResult.data);
    }
}

test();
