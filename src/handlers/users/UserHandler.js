'use strict';
const HandlerBase = require('../HandlerBase');
const UserMapper = require('../../maps/UserMapper');

module.exports = class UserHandler extends HandlerBase {
  constructor() {
    super();
  }

  async getUsers(req, res) {
    const mapper = new UserMapper();
    const UserMap = mapper.getObjectMap();

    const results = await UserMap.find({});
    console.log(results);
    const users = results.map((document) => {
      return mapper.resolveSeed(document);
    });
    res.status(UserHandler.getStatusCodes().OK).json(users);
  }

  async getUserByUsername(req, res) {
    const body = req.body;
    const mapper = new UserMapper();
    const UserMap = mapper.getObjectMap();

    const username = body.username;
    if (!username) {
      return UserHandler.respondWithError(
        res,
        UserHandler.getStatusCodes().BAD_REQUEST,
        new Error('username is not specified'),
      );
    }

    const results = await UserMap.find({username: username});
    console.log(results);
    const users = results.map((document) => {
      return mapper.resolveSeed(document);
    });
    res.status(UserHandler.getStatusCodes().OK).json(users.pop());
  }

  async createUser(req, res) {
    const body = req.body;
    const mapper = new UserMapper();
    const UserMap = mapper.getObjectMap();

    const user = await UserMap.findOne({username: body.username});
    if (user !== null) {
      // user already exists
      UserHandler.respondWithError(
        res,
        UserHandler.getStatusCodes().FORBIDDEN,
        new Error('user already exists')
      );
      return;
    }

    const newUserSeed = mapper.resolveSeed(body);
    let newUser = new UserMap(newUserSeed);

    // save
    try {
      const result = await newUser.save();
      console.info('Save result');
      console.info(result);
      const seed = mapper.resolveSeed(newUser);
      res.status(UserHandler.getStatusCodes().CREATED).json({
        'success': true,
        'user': seed,
      });
    } catch (err) {
      console.error(err);
      UserHandler.respondWithError(
        res,
        UserHandler.getStatusCodes().FORBIDDEN,
        err);
    }
  }

  async updateUser(req, res) {
    const body = req.body;
    const mapper = new UserMapper();
    const newUserSeed = mapper.resolveSeed(body);
    const UserMap = mapper.getObjectMap();

    if (!body.username) {
      return UserHandler.respondWithError(
        res,
        UserHandler.getStatusCodes().BAD_REQUEST,
        new Error('username is not specified'),
      );
    }

    console.log(newUserSeed);

    const result = await UserMap.findOneAndUpdate(
      {username: body.username},
      newUserSeed
    );
    if (result) {
      return res.status(UserHandler.getStatusCodes().OK).json({
        'success': true,
        'user': newUserSeed,
      });
    } else {
      return UserHandler.respondWithError(
        res,
        UserHandler.getStatusCodes().BAD_REQUEST,
        new Error('updated user not found'),
      );
    }
  }

  async deleteUserByUsername(req, res) {
    const body = req.body;
    const mapper = new UserMapper();
    const UserMap = mapper.getObjectMap();

    const username = body.username;
    if (!username) {
      return UserHandler.respondWithError(
        res,
        UserHandler.getStatusCodes().BAD_REQUEST,
        new Error('username is not specified'),
      );
    }

    const result = await UserMap.findOneAndRemove(
      {username: body.username},
    );
    if (result) {
      return res.status(UserHandler.getStatusCodes().OK).json({
        'success': true,
      });
    } else {
      return UserHandler.respondWithError(
        res,
        UserHandler.getStatusCodes().BAD_REQUEST,
        new Error('deleted user not found'),
      );
    }
  }
};
