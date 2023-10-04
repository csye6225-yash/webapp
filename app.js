
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const Sequelize = require ('sequelize');
const { sequelize } = require('./models/index.js');
const db = require('./models/index.js');
const health_route = require('./routes/health_route.js');
const assignment_route = require('./routes/assignment_route.js');
const fs = require("fs");
const csv = require("fast-csv");
const csvData = require('./controllers/csvData.js');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const checkDbConnectionMiddleware = async (req, res, next) => {
//   try {
//     await sequelize.authenticate();
//     next(); // Proceed to the next middleware or route if the database is connected
//   } catch (error) {
//     console.error('Database connection error:', error);
//     res.status(503).json({ message: 'Service Unavailable' });
//   }
// };
// // Apply the checkDbConnectionMiddleware to all routes
// app.use(checkDbConnectionMiddleware);

// Adding no cache header
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache');
  next();
});

//checking connection of database while starting the application
const checkConnection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        sequelize.sync();
        csvData();
      } catch (error) {
        console.error('Unable to connect to the database');
      }
}

checkConnection();



app.use("/healthz", health_route);
app.use("/v1/assignments", assignment_route);
app.use('/*', (req, res) => {
  res.status(404).json()
});
app.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;


