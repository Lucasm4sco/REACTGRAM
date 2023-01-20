const router = require('express').Router();

router.use('/api/users', require('./UserRoutes'));
router.use('/api/photo', require('./PhotoRoutes'));

router.get('/', (req, res) => res.send('API Working!'))

module.exports = router;