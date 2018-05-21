'use strict';

const express = require('express');
const AuthMiddleware = require('../../middleware/AuthRequiredMiddleware');
const UsernameMiddleware = require('../../middleware/UsernameMatchRequired');
const userHandler = new (require('../../handlers/users/UserHandler'))();

let router = express.Router();

// Does this get executed for every route in *this* router or generally?
router.use(AuthMiddleware, UsernameMiddleware);
router.get('/', userHandler.getUsers);
router.put('/find', userHandler.getUserByUsername);
router.post('/', userHandler.createUser);
router.put('/', userHandler.updateUser);
router.put('/delete', userHandler.deleteUserByUsername);

module.exports = router;
