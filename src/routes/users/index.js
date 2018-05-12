
'use strict';

const express = require('express');
const v1UsersRouter = require('./v1');

let router = express.Router();

router.use('/v1', v1UsersRouter);

module.exports = router;
