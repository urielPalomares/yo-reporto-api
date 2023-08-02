module.exports = (sequelize, Sequelize) => {
  const IncidentCategory = sequelize.define("incident-categories", {
    name: {
      type: Sequelize.STRING
    },
    governmentAreaId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'government-areas',
        key: 'id'
      }
    },
  });

  return IncidentCategory;
};
