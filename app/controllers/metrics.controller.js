const db = require('../models');
const Incident = db.incidents;
const IncidentStatuses = db.incidentStatuses;
const incidentCategories = db.incidentCategories;
const Op = db.Sequelize.Op;

exports.get = async (req, res) => {
  try {
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  
    const firstDayLastWeek = new Date(lastWeek.setDate(lastWeek.getDate() - lastWeek.getDay()));
    const lastDayLastWeek = new Date(lastWeek.setDate(lastWeek.getDate() - lastWeek.getDay() + 6));
  
    const firstDayCurrentWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDayCurrentWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    const incidents = await Incident.count();
  
    const incidentsLastWeek = await Incident.count({
      where: {
        createdAt: {
          [Op.between]: [firstDayLastWeek, lastDayLastWeek],
        },
      },
    });
  
    const incidentsCurrentWeek = await Incident.count({
      where: {
        createdAt: {
          [Op.between]: [firstDayCurrentWeek, lastDayCurrentWeek],
        },
      },
    });

    const difference = ((incidentsCurrentWeek - incidentsLastWeek) / (incidentsLastWeek * 100));
  
    const response  = {
      count: incidents,
      currentWeek: incidentsCurrentWeek,
      lastWeek: incidentsLastWeek,
      incidentsByStatus: await getIncidentsByStatus(),
      incidentsByCategory: await getIncidentsByCategory(),
      difference
    }
    res.status(200).send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: 'Error get metrics',
      error
    });
  }
};

async function getIncidentsByStatus() {
  return await Incident.findAll({
    attributes: ['status.description', [db.Sequelize.fn('COUNT', 'status.id'), 'count']],
    include: [{
      model: IncidentStatuses,
      as: 'status',
      attributes: ['description']
    }],
    group: "status.id",
    order: [[db.Sequelize.col("count"), "DESC"]],
    raw: true
  })
  .then((data) => {
    return data;
  })
}

async function getIncidentsByCategory() {
  return await Incident.findAll({
    attributes: ['category.name', [db.Sequelize.fn('COUNT', 'category.id'), 'count']],
    include: [{
      model: incidentCategories,
      as: 'category',
      attributes: ['name']
    }],
    group: "category.id",
    order: [[db.Sequelize.col("count"), "DESC"]],
    raw: true
  })
  .then((data) => {
    return data;
  })
}


