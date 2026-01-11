const fs = require('fs');
const path = require('path');

const envPath = path.join('e:\\NexLogica-Workspace\\server', '.env');
const content = `MONGODB_URI=mongodb+srv://NexLogica_app:USjnO97xD3ph0rIV@clud4RIMgxVSFrDK3oOB6ALT7kvJzhqpyName=Cluster0
PORT=5000
# Key from previous file, kept as generic KEY and JWT_SECRET
KEY=k67FKuUlgCIoepHxYQD1mVjzb3X0NvdTJLt5REOGrwinB8Zhf9d
JWT_SECRET=k67FKuUlgCIoepHxYQD1mVjzb3X0NvdTJLt5REOGrwinB8Zhf9d
CONTRACT_ADDRESS=0x1a0Bc578b85b7815DD88c5037DB7c2fCc11DD181`;

fs.writeFileSync(envPath, content, { encoding: 'utf8' });
console.log('Fixed server/.env');
