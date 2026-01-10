// server/middleware/rateLimit.js
const { redis } = require('../services/redisClient');

function rateLimit({ windowSec = 60, max = 60, keyPrefix = 'rl:' } = {}) {
  return async function (req, res, next) {
    try {
      const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      const key = `${keyPrefix}${ip}`;

      const current = await redis.incr(key);
      if (current === 1) {
        await redis.expire(key, windowSec);
      }

      if (current > max) {
        return res.status(429).json({
          error: 'Too many requests. Please try again later.'
        });
      }

      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, max - current));
      next();
    } catch (err) {
      console.error('Rate limit error', err);
      next(); // fail-open for hackathon
    }
  };
}

module.exports = rateLimit;
// server/middleware/requestContext.js
const { randomUUID } = require('crypto');

module.exports = function requestContext(req, res, next) {
  const incomingId = req.headers['x-correlation-id'];
  const correlationId = incomingId || randomUUID();

  req.correlationId = correlationId;
  res.setHeader('x-correlation-id', correlationId);

  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(
      `[${correlationId}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${ms}ms)`
    );
  });

  next();
};
