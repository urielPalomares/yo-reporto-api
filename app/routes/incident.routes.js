module.exports = app => {
  const incidents = require("../controllers/incidents.controller");

  var router = require("express").Router();

  // Create a new category
  router.post("/", incidents.create);

  // Retrieve all incidents
  router.get("/", incidents.findAll);

  // Retrieve a single category with id
  router.get("/:id", incidents.findOne);

  // Update a category with id
  router.put("/:id", incidents.update);

  // Delete a category with id
  router.delete("/:id", incidents.delete);

  app.use('/api/incidents', router);
};
