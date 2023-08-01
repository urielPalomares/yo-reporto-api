module.exports = (sequelize, Sequelize) => {
  const Government = sequelize.define("government", {
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    postal_code: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
  });

  return Government;
};
