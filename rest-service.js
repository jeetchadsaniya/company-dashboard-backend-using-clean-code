const url = require("url");
const querystring = require("querystring");
const formidable = require("formidable");
const { setHeader } = require("./utils/set-header");
const {authController,channelController,userController,productController,subProductController} = require("./controllers");
const {isAuthenticatedUser,checkPermission} = require("./middlewares/auth-middleware")

class RestService {
  constructor(router) {
    this.router = router;
  }

  init() {
    this.authRoutes();
    this.channelRoutes();
    this.userRoutes();
    this.productRoutes();
    this.subProductRoutes();
    return async (req, res) => {
      setHeader(res);

      switch (req.method) {
        case "GET":
          this.handleRequest(req, res, this.router._getRoutes);
          break;
        case "POST":
          this.handleRequest(req, res, this.router._postRoutes);
          break;
        case "PUT":
          this.handleRequest(req, res, this.router._putRoutes);
          break;
        case "DELETE":
          this.handleRequest(req, res, this.router._deleteRoutes);
          break;
        case "OPTIONS":
          const headers = {
            "Access-Control-Allow-Origin": "http://127.0.0.1:5500",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "Content-Type, *",
            "Access-Control-Allow-Credentials": true,
          };
          res.writeHead(204, headers);
          res.end();
          return;
        default:
          break;
      }
    };
  }

  authRoutes(){
    this.router.getRoutes("/", (req, res) => {
      res.statusCode = 200;
      res.end("HomePage");
    });
    this.router.postRoutes("/api/v1/auth/company/register",authController.registerController);
    this.router.getRoutes("/api/v1/auth/company/get-company-list",authController.getCompanyListController);
    this.router.postRoutes("/api/v1/auth/user/login",authController.loginController);
    this.router.putRoutes("/api/v1/auth/user/change-password",authController.changePasswordController);
    this.router.putRoutes("/api/v1/auth/user/forgot-password",authController.sendForgotPasswordMailController);
    this.router.putRoutes("/api/v1/auth/user/set-password",authController.setPasswordForNewUserController);
  }

  channelRoutes(){
    this.router.getRoutes("/api/v1/channel/get/:id",channelController.getChannelController,[isAuthenticatedUser,checkPermission]);
    this.router.postRoutes("/api/v1/channel/create",channelController.createChannelController,[isAuthenticatedUser,checkPermission]);
    this.router.putRoutes("/api/v1/channel/update/:id",channelController.updateChannelController,[isAuthenticatedUser,checkPermission]);
    this.router.deleteRoutes("/api/v1/channel/delete/:id",channelController.deleteChannelController,[isAuthenticatedUser,checkPermission]);
    this.router.getRoutes("/api/v1/channel/get-all",channelController.getAllChannelController,[isAuthenticatedUser,checkPermission]);
  }

  userRoutes() {
    this.router.postRoutes("/api/v1/user/create",userController.createUserController,[isAuthenticatedUser,checkPermission])
    this.router.getRoutes("/api/v1/user/get/:id",userController.getUserController,[isAuthenticatedUser,checkPermission])
    this.router.putRoutes("/api/v1/user/update/:id",userController.updateUserController,[isAuthenticatedUser,checkPermission])
    this.router.deleteRoutes("/api/v1/user/delete/:id",userController.deleteUserController,[isAuthenticatedUser,checkPermission])
    this.router.getRoutes("/api/v1/user/get-all",userController.getAllUserController,[isAuthenticatedUser,checkPermission])
  }

  productRoutes(){
    this.router.postRoutes("/api/v1/product/create",productController.createProductController,[isAuthenticatedUser,checkPermission])
    this.router.getRoutes("/api/v1/product/get/:id",productController.getProductController,[isAuthenticatedUser,checkPermission])
    this.router.putRoutes("/api/v1/product/update/:id",productController.updateProductController,[isAuthenticatedUser,checkPermission])
    this.router.deleteRoutes("/api/v1/product/delete/:id",productController.deleteProductController,[isAuthenticatedUser,checkPermission])
    this.router.getRoutes("/api/v1/product/getAll",productController.getAllProductController,[isAuthenticatedUser,checkPermission])
  }

