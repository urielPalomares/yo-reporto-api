module.exports = app => {
  const areas = require("../controllers/governments-area.controller");

  var router = require("express").Router();

  // Create a new Area
  router.post("/", areas.create);

  // Retrieve all areas
  router.get("/", areas.findAll);

  // Retrieve a single area with id
  router.get("/:id", areas.findOne);

  // Update a area with id
  router.put("/:id", areas.update);

  // Delete a area with id
  router.delete("/:id", areas.delete);

  app.use('/api/government-areas', router);
};
