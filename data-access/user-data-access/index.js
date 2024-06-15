const { connection } = require("../../configs/db-config");
const util = require("util");
const CustomError = require("../../utils/custom-error")
const makeUserDb = require("./user-data-access");

const userDb = makeUserDb({ connection, util,CustomError });

module.exports = userDb;
