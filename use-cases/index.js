const authUseCase = require("./auth-use-cases");
const channelUseCase = require("./channel-use-cases");
const userUseCase = require("./user-use-cases");
const productUseCase = require("./product-use-case.js");
const subProductUseCase = require("./sub-product-use-cases");

module.exports = Object.freeze({
    authUseCase,
    channelUseCase,
    userUseCase,
    productUseCase,
    subProductUseCase
})