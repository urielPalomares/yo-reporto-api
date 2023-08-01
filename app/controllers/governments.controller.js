const db = require("../models");
const Government = db.governments;
const Op = db.Sequelize.Op;

// Create and Save a new Government
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Government
  const government = {
    name: req.body.name,
    address: req.body.address,
    postal_code: req.body.surname,
    email: req.body.email,
    phone: req.body.phone
  };

  // Save Government in the database
  Government.create(government)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Government."
      });
    });
};

// Retrieve all Governments from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Government.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving governments."
      });
    });
};

// Find a single Government with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Government.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Government with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Government with id=" + id
      });
    });
};

// Update a Government by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Government.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Government was updated successfully"
        });
      } else {
        res.send({
          message: `Cannot update Government with id=${id}. Maybe Government was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Government with id=" + id
      });
    });
};

// Delete a Government with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Government.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Government was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Government with id=${id}. Maybe Government was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Government with id=" + id
      });
    });
};
