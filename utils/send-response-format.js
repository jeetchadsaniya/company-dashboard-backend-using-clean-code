const okSuccessResponse = (
  res,
  data,
  message,
  contentType = "application/json"
) => {
  if (Buffer.isBuffer(data)) {
    res.statusCode = 200;
    res.end(data);
    return;
  }
  res.writeHead(200, { "Content-Type": contentType });
  res.end(
    JSON.stringify({
      statusCode: 200,
      data: data,
      message: message,
    })
  );
};

const createdSuccessResponse = (
  res,
  data,
  message,
  contentType = "application/json"
) => {
  res.writeHead(201, { "Content-Type": contentType });
  res.end(
    JSON.stringify({
      statusCode: 201,
      data: data,
      message: message,
    })
  );
};

const noContentSuccessResponse = (
  res,
  data,
  message,
  contentType = "application/json"
) => {
  res.writeHead(204, { "Content-Type": contentType });
  res.end(
    JSON.stringify({
      statusCode: 204,
      data: data,
      message: message,
    })
  );
};

const badRequestResponse = (res, message, contentType = "application/json") => {
  res.writeHead(400, { "Content-Type": contentType });
  res.end(
    JSON.stringify({
      statusCode: 400,
      message: message,
    })
  );
};

const unAuthorizedResponse = (
  res,
  message,
  contentType = "application/json"
) => {
  res.writeHead(401, { "Content-Type": contentType });
  res.end(
    JSON.stringify({
      statusCode: 401,
      message: message,
    })
  );
};

const forbiddendResponse = (res, message, contentType = "application/json") => {
  res.writeHead(403, { "Content-Type": contentType });
  res.end(
    JSON.stringify({
      statusCode: 403,
      message: message,
    })
  );
};

const notFoundResponse = (res, message, contentType = "application/json") => {
  res.writeHead(404, { "Content-Type": contentType });
  res.end(
    JSON.stringify({
      statusCode: 404,
      message: message,
    })
  );
};

const serverErrorResponse = (
  res,
  message,
  contentType = "application/json"
) => {
  res.writeHead(500, { "Content-Type": contentType });
  res.end(
    JSON.stringify({
      statusCode: 500,
      message: message,
    })
  );
};

const serverUnavailableResponse = (
  res,
  message,
  contentType = "application/json"
) => {
  res.writeHead(503, { "Content-Type": contentType });
  res.end(
    JSON.stringify({
      statusCode: 503,
      message: message,
    })
  );
};

module.exports = Object.freeze({
  okSuccessResponse,
  createdSuccessResponse,
  noContentSuccessResponse,
  badRequestResponse,
  unAuthorizedResponse,
  forbiddendResponse,
  notFoundResponse,
  serverErrorResponse,
  serverUnavailableResponse
});
