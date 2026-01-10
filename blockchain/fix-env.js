const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const content = `ALCHEMY_AMOY_URL=https://polygon-amoy.g.alchemy.com/v2/uHGu8z5UBiFMsoOiVKonA
PRIVATE_KEY=0x3fe27cad378a1cce249ec794074f91b2eefc47edbc6388b9472a7114a931fe5a`;

fs.writeFileSync(envPath, content, { encoding: 'utf8' });
console.log('.env file rewritten with UTF-8');
