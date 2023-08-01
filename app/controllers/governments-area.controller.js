const db = require("../models");
const GovernmentArea = db.governmentAreas;
const Op = db.Sequelize.Op;

// Create and Save a new GovernmentArea
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a GovernmentArea
  const area = {
    name: req.body.name,
    address: req.body.address,
    postal_code: req.body.surname,
    email: req.body.email,
    phone: req.body.phone
  };

  // Save GovernmentArea in the database
  GovernmentArea.create(area)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Government Area."
      });
    });
};

// Retrieve all Government Areas from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  GovernmentArea.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving government areas."
      });
    });
};

// Find a single GovernmentArea with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  GovernmentArea.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Government Area with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Government Area with id=" + id
      });
    });
};

// Update a GovernmentArea by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  GovernmentArea.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Government Area was updated successfully"
        });
      } else {
        res.send({
          message: `Cannot update Government Area with id=${id}. Maybe Government Area was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating GovernmentArea with id=" + id
      });
    });
};

// Delete a GovernmentArea with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  GovernmentArea.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Government Area was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Government Area with id=${id}. Maybe Government Area was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Government Area with id=" + id
      });
    });
};
