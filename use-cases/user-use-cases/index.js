const CustomError = require("../../utils/custom-error");
const {sendSetPasswordMailForNewUser} = require("../../third-party-api-call/send-mail")
const jwt = require("jsonwebtoken");

const makeCreateUserUseCase = require("./create-user-use-case")
const makeDeleteUserUseCase = require("./delete-user-use-case")
const makeGetAllUserUseCase = require("./get-all-user-use-case")
const makeGetUserUseCase = require("./get-user-use-case")
const makeUpdateUserUseCase = require("./update-user-use-case")

const {userDb,permissionDb,rollDb} = require("../../data-access")

const createUserUseCase = makeCreateUserUseCase({ userDb, permissionDb, rollDb, jwt, sendSetPasswordMailForNewUser, CustomError});
const deleteUserUseCase = makeDeleteUserUseCase({ userDb, CustomError });
const getAllUserUseCase = makeGetAllUserUseCase({ userDb, CustomError});
const getUserUseCase = makeGetUserUseCase({ userDb, permissionDb, rollDb, CustomError});
const updateUserUseCase = makeUpdateUserUseCase({ userDb, permissionDb, rollDb, CustomError});

module.exports = Object.freeze({
    createUserUseCase,
    deleteUserUseCase,
    getAllUserUseCase,
    getUserUseCase,
    updateUserUseCase
})
