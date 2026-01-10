// Quick MongoDB connection test
require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔍 Testing MongoDB connection...');
console.log('Connection string format check: ', process.env.MONGODB_URI ? '✅ Found' : '❌ Missing');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📊 Now running seed script...\n');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Failed!');
    console.error('Error:', err.message);
    console.error('\n💡 Common fixes:');
    console.error('   1. Check MongoDB Atlas allows your IP address');
    console.error('   2. Verify MONGODB_URI in .env is correct');
    console.error('   3. Check if firewall is blocking port 27017');
    console.error('   4. Ensure MongoDB Atlas cluster is running');
    process.exit(1);
  });
