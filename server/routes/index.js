const router = require('express').Router();
const user = require('./user');

router.use('/api/user', user);

module.exports = router;