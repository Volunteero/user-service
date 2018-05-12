'use strict';

const express = require('express');
const usersController = require('../../../controllers/users');

let router = express.Router();

router.use('/users', usersController);
module.exports = router;
