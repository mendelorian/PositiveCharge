const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { authRouter } = require('./routes/authRoutes.js');
const addPOIRouter = require('./routes/addPOIRoutes.js');
const detailsRouter = require('./routes/detailsRoutes.js');
const filterRouter = require('./routes/filterRoutes.js');
const mapRouter = require('./routes/mapRouter.js');
const seePOIRouter = require('./routes/seePOIRoutes.js');
const sponsorRouter = require('./routes/sponsorRoutes.js');
const findRouter = require('./routes/findChargingStationsRoutes.js')
const _ = require('underscore');

module.exports = (database) => {
  const app = express();


  _.extend(authRouter, database);
  _.extend(addPOIRouter, database);
  _.extend(detailsRouter, database);
  _.extend(filterRouter, database);
  _.extend(sponsorRouter, database);
  _.extend(findRouter, database);
  _.extend(seePOIRouter, database);

  app.use(express.static(path.join(__dirname, '../positive_charge/public')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use('/filter', filterRouter);
  app.use('/', authRouter, findRouter);
  app.post('/addPOI', addPOIRouter);
  app.use('/details', detailsRouter);
  app.use('/map', mapRouter);
  app.use('/sponsor', sponsorRouter);
  app.use('/getPOI', seePOIRouter);


  // Filter route for testing purposes. Will be removed later

  app.get('/', (req, res) => {
    res.send("Sarcastic hello");
  })


  return app;
}
