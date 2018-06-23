'use strict';

require('dotenv').config();


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongooseDb = require('./data/db/mongoose');

module.exports = class Server {
  constructor() {
    this.app = express();
    this.routes = routes();
    this.router = express.Router();
    this.mongooseDb = mongooseDb;
  }

  setup() {
    // configure app settings
    this.app.set('env', process.env.ENV || 'dev');
    this.app.set('port', process.env.PORT || 3000);
    this.app.set('hostname', process.env.HOST || 'localhost');
    this.app.set('mongo_link', process.env.MONGO_LINK || 'mongodb://127.0.0.1:27017/altar');

    // setup middleware
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));


    // setup routes
    this.routes.init(this.app);
  }

  start() {
    // connect db
    mongooseDb.connect(this.app.get('mongo_link'));
    let port = this.app.get('port');
    let hostname = this.app.get('hostname');
    let env = this.app.get('env');
    console.log(port, hostname, env);
    this.app.listen(port || 3000, () => {
      console.info(
        'Express server listening on port %d in %s mode',
        port,
        env
      );
      console.info(`http://${hostname}:${port}`);
      console.info(`PID: ${process.pid}`);
      console.info('Active routes:');
      console.info(...this.router.stack);
    });
  }

  shutDown() {
    console.info('Received kill signal, shutting down gracefully');
    process.exit(0);
  }
};
