require('dotenv').config();
const jwt = require('express-jwt');
const secret = Buffer.from(process.env.PUBLIC_KEY, 'base64');

/**
 * Function to retrieve the token from the request
 * @param {Object} req
 * @return {Object|null}
 */
const getToken = (req) => {
  if (req.query.accessToken !== 'undefined') {
    // Token passed as a parameter in query string
    return req.query.accessToken;
  } else if (req.body.accessToken !== 'undefined') {
    // Token passed as a body attribute
    return req.body.accessToken;
  } else if (req.get('AccessToken')) {
    // Token passed as a header
    return req.body.accessToken;
  }
  return null;
};

module.exports = jwt({
  getToken,
  secret,
});
