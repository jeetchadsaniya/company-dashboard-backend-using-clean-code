const { productUseCase } = require("../../use-cases");

const makeCreateProductController = require("./create-product-controller")
const makeDeleteProductController = require("./delete-product-controller")
const makeGetAllProductController = require("./get-all-product-controller")
const makeGetProductController = require("./get-product-controller")
const makeUpdateProductController = require("./update-product-controller")

const sendResponseObj = require("../../utils/send-response-function")


const createProductController = makeCreateProductController({createProductUseCase : productUseCase.createProductUseCase, sendResponseObj})
const deleteProductController = makeDeleteProductController({deleteProductUseCase : productUseCase.deleteProductUseCase, sendResponseObj})
const getAllProductController = makeGetAllProductController({getAllProductUseCase : productUseCase.getAllProductUseCase, sendResponseObj})
const getProductController = makeGetProductController({getProductUseCase : productUseCase.getProductUseCase, sendResponseObj})
const updateProductController = makeUpdateProductController({updateProductUseCase : productUseCase.updateProductUseCase, sendResponseObj})

module.exports = Object.freeze({
    createProductController,
    deleteProductController,
    getAllProductController,
    getProductController,
    updateProductController
})