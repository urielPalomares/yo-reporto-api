module.exports = app => {
  const auth = require("../controllers/auth.controller.js");

  var router = require("express").Router();

  // Login
  router.get("/", auth.login);

  app.use('/api/auth', router);

};
