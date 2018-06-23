'use strict';

const express = require('express');
const AuthMiddleware = require('../../middleware/AuthRequiredMiddleware');
const userHandler = new (require('../../handlers/users/UserHandler'))();

let router = express.Router();

router
  .get('/', userHandler.getUsers);
// TODO: figure out how to work around the bind
router
  .put('/find', userHandler.getUser.bind(userHandler));
router
  .post('/', userHandler.createUser);
router
  .put('/', AuthMiddleware, userHandler.updateUser);
router
  .put(
    '/delete', userHandler.deleteUserByUsername
  );
router.post(
  '/:username/confirmEventParticipation',
  userHandler.confirmEventParticipation
);

module.exports = router;
