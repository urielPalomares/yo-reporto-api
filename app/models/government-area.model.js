module.exports = (sequelize, Sequelize) => {
  const GovernmentArea = sequelize.define("government-areas", {
    name: {
      type: Sequelize.STRING
    },
    governmentId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'governments',
        key: 'id'
      }
    },
    address: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
  });

  return GovernmentArea;
};
