const fs = require('fs');
const path = require('path');

const envPath = path.join('e:\\NexLogica-Workspace\\server', '.env');

// Reconstructed URI based on user input '6qcqjvk.mongodb.net'
const content = `MONGODB_URI=mongodb+srv://NexLogica_app:USjnO97xD3ph0rIV@cluster0.6qcqjvk.mongodb.net/NexLogica?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
KEY=k67FKuUlgCIoepHxYQD1mVjzb3X0NvdTJLt5REOGrwinB8Zhf9d
JWT_SECRET=k67FKuUlgCIoepHxYQD1mVjzb3X0NvdTJLt5REOGrwinB8Zhf9d
CONTRACT_ADDRESS=0x1a0Bc578b85b7815DD88c5037DB7c2fCc11DD181
ALCHEMY_AMOY_URL=https://polygon-amoy.g.alchemy.com/v2/uHGu8z5UBiFMsoOiVKonA
PRIVATE_KEY=0x3fe27cad378a1cce249ec794074f91b2eefc47edbc6388b9472a7114a931fe5a
CORS_ORIGIN=http://localhost:5173`;

fs.writeFileSync(envPath, content, { encoding: 'utf8' });
console.log('Updated server/.env with new MongoDB URI');
