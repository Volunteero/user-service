'use strict';

const express = require('express');
const AuthMiddleware = require('../../middleware/AuthRequiredMiddleware');
const userHandler = new (require('../../handlers/users/UserHandler'))();

let router = express.Router();

router
  .get('/', userHandler.getUsers);
router
  .put('/find', userHandler.getUserByUsername);
router
  .post('/', userHandler.createUser);
router
  .put('/', AuthMiddleware, userHandler.updateUser);
router
  .put(
    '/delete', AuthMiddleware, userHandler.deleteUserByUsername
  );
router.post(
    '/:username/confirmEventParticipation',
    userHandler.confirmEventParticipation
);

module.exports = router;
