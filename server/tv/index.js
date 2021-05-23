const express = require('express');
const router = express.Router();
const ctrl = require('./tv.controller');
const authorization = require('../middleware/authorization');

router
  .use(authorization)
  //   .get('/tv-channels', ctrl.getAllTvChannels)
  //   .post('/tv-channels', ctrl.createTvChannel)
  //   .delete('/tv-channels/:id', ctrl.deleteTvChannel)
  .put('/tv-channels/:id', ctrl.updateTvChannel);

module.exports = {
  path: '/tv',
  router,
};
