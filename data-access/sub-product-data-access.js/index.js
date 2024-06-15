const { connection } = require("../../configs/db-config");
const util = require("util");
const CustomError = require("../../utils/custom-error");
const makeSubProductDb = require("./sub-product-data-access");

const subProductDb = makeSubProductDb({ connection, util, CustomError });

module.exports = subProductDb;
