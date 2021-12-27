const { Router } = require('express');
const router = Router();

const authMiddleware = require('../../middlewares/auth.middleware')
const { login, authGetAll } = require('./auth.controller');

router.get('/', authMiddleware, authGetAll);

router.post('/login', login);


module.exports = router;