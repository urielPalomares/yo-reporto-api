const db = require('../models');
const Incident = db.incidents;
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
      difference
    }
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send({
      message: 'Error get metrics',
      error
    });
  }
};

// async function getIncidentsByStatus() {
//   Incident.findAll({
//     group: ['incidentStatuses'],
//     attributes: ['incidentStatuses', [sequelize.fn('COUNT', 'incidentStatuses'), 'TagCount']],
//   }).then(function (incidents) {
//     console.log('incidents', incidents)
//     return incidents;
//   });
// }


