'use strict';

/**
 * Function to retrieve the token from the request
 * @param {Object} req
 * @return {Object|null}
 */
const getToken = (req) => {
  console.log(req.get('AccessToken'));
  if (req.query.accessToken !== undefined) {
    // Token passed as a parameter in query string
    return req.query.accessToken;
  } else if (req.body.accessToken !== undefined) {
    // Token passed as a body attribute
    return req.body.accessToken;
  } else if (req.get('AccessToken') !== undefined) {
    // Token passed as a heade
    return req.get('AccessToken');
  }
  console.warn('No token resolved');
  return null;
};

module.exports = {
  getToken,
};
