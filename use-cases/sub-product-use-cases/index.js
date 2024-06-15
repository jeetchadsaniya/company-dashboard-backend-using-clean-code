const CustomError = require("../../utils/custom-error");

const makeCreateSubProductUseCase = require("./create-sub-product-use-case")
const makeDeleteSubProductUseCase = require("./delete-sub-product-use-case")
const makeGetSubProductUseCase = require("./get-sub-product-use-case")
const makeUpdateSubProductUseCase = require("./update-sub-product-use-case")

const {channelDb,productDb,subProductDb} = require("../../data-access")

const createSubProductUseCase = makeCreateSubProductUseCase({ subProductDb, channelDb,productDb,CustomError});
const deleteSubProductUseCase = makeDeleteSubProductUseCase({ subProductDb,channelDb,CustomError});
const getSubProductUseCase = makeGetSubProductUseCase({ subProductDb,CustomError});
const updateSubProductUseCase = makeUpdateSubProductUseCase({ subProductDb,CustomError});



module.exports = Object.freeze({
    createSubProductUseCase,
    deleteSubProductUseCase,
    getSubProductUseCase,
    updateSubProductUseCase
})