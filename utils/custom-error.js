module.exports = class CustomError extends Error {
    constructor(errorCode,message) {
      super(message);
      this.errorCode = errorCode;
    }
  }