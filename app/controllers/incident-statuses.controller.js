const db = require("../models");
const incidentStatus = db.incidentStatuses;
const Op = db.Sequelize.Op;

// Create and Save a new incidentStatus
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a incidentStatus
  const status = {
    description: req.body.description,
    active: true,
  };

  // Save incidentStatus in the database
  incidentStatus.create(status)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the incident Status."
      });
    });
};

// Retrieve all incident Statuses from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  incidentStatus.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving incident Statuses."
      });
    });
};

// Find a single incidentStatus with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  incidentStatus.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find incident Status with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving incident Status with id=" + id
      });
    });
};

// Update a incidentStatus by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  incidentStatus.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "incident Status was updated successfully"
        });
      } else {
        res.send({
          message: `Cannot update incident Status with id=${id}. Maybe incident Status was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating incidentStatus with id=" + id
      });
    });
};

// Delete a incidentStatus with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  incidentStatus.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "incident Status was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete incident Status with id=${id}. Maybe incident Status was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete incident Status with id=" + id
      });
    });
};
