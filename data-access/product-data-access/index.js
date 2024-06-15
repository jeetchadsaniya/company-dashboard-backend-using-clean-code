const { connection } = require("../../configs/db-config");
const util = require("util");
const CustomError = require("../../utils/custom-error")
const makeProductDb = require("./product-data-access");

const productDb = makeProductDb({ connection, util,CustomError });

module.exports = productDb;
