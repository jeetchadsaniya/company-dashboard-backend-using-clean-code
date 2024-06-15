const CustomError = require("../../utils/custom-error");
const {uploadImageAndSendImageUrl} = require("../../third-party-api-call/upload-file");

const makeCreateProductUseCase = require("./create-product-use-case")
const makeDeleteProductUseCase = require("./delete-product-use-case")
const makeGetAllProductUseCase = require("./get-all-product-use-case")
const makeGetProductUseCase = require("./get-product-use-case")
const makeUpdateProductUseCase = require("./update-product-use-case")

const {channelDb,productDb,subProductDb} = require("../../data-access")

const createProductUseCase = makeCreateProductUseCase({  productDb, subProductDb, channelDb, uploadImageAndSendImageUrl, CustomError});
const deleteProductUseCase = makeDeleteProductUseCase({  productDb, CustomError});
const getAllProductUseCase = makeGetAllProductUseCase({  productDb, subProductDb, channelDb, CustomError});
const getProductUseCase = makeGetProductUseCase({  productDb, subProductDb, channelDb, CustomError});
const updateProductUseCase = makeUpdateProductUseCase({  productDb, uploadImageAndSendImageUrl, CustomError});



module.exports = Object.freeze({
    createProductUseCase,
    deleteProductUseCase,
    getAllProductUseCase,
    getProductUseCase,
    updateProductUseCase
})