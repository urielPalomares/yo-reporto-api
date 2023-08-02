const Sequelize = require("sequelize");

console.log('DB_POL_MIN',process.env.DB_POL_MIN)

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  operatorsAliases: false,
  port: process.env.DB_PORT,

  pool: {
    max: parseInt(process.env.DB_POL_MAX),
    min: parseInt(process.env.DB_POL_MIN),
    acquire: process.env.DB_POL_ACQUIRE,
    idle: process.env.DB_POL_IDLE
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.incidents = require("./incident.model.js")(sequelize, Sequelize);
db.governments = require("./government.model.js")(sequelize, Sequelize);
db.governmentAreas = require("./government-area.model.js")(sequelize, Sequelize);
db.incidentCategories = require("./incident-category.model.js")(sequelize, Sequelize);
db.incidentStatuses = require("./incident-statuses.model.js")(sequelize, Sequelize);

module.exports = db;
