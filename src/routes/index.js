'use strict';

const usersRouter = require('./users');

module.exports = () => {
  return {
    /**
     * Adds the top level routing to the application
     * @param {Object} app
     * @return {Object}
     */
    init(app) {
      app.use('/altar', usersRouter);
      return app;
    },
  };
};
