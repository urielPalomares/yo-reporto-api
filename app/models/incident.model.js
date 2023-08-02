module.exports = (sequelize, Sequelize) => {
  const Incident = sequelize.define("incident", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    incidentStatusId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'incident-statuses',
        key: 'id'
      }
    },
    incidentCategoryId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'incident-categories',
        key: 'id'
      }
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    latitude: {
      type: Sequelize.STRING
    },
    longitude: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.BLOB("long"),
    },
  });

  return Incident;
};
