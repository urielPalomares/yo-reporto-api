const db = require("../models");
const Incident = db.incidents;
const Op = db.Sequelize.Op;

// Create and Save a new Incident
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Incident
  const incident = {
    title: req.body.title,
    active: true,
  };

  // Save Incident in the database
  Incident.create(incident)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the incident."
      });
    });
};

// Retrieve all incident from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Incident.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving incident."
      });
    });
};

// Find a single Incident with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Incident.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find incident with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving incident with id=" + id
      });
    });
};

// Update a Incident by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Incident.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "incident was updated successfully"
        });
      } else {
        res.send({
          message: `Cannot update incident with id=${id}. Maybe incident was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Incident with id=" + id
      });
    });
};

// Delete a Incident with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Incident.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "incident was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete incident with id=${id}. Maybe incident was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete incident with id=" + id
      });
    });
};
