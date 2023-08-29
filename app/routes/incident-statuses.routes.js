module.exports = app => {
  const statuses = require("../controllers/incident-statuses.controller");

  var router = require("express").Router();

  // Create a new incident status
  router.post("/", statuses.create);

  // Retrieve all statuses
  router.get("/", statuses.findAll);

  // Retrieve a single incident status with id
  router.get("/:id", statuses.findOne);

  // Update a incident status with id
  router.put("/:id", statuses.update);

  // Delete a incident status with id
  router.delete("/:id", statuses.delete);

  app.use('/api/incident-statuses', router);
};
