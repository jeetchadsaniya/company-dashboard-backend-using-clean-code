const { connection } = require("../../configs/db-config");
const util = require("util");
const CustomError = require("../../utils/custom-error")
const makeRollDb = require("./roll-data-access");

const rollDb = makeRollDb({ connection, util,CustomError });

module.exports = rollDb;
