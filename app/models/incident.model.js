module.exports = (sequelize, Sequelize) => {
  const Incident = sequelize.define("incident", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    incidentStatusId: {
      type: Sequelize.INTEGER
    },
    incidentCategoryId: {
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER
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
  
  Incident.associate = function(models) {
    Incident.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user'
    });

    Incident.belongsTo(models.incidentCategories, {
      foreignKey: 'incidentCategoryId',
      as: 'category'
    });

    Incident.belongsTo(models.incidentStatuses, {
      foreignKey: 'incidentStatusId',
      as: 'status'
    });
  };

  return Incident;
};
