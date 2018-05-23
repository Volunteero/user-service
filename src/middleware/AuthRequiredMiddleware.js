require('dotenv').config();
const jwt = require('express-jwt');
const secret = Buffer.from(process.env.PUBLIC_KEY, 'base64');
const {getToken} = require('../lib/util/GetToken');


module.exports = jwt({
  getToken,
  secret,
});
