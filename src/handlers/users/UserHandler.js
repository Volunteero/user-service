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

    const results = await UserMap.find({ username: username });
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

    const user = await UserMap.findOne({ username: body.username });
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
      { username: body.username },
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
      { username: body.username },
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

  async confirmEventParticipation(req, res) {

    const body = req.body;
    const mapper = new UserMapper();
    const UserMap = mapper.getObjectMap();

    // Get the points to add from the body
    let pointsToAdd = body.points;
    if (!pointsToAdd) {
      return UserHandler.respondWithError(
        res,
        UserHandler.getStatusCodes().BAD_REQUEST,
        new Error('pointsToAdd is not specified'),
      );
    }

    // Get the user using the username in the route params
    const username = req.params.username;
    const user = await UserMap.findOne({ username });
    if (null === user) {
      return UserHandler.respondWithError(
        res,
        UserHandler.getStatusCodes().BAD_REQUEST,
        new Error('UserNotFound'),
      );
    }

    // Validate that the user has at least 0 points
    if(null === user.points || 'undefined' === typeof user.points){

      user.points = 0;
    }

    // Check if points to add is a positive number
    if(pointsToAdd < 0){

      pointsToAdd = 0;
    }

    // Add the pointsToAdd to the current points
    const newPoints = user.points + pointsToAdd;

    // Update the user
    const result = await UserMap.updateOne({
      username,
      points: newPoints
    });

    // If everything went ok return a 200 
    if(result.ok > 0){

      res.status(200).json({
        newPoints
      });
    }else{

      // and 500 if we have errors
      res.status(500).json({
        success: false,
        code: 'InternalServerError',
        result
      });
    }
   
  }
};
