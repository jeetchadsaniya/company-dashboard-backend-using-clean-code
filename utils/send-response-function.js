const responseFormatObj = require("./send-response-format");

function sendSuccessResponseFunction({ res, data, statusCode, message }) {
  switch (statusCode) {
    case 200:
      responseFormatObj.okSuccessResponse(res, data, message);
      break;
    case 201:
      responseFormatObj.createdSuccessResponse(res, data, message);
      break;
    case 204:
      responseFormatObj.noContentSuccessResponse(res, data, message);
      break;
  }
}

function hanleErrorAndSendResponseFunction({ res, error }) {
  switch (error.errorCode) {
    case 400:
      responseFormatObj.badRequestResponse(res, error.message);
      break;
    case 401:
      responseFormatObj.unAuthorizedResponse(res, error.message);
      break;
    case 403:
      responseFormatObj.forbiddendResponse(res, error.message);
      break;
    case 404:
      responseFormatObj.notFoundResponse(res, error.message);
      break;
    case 503:
      responseFormatObj.serverUnavailableResponse(res, error.message);
      break;
    default:
      responseFormatObj.serverErrorResponse(res, error.message);
      break;
  }
}

module.exports = Object.freeze({
  sendSuccessResponseFunction,
  hanleErrorAndSendResponseFunction
});
