// server/services/redisClient.js
const { createClient } = require('redis');

const redis = createClient({
  url: process.env.REDIS_URL // e.g. redis://localhost:6379 or Render URL
});

redis.on('error', (err) => {
  console.error('Redis error', err);
});

async function connectRedis() {
  if (!redis.isOpen) {
    await redis.connect();
    console.log('Redis connected');
  }
}

module.exports = { redis, connectRedis };
