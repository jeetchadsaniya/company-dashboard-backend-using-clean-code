const { userUseCase } = require("../../use-cases");

const makeCreateUserController = require("./create-user-controller")
const makeDeleteUserController = require("./delete-user-controller")
const makeGetAllUserController = require("./get-all-user-controller")
const makeGetUserController = require("./get-user-controller")
const makeUpdateUserController = require("./update-user-controller")

const sendResponseObj = require("../../utils/send-response-function")

const createUserController = makeCreateUserController({createUserUseCase : userUseCase.createUserUseCase,sendResponseObj})
const deleteUserController = makeDeleteUserController({deleteUserUseCase : userUseCase.deleteUserUseCase,sendResponseObj})
const getAllUserController = makeGetAllUserController({getAllUserUseCase : userUseCase.getAllUserUseCase,sendResponseObj})
const getUserController = makeGetUserController({getUserUseCase : userUseCase.getUserUseCase,sendResponseObj})
const updateUserController = makeUpdateUserController({updateUserUseCase : userUseCase.updateUserUseCase,sendResponseObj})

module.exports = Object.freeze({
    createUserController,
    deleteUserController,
    getAllUserController,
    getUserController,
    updateUserController
})