const db = require("../models");
const IncidentCategory = db.incidentCategories;
const Op = db.Sequelize.Op;

// Create and Save a new IncidentCategory
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.governmentAreaId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a IncidentCategory
  const category = {
    name: req.body.name,
    governmentAreaId: req.body.governmentAreaId,
  };

  // Save IncidentCategory in the database
  IncidentCategory.create(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Incident Category."
      });
    });
};

// Retrieve all Incident Categories from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  IncidentCategory.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Incident Categories."
      });
    });
};

// Find a single IncidentCategory with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  IncidentCategory.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Incident Category with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Incident Category with id=" + id
      });
    });
};

// Update a IncidentCategory by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  IncidentCategory.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Incident Category was updated successfully"
        });
      } else {
        res.send({
          message: `Cannot update Incident Category with id=${id}. Maybe Incident Category was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating IncidentCategory with id=" + id
      });
    });
};

// Delete a IncidentCategory with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  IncidentCategory.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Incident Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Incident Category with id=${id}. Maybe Incident Category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Incident Category with id=" + id
      });
    });
};
