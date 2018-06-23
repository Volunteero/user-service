'use strict';

const express = require('express');
const userHandler = new(require('../../handlers/users/UserHandler'))();

let router = express.Router();

router.post(
    '/:username/confirmEventParticipation',
    userHandler.confirmEventParticipation
);
router.get('/', userHandler.getUsers);
router.put('/find', userHandler.getUserByUsername);
router.post('/', userHandler.createUser);
router.put('/', userHandler.updateUser);
router.put('/delete', userHandler.deleteUserByUsername);

module.exports = router;
