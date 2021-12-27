const { CustomError } = require('../../utils/error.utils');
const logger = require('../../services/logger.service')

const userService = require('./auth.service');
const tokenService = require('../../services/jwt.service');
const redisStore = require('../../services/redis.service');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new CustomError(400, 'bad request');
    }

    const [user, error] = await userService.login({ username, password });

    if (error || !user) {
      throw new CustomError(401, error || 'authorization denied');
    }

    await redisStore.set(user._id, JSON.stringify(user));

    const token = await tokenService.sign({ _id: user._id });
    return res.json({ token })
  } catch (error) {
    logger.error("🚀 ~ file: auth.controller.js ~ line 25 ~ login ~ error", error)
    next(error)
  }
};

const authGetAll = async (req, res, next) => {
  try {
    const keys = await redisStore.keys('*');
    const values = keys.length ? await redisStore.mget(keys) : [];
    res.json({ keys, values });
  } catch (error) {
    logger.error("🚀 ~ file: auth.controller.js ~ line 37 ~ authGetAll ~ error", error)
    next(error)
  }
}

module.exports = {
  login,
  authGetAll
};