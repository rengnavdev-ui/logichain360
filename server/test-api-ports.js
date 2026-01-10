// Test API on port 3000
const http = require('http');

function testEndpoint(path, port = 3000) {
    return new Promise((resolve) => {
        http.get(`http://localhost:${port}${path}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`\n✅ GET localhost:${port}${path}`);
                console.log(`Status: ${res.statusCode}`);
                try {
                    const json = JSON.parse(data);
                    console.log('Response:', JSON.stringify(json, null, 2));
                } catch {
                    console.log('Response (first 200 chars):', data.substring(0, 200));
                }
                resolve();
            });
        }).on('error', (err) => {
            console.log(`\n❌ GET localhost:${port}${path}`);
            console.log('Error:', err.message);
            resolve();
        });
    });
}

async function main() {
    console.log('🔍 Testing Backend on Port 3000...\n');
    
    await testEndpoint('/');
    await testEndpoint('/api');
    await testEndpoint('/api/shipments');
    
    console.log('\n\n🔍 Testing Backend on Port 5000...\n');
    await testEndpoint('/', 5000);
    await testEndpoint('/api', 5000);
    await testEndpoint('/api/shipments', 5000);
    
    console.log('\n✅ API test complete!');
}

main();
