const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt.helper');
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.login = async (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Credentials can't be empty"
    });
  }

  const { email, password } = req.body;

  // Save User in the database
  User.findOne({ email })
    .then(async data => {
      const validPassword = bcryptjs.compareSync(password, data.password);
      if (!validPassword) {
        return res.status(400).json({
          ok: false,
          token: null,
          msg: 'Email and password are invalid'
        });
      }

      const token = await generateJWT(data.id);

      return res.status(200).json({ token });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};
