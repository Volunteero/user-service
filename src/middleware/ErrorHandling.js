// const UserServiceError = require('../exceptions/UserServiceError');

/**
 * Handle an error that can occur during the route handling
 * @param {Object} err
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 * @return {Object}
 */
const handleError = (err, req, res, next) => {
  console.error({
    errorCode: `ServerError:${err.name}`,
    stack: err.stack,
  });

  // TODO: add some logic to select the handling behavior
  return sendGenericErrorResponse(err, res);
};

/**
 * Sends a generic error response
 * @param {Error} err
 * @param {Object} res
 * @return {Object}
 */
const sendGenericErrorResponse = (err, res) => {
  return res.status(500).json({
    // FIXME: do not send the message about internal errors..
    message: err,
    serverError: true,
  });
};

module.exports = {
  handleError,
  sendGenericErrorResponse,
};
