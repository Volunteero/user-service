const UserServiceError = require('../exceptions/UserServiceError');

/**
 * Validates if the username resolved from the authorization
 * token matches that from the body
 * @param {*} req
 * @param {*} res
 * @param {Function} next
 * @throws {Error}
 */
const userNameMatch = (req, res, next) => {
  if (req.user.username !== req.body.username) {
    throw new UserServiceError('username mismatch');
  }
  next();
};

module.exports = {
  userNameMatch,
};

