require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors())

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to yo-reporto-api application." });
});

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/metrics.routes")(app);
require("./app/routes/incident.routes")(app);
require("./app/routes/government.routes")(app);
require("./app/routes/government-area.routes")(app);
require("./app/routes/incident-category.routes")(app);
require("./app/routes/incident-statuses.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
