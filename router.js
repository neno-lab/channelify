const express = require('express');
const user = require('./user');
const tv = require('./tv');
const router = express.Router();

router.use(user.path, user.router);
router.use(tv.path, tv.router);

module.exports = router;
