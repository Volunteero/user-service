'use strict';
const mongoose = require('mongoose');

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

  getObjectMap() {
    return mongoose.model(this.KEY, this.schema);
  }

  resolveSeed(body) {
    return Object.keys(schemaSeed).reduce((object, key) => {
      object[key] = body[key] || '';
      return object;
    }, {});
  }
};
