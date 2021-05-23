const express = require('express');
const user = require('./user');
// const tv = require('./tv');
// const notification = require('./notification');
const router = express.Router();

router.use(user.path, user.router);
// router.use(tv.path, tv.router);
// router.use(notification.path, notification.router);

module.exports = router;
