const authController = require("./auth-controllers")
const channelController = require("./channel-controllers")
const userController = require("./user-controllers")
const productController = require("./product-controller")
const subProductController = require("./sub-product-controller")

module.exports = Object.freeze({
    authController,
    channelController,
    userController,
    productController,
    subProductController
})