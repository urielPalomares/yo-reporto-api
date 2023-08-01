module.exports = app => {
  const governments = require("../controllers/governments.controller");

  var router = require("express").Router();

  // Create a new Government
  router.post("/", governments.create);

  // Retrieve all Governments
  router.get("/", governments.findAll);

  // Retrieve a single Government with id
  router.get("/:id", governments.findOne);

  // Update a Government with id
  router.put("/:id", governments.update);

  // Delete a Government with id
  router.delete("/:id", governments.delete);

  app.use('/api/governments', router);
};
