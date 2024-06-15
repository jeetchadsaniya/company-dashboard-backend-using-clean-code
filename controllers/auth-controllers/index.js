const { authUseCase } = require("../../use-cases");

const makeChangePasswordController = require("./change-password-controller")
const makeGetCompanyListController = require("./get-company-list-controller")
const makeLoginController = require("./login-controller")
const makeRegisterController = require("./register-controller")
const makeSendForgetPasswordMailController = require("./send-forgot-password-mil-use-case")
const makeSetPasswordForNewUserController = require("./set-password-for-new-user-controller")

const sendResponseObj = require("../../utils/send-response-function")

const changePasswordController = makeChangePasswordController({changePasswordUseCase : authUseCase.changePasswordUseCase, sendResponseObj})
const getCompanyListController = makeGetCompanyListController({getCompanyListUseCase : authUseCase.getCompanyListUseCase, sendResponseObj})
const loginController = makeLoginController({loginUseCase : authUseCase.loginUseCase, sendResponseObj})
const registerController = makeRegisterController({registerUseCase : authUseCase.registerUseCase, sendResponseObj})
const sendForgotPasswordMailController = makeSendForgetPasswordMailController({sendForgotPasswordMailUseCase : authUseCase.sendForgotPasswordMailUseCase, sendResponseObj})
const setPasswordForNewUserController = makeSetPasswordForNewUserController({setPasswordForNewUserUseCase : authUseCase.setPasswordForNewUserUseCase, sendResponseObj})

module.exports = Object.freeze({
    changePasswordController,
    getCompanyListController,
    loginController,
    registerController,
    sendForgotPasswordMailController,
    setPasswordForNewUserController
})