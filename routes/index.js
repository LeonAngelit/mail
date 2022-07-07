const emailRouter = require('./email');
const express = require('express');

function routerAPI(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/email',emailRouter);
}

module.exports = routerAPI;
