const http = require("http");
const { Router } = require("./router.js");
const { RestService } = require("./rest-service.js");
const dotenv = require("dotenv");
const { connectToDb } = require("./data-access");

dotenv.config({
  path: ".env",
});

const router = new Router();
const restService = new RestService(router);

const server = http.createServer();
server.on("request", restService.init());

(async () => {
  await connectToDb();
  server.listen(process.env.PORT, () => {
    console.log("server running at " + process.env.PORT);
  });
})();