  subProductRoutes(){
    this.router.putRoutes("/api/v1/sub-product/update/:id",subProductController.updateSubProductController,[isAuthenticatedUser,checkPermission])
    this.router.getRoutes("/api/v1/sub-product/get/:id",subProductController.getSubProductController,[isAuthenticatedUser,checkPermission])
    this.router.postRoutes("/api/v1/sub-product/create",subProductController.createSubProductController,[isAuthenticatedUser,checkPermission])
    this.router.deleteRoutes("/api/v1/sub-product/delete/:id",subProductController.deleteSubProductController,[isAuthenticatedUser,checkPermission])
  }

  async handleRequest(req, res, routes) {
    const parseUrl = url.parse(req.url, true);
    req.query = parseUrl.query;
    await this.parseRequestBody(req);

    //handle params
    const isNormalUrl = routes[parseUrl.pathname];
    if (isNormalUrl) {
      const parseUrl = url.parse(req.url, true);
      req.url = parseUrl.pathname;
      await this.excuteFun(req, res, routes);
    }
    //for param request
    else {
      if (this.matchParam(req, routes)) {
        await this.excuteFun(req, res, routes);
      } else {
        res.statusCode = 404;
        res.end("Rotutes Not Found");
      }
    }
  }

  matchParam(req, routes) {
    const parseUrl = url.parse(req.url, true);
    let paramUrlInclude = false;
    let UrlMatch = false;
    const request = parseUrl.pathname;
    const pattern = "[\\w-]+";
    for (const url in routes) {
      if (url.includes(":")) {
        paramUrlInclude = true;
        const routeRegex = new RegExp(
          url.replace(/:([^/]+)/g, (match, paramName) => {
            return `(?<${paramName}>${pattern})`;
          })
        );
        const match = routeRegex.exec(request);
        if (match) {
          UrlMatch = match;

          const matchedParams = {};

          for (const [paramName, paramValue] of Object.entries(match.groups)) {
            matchedParams[paramName] = paramValue;
          }
          req.params = matchedParams;
          req.url = url;
          return matchedParams;
        }
      }
    }
    if (!paramUrlInclude || !UrlMatch) {
      return false;
    }
  }

  async excuteFun(req, res, routes) {
    for (let i = 0; i < routes[req.url].length; i++) {
      try {
        await routes[req.url][i](req,res);
      } catch (error) {
        console.log("-------", error.message);
        break;
      }
    }
  }

  async parseRequestBody(req) {
    const contentType =
      req.headers["Content-Type"] || req.headers["content-type"];
    let body;
    if (contentType) {
      if (contentType.includes("application/json")) {
        body = await this.parseJsonBody(req);
      } else if (contentType.includes("application/x-www-form-urlencoded")) {
        body = await this.parseUrlEncodedBody(req);
      } else if (contentType.includes("multipart/form-data")) {
        body = await this.parseFormDataBody(req);
      } else if (contentType.includes("text/plain")) {
        body = await this.parsePlainTextBody(req);
      } else {
        body = null;
      }
    }
    req.body = body;
  }

  async parseJsonBody(req) {
    return new Promise((resolve, reject) => {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  async parseUrlEncodedBody(req) {
    return new Promise((resolve, reject) => {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(querystring.parse(body));
      });
    });
  }

  async parseFormDataBody(req) {
    return new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();

      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve({ fields, files });
        }
      });
    });
  }

  async parsePlainTextBody(req) {
    return new Promise((resolve, reject) => {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        resolve(body);
      });
    });
  }
}

module.exports = Object.freeze({
  RestService,
});
