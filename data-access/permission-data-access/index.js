const { connection } = require("../../configs/db-config");
const util = require("util");
const CustomError = require("../../utils/custom-error")
const makePermissionDb = require("./permission-data-access");

const permissionDb = makePermissionDb({ connection, util,CustomError });

module.exports = permissionDb;
