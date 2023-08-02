module.exports = (sequelize, Sequelize) => {
  const IncidentStatuses = sequelize.define("incident-statuses", {
    description: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.STRING
    },
  });

  return IncidentStatuses;
};
