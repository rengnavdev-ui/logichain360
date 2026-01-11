// Quick API test
const http = require('http');

function testEndpoint(path) {
    return new Promise((resolve) => {
        http.get(`http://localhost:5000${path}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`\n✅ GET ${path}`);
                console.log(`Status: ${res.statusCode}`);
                try {
                    console.log('Response:', JSON.parse(data));
                } catch {
                    console.log('Response:', data);
                }
                resolve();
            });
        }).on('error', (err) => {
            console.log(`\n❌ GET ${path}`);
            console.log('Error:', err.message);
            resolve();
        });
    });
}

async function main() {
    console.log('🔍 Testing NexLogica Backend API...\n');

    await testEndpoint('/');
    await testEndpoint('/api');
    await testEndpoint('/api/shipments');
    await testEndpoint('/api/auth/me');

    console.log('\n✅ API test complete!');
}

main();
