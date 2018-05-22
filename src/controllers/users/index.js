'use strict';

const express = require('express');
const AuthMiddleware = require('../../middleware/AuthRequiredMiddleware');
const {userNameMatch} = require('../../middleware/UsernameMatchRequired');
const userHandler = new (require('../../handlers/users/UserHandler'))();

let router = express.Router();

router
  .get('/', userHandler.getUsers);
router
  .put('/find', userHandler.getUserByUsername);
router
  .post('/', userHandler.createUser);
router
  .put('/', AuthMiddleware, userNameMatch, userHandler.updateUser);
router
  .put(
    '/delete', AuthMiddleware, userNameMatch, userHandler.deleteUserByUsername
  );

module.exports = router;
