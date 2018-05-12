'use strict';

const mongoose = require('mongoose');

module.exports = {
  connect(databaseLink, callback) {
    mongoose.connect(databaseLink, (error) => {
      if (error) {
        console.error(error);
      }
      if (callback) {
        callback(error);
      }
    });
  },
};

