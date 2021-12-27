const Redis = require("ioredis");
const logger = require("./logger.service")
const redisStore = new Redis(process.env.REDIS_URI, {
  tls: {
    rejectUnauthorized: false
  }
});

redisStore.on('connect', () => {
  console.log("🚀 ~ file: redis.service.js ~ line 29 ~ redisStore.on ~ connect: connection ok")
  logger.info('connection to redis ok')
})

redisStore.on('error', (err) => {
  console.log('error', err)
  logger.error('connection to redis failed: err-> ', err)
})

module.exports = redisStore;

