const result = require('dotenv').config();
if (result.error) {
  throw result.error;
}

const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler.middleware');
const logger = require('./services/logger.service');
const app = express();
const redisStore = require('./services/redis.service')

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  app.use(cors());
}

const mainRouter = require('./main.routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', async (req, res, next) => {
  try {

    await redisStore.set("foo", Date.now());
    const result = await redisStore.get("foo")
    console.log("🚀 ~ file: server.js ~ line 26 ~ result", result)

    res.json({ message: 'online', result });
  } catch (error) {
    logger.error("🚀 ~ file: server.js ~ line 33 ~ app.get ~ error", error)
    next(error)
  }
});

app.use('/api', mainRouter);

// global error handler
app.use(errorHandler);
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
    logger.error('Unhandled Rejection at Promise', { reason, p })
  })
  .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    logger.error('Uncaught Exception thrown', err)
    process.exit(1);
  });

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log('Server listening on port: ' + PORT);
  logger.info('Server listening on port: ' + PORT)
  console.log('NODE_ENV: ' + process.env.NODE_ENV);
});