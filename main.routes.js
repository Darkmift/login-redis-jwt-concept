var { Router } = require('express');
var router = Router();

router.get('/', (req, res) => {
  res.send('api working');
});

const authRoutes = require('./api/auth/auth.routes');
router.use('/auth', authRoutes);

module.exports = router;