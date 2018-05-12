module.exports = class HandlerBase {
  constructor() { }

  static getStatusCodes() {
    return {
      'OK': 200,
      'CREATED': 201,
      'BAD_REQUEST': 400,
      'FORBIDDEN': 403,
      'INTERNAL_SERVER_ERROR': 500,
    };
  }

  static respondWithError(res, statusCode, error) {
    console.error(error);
    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
