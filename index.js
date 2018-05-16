'use strict';

const Server = require('./src/Server');

const server = new Server();
server.setup();
server.start();

// Set shutdown handling
process.on('SIGTERM', server.shutDown);
process.on('SIGINT', server.shutDown);
