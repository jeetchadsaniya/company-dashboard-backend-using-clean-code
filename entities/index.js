const joi = require("joi");
const CustomError = require("../utils/custom-error")
const buildMakeChannel = require("./channel-entity");
const buildMakeCompany = require("./company-entity");
const buildMakeProduct = require("./product-entity");
const buildMakeSubProduct = require("./sub-product-entity");
const buildMakeUser = require("./user-entity");
const buildMakeRollObj = require("./roll-obj-entity");


const makeChannel = buildMakeChannel({ joi, CustomError });
const makeCompany = buildMakeCompany({ joi, CustomError });
const makeProduct = buildMakeProduct({ joi, CustomError });
const makeSubProduct = buildMakeSubProduct({ joi, CustomError });
const makeUser = buildMakeUser({ joi, CustomError });
const makeRollObj = buildMakeRollObj({ joi, CustomError });

module.exports = Object.freeze({ 
    makeChannel,
    makeCompany,
    makeProduct,
    makeSubProduct,
    makeUser,
    makeRollObj
 });
