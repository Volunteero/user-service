'use strict';
const mongoose = require('mongoose');

// TODO: testing!

const schemaSeed = {
  username: {
    type: String,
    required: [true],
  },
  first_name: String,
  last_name: String,
  email: String,
  city: String,
  country: String,
  bio: String,
};
const userSchema = mongoose.Schema(schemaSeed);

module.exports = class User {
  constructor() {
    this.KEY = 'User';
    this.schema = userSchema;
  }

  /**
   * Produces an ODM mapper relative to the user type
   * @return {MapModel}
   */
  getObjectMap() {
    return mongoose.model(this.KEY, this.schema);
  }

  /**
   * Produces an schema compliant object from the given body
   * @param {Object} body
   * @return {Object}
   */
  resolveSeed(body) {
    return Object.keys(schemaSeed).reduce((object, key) => {
      if (body[key]) {
        object[key] = body[key] || '';
      }
      return object;
    }, {});
  }
};
