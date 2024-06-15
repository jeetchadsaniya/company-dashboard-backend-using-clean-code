const { connection } = require("../../configs/db-config");
const util = require("util");
const CustomError = require("../../utils/custom-error")
const makeCompanyDb = require("./company-data-access");

const companyDb = makeCompanyDb({ connection, util,CustomError });

module.exports = companyDb;
