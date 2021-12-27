const logger = require('../services/logger.service')
const errorHandler = (err, req, res, next) => {
  if (typeof err === 'string') {
    // custom application error
    logger.error(`ErrorHandler message:`, err)
    return res.status(err.statusCode || 400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    // authentication error
    logger.error(`ErrorHandler UnauthorizedError: ${err.name}`, err)
    return res.status(err.statusCode || 401).json({ message: 'UnauthorizedError' });
  }

  // default to 500 server error
  logger.error(`ErrorHandler 500`, err)
  return res.status(err.statusCode || 500).json({ message: err.message });
};

module.exports = { errorHandler };