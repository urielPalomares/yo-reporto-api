module.exports = app => {
  const metrics = require("../controllers/metrics.controller");

  var router = require("express").Router();

  // Get metrics
  router.get("/", metrics.get);

  app.use('/api/metrics', router);
};
