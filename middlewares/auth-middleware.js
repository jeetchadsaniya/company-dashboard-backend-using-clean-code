const {
  hanleErrorAndSendResponseFunction,
} = require("../utils/send-response-function");
const { permissionDb, rollDb } = require("../data-access");
const CustomError = require("../utils/custom-error");
const jwt = require("jsonwebtoken");

const isAuthenticatedUser = async (req, res) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.userId = decode.userId;
    req.userCompanyId = decode.companyId;
    req.userRollId = decode.rollId;
  } catch (error) {
    const customError = new CustomError(401, error.message);
    hanleErrorAndSendResponseFunction({ res, error: customError });
    throw customError;
  }
};

const checkPermission = async (req, res) => {
  try {
    const roll = await rollDb.getRollByRollId({
      rollId: req.userRollId,
    });
    const channelPermission = await permissionDb.getPermissionByPermissionId({
      permissionId: roll["channelPermissionId"],
    });
    const productPermission = await permissionDb.getPermissionByPermissionId({
      permissionId: roll["productPermissionId"],
    });
    const userPermission = await permissionDb.getPermissionByPermissionId({
      permissionId: roll["userPermissionId"],
    });

    if (req.url.includes("create") || req.url.includes("update")) {
      if (req.url.includes("channel")) {
        if (!channelPermission["write"]) {
          throw new CustomError(403, "user dont have channel write permission");
        }
      } else if (req.url.includes("product")) {
        if (!productPermission["write"]) {
          throw new CustomError(403, "user dont have product write permission");
        }
      } else if (req.url.includes("user")) {
        if (!userPermission["write"]) {
          throw new CustomError(403, "user dont have user write permission");
        }
      }
    } else if (req.url.includes("delete")) {
      if (req.url.includes("channel")) {
        if (!channelPermission["delete"]) {
          throw new CustomError(
            403,
            "user dont have channel delete permission"
          );
        }
      } else if (req.url.includes("product")) {
        if (!productPermission["delete"]) {
          throw new CustomError(
            403,
            "user dont have product delete permission"
          );
        }
      } else if (req.url.includes("user")) {
        if (!userPermission["delete"]) {
          throw new CustomError(403, "user dont have user delete permission");
        }
      }
    }
  } catch (error) {
    const customError = new CustomError(error.errorCode, error.message);
    hanleErrorAndSendResponseFunction({ res, error: customError });
    throw customError;
  }
};

module.exports = {
  isAuthenticatedUser,
  checkPermission,
};
