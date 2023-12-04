
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
//const StatsD = require('statsd-client');
//const metricAPI= require('./controllers/metricAPI.js')
const StatsD = require('node-statsd');
const client = new StatsD();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Middleware for instrumenting APIs
// const statsd = new StatsD({ host: 'localhost', port: 8125 });
// const apiInstrumentation = (req, res, next) => {
//     const apiEndpoint = req.originalUrl.startsWith('/v1')
//     ? req.originalUrl.split('/v1')[1]
//     : req.originalUrl;
//     // Increment the API counter using node-statsd
//     statsd.increment('api_requests_total', 1, { endpoint: apiEndpoint, method: req.method });
//     metricAPI(apiEndpoint, req.method);
//     console.log('statsd', statsd);
//     next();
// }
 
// // Apply the middleware to all routes
// app.use(apiInstrumentation);

app.use('/', (req, res, next) => {
  if (req.method == 'PATCH') {
    res.status(405).json();
  } else {
    next();
  }
});

app.use("/healthz", health_route);


const checkDbConnectionMiddleware = async (req, res, next) => {
  try {
    await sequelize.authenticate();
    next(); // Proceed to the next middleware or route if the database is connected
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(503).json({ message: 'Service Unavailable' });
  }
};
// Apply the checkDbConnectionMiddleware to all routes
app.use(checkDbConnectionMiddleware);

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



app.use("/v2/assignments", assignment_route);
app.use('/*', (req, res) => {
  res.status(404).json()
});


app.listen(PORT, async() => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;


