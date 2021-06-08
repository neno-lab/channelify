const express = require('express');
const router = express.Router();
const ctrl = require('./user.controller');
const authorization = require('../middleware/authorization');

router
  .post('/register', ctrl.register)
  .post('/login', ctrl.login)
  .put('/save-subscription/:id', ctrl.saveSubscription)
  .use(authorization)
  .get('/send-notification/:id/:location/:name', ctrl.sendNotification)
  .put('/location/:id', ctrl.updateLocation)
  .get('/:id', ctrl.getSingleUserData)
  .get('/count', ctrl.countUsers);

module.exports = {
  path: '/users',
  router,
};
