const express = require('express');
const router = express.Router();
const ctrl = require('./user.controller');
const authorization = require('../middleware/authorization');

router
  .post('/register', ctrl.register)
  .post('/login', ctrl.login)
  .post('/subscribe', ctrl.subscribe)
  .use(authorization)
  //   .get('/:id', ctrl.getAllUsersExceptOne)
  .put('/location/:id', ctrl.updateLocation)
  .put('/notification/:id', ctrl.updateNotification);

module.exports = {
  path: '/users',
  router,
};
