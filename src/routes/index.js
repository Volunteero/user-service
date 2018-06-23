'use strict';

const usersRouter = require('./users');

module.exports = () => {
  return {
    init(app) {
      app.use('/altar', usersRouter);
      return app;
    },
  };
};
