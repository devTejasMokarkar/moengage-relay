const Redis = require('ioredis');
const { logger } = require('./logger'); // Updated to use CommonJS require
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = require('../config'); // CommonJS require for imports

const options = {
  host: REDIS_HOST,
  port: parseInt(REDIS_PORT, 10) || 6379,
  // Uncomment the following line if authentication is required:
   password: REDIS_PASSWORD,
  maxRetriesPerRequest: null, // Prevent retry limit for operations
  enableOfflineQueue: true, // Enable command queueing while disconnected
  enableReadyCheck: false, // Disable ready check for faster connection
};

const IORedis = new Redis(options);

IORedis.on('error', (err) => {
  logger.error('Redis Client Error', err);
});

IORedis.on('connect', () => {
  logger.info('Connected to IORedis');
});

module.exports = IORedis;
