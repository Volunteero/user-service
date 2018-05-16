'use strict';

const mongoose = require('mongoose');

module.exports = {
  connect(databaseLink, callback) {
    mongoose.connect(databaseLink, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.info('connection with Mongo is up');
      }
      if (callback) {
        callback(error);
      }
    });
  },
};

