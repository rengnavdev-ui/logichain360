// Test login with detailed error output
const http = require('http');

function login() {
    const data = JSON.stringify({
        email: 'admin@NexLogica.com',
        password: 'admin123'
    });

    const options = {
        hostname: 'localhost',
        port: 5000,
        path: '/api/auth/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    console.log('🔐 Testing login...\n');
    console.log('Request:', data);

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            console.log(`\nStatus: ${res.statusCode}`);
            console.log('Headers:', res.headers);
            console.log('\nResponse Body:');
            try {
                const json = JSON.parse(body);
                console.log(JSON.stringify(json, null, 2));

                if (json.token) {
                    console.log('\n✅ SUCCESS! Got JWT token');
                    console.log('Token preview:', json.token.substring(0, 50) + '...');
                } else {
                    console.log('\n❌ No token in response');
                }
            } catch {
                console.log(body);
            }
        });
    });

    req.on('error', (e) => {
        console.error('Request error:', e);
    });

    req.write(data);
    req.end();
}

login();
