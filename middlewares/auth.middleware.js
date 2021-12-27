const jwtService = require('../services/jwt.service');
const redisStore = require('../services/redis.service');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await jwtService.verify(token, process.env.SECRET_KEY);
    const result = await redisStore.get(decodedToken.user._id);
    if (!result) throw 'bad token'
    req.userData = result;
    next();
  } catch (error) {
    error.statusCode = 500;
    error.message = { 1: error.message, 2: 'auth failed:code bt :', info: req.headers };
    next(error);
  }
};

module.exports = authMiddleware;