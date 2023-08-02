module.exports = app => {
  const statuses = require("../controllers/incident-statuses.controller");

  var router = require("express").Router();

  // Create a new category
  router.post("/", statuses.create);

  // Retrieve all statuses
  router.get("/", statuses.findAll);

  // Retrieve a single category with id
  router.get("/:id", statuses.findOne);

  // Update a category with id
  router.put("/:id", statuses.update);

  // Delete a category with id
  router.delete("/:id", statuses.delete);

  app.use('/api/incident-statuses', router);
};
