const express = require('express');
const router = express.Router();
const ctrl = require('./tv.controller');
const authorization = require('../middleware/authorization');

router
  .use(authorization)
  .get('/tv-channels', ctrl.getAllTvChannels)
  .put('/tv-channels/:id', ctrl.updateTvChannel);
//   .post('/tv-channels', ctrl.createTvChannel)
//   .delete('/tv-channels/:id', ctrl.deleteTvChannel)

module.exports = {
  path: '/tv',
  router,
};
