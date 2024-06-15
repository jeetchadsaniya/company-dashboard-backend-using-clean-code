const { subProductUseCase } = require("../../use-cases");

const makeCreateSubProductController = require("./create-sub-product-controller")
const makeDeleteSubProductController = require("./delete-sub-product-controller")
const makeGetSubProductController = require("./get-sub-product-sontroller")
const makeUpdateSubProductController = require("./update-sub-product-controller")

const sendResponseObj = require("../../utils/send-response-function")

const createSubProductController = makeCreateSubProductController({createSubProductUseCase : subProductUseCase.createSubProductUseCase, sendResponseObj});
const deleteSubProductController = makeDeleteSubProductController({deleteSubProductUseCase : subProductUseCase.deleteSubProductUseCase, sendResponseObj});
const getSubProductController = makeGetSubProductController({getSubProductUseCase : subProductUseCase.getSubProductUseCase, sendResponseObj});
const updateSubProductController = makeUpdateSubProductController({updateSubProductUseCase : subProductUseCase.updateSubProductUseCase, sendResponseObj});

module.exports = Object.freeze({
    createSubProductController,
    deleteSubProductController,
    getSubProductController,
    updateSubProductController
})