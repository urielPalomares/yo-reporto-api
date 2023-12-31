const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  protocol: process.env.DB_DIALECT,
  dialectOptions: {
    ssl: true,
    native:true
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

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

module.exports = db;
