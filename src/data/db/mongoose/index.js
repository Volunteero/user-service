'use strict';

const mongoose = require('mongoose');

module.exports = {
  /**
   * Sets up the connection to the DynamoDB instance using mongoose
   * @param {String} databaseLink
   * @param {Function} callback
   */
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

