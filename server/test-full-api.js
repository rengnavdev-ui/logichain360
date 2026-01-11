// Test login and fetch shipments
const http = require('http');

function makeRequest(method, path, data = null, token = null) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 5000,
            path,
            method,
            headers: { 'Content-Type': 'application/json' }
        };

        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                console.log(`\n${method} ${path}`);
                console.log(`Status: ${res.statusCode}`);
                try {
                    const json = JSON.parse(body);
                    console.log('Response:', JSON.stringify(json, null, 2).substring(0, 300));
                } catch {
                    console.log('Response:', body.substring(0, 200));
                }
                resolve({ status: res.statusCode, body });
            });
        });

        req.on('error', (err) => {
            console.log(`ERROR: ${err.message}`);
            resolve({ error: err.message });
        });

        if (data) {
            req.write(JSON.stringify(data));
        }
        req.end();
    });
}

async function test() {
    console.log('🧪 Testing NexLogica API...\n');

    // Test 1: Login as admin
    console.log('=== TEST 1: Admin Login ===');
    const loginResult = await makeRequest('POST', '/api/auth/login', {
        email: 'admin_v2@NexLogica.com',
        password: 'admin123'
    });

    let token;
    try {
        const loginData = JSON.parse(loginResult.body);
        token = loginData.token;
        console.log('✅ Login successful, got token');
    } catch (e) {
        console.log('❌ Login failed');
        return;
    }

    // Test 2: Get shipments
    console.log('\n=== TEST 2: Fetch Shipments ===');
    await makeRequest('GET', '/api/shipments', null, token);

    //Test 3: Create shipment
    console.log('\n=== TEST 3: Create Shipment ===');
    await makeRequest('POST', '/api/shipments', {
        pickup: { address: 'Mumbai, India', lat: 19.0760, lng: 72.8777 },
        drop: { address: 'Delhi, India', lat: 28.6139, lng: 77.2090 },
        weight: 50,
        price: 5000,
        vehicleType: 'truck'
    }, token);

    console.log('\n✅ API test complete!');
}

test();
