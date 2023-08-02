const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

const validateJWT = async (req, res, next) => {
  const token = req.header('x-token');
  try {
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: 'The token is required'
      });
    }

    const { uid } = jwt.verify(token, process.env.SECRET_KEY);

    User.findByPk(uid)
    .then(data => {
      console.log(data);
      if (data && data.verified) {
        // user authenticated
        next();
      } else {
        res.status(404).send({
          message: `Invalid token`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Invalid token"
      });
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      ok: false,
      msg: 'Invalid token'
    })
  }
}

module.exports = {
  validateJWT
}
