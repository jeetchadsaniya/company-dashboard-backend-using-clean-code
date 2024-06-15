const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const CustomError = require("../../utils/custom-error");
const {sendForgotPasswordMail} = require("../../third-party-api-call/send-mail")

const makeRegisterUseCase = require("./register-use-case");
const makeGetCompanyListUseCase = require("./get-company-list-use-case");
const makeLoginUseCase = require("./login-use-case");
const makeSendForgotPasswordMailUseCase = require("./send-forgot-password-mail-use-case");
const makeChangePasswordUseCase = require("./change-password-use-case");
const makeSetPasswordForNewUserUseCase = require("./set-password-for--new-user-use-case");
const dataAccess = require("../../data-access");

const registerUseCase = makeRegisterUseCase({userDb : dataAccess.userDb, companyDb : dataAccess.companyDb, channelDb : dataAccess.channelDb,permissionDb : dataAccess.permissionDb,rollDb : dataAccess.rollDb,bcrypt,CustomError });
const getCompanyListUseCase = makeGetCompanyListUseCase({userDb : dataAccess.userDb, companyDb : dataAccess.companyDb, CustomError });
const loginUseCase = makeLoginUseCase({ companyDb : dataAccess.companyDb, userDb : dataAccess.userDb, bcrypt ,jwt ,CustomError });
const sendForgotPasswordMailUseCase = makeSendForgotPasswordMailUseCase({ companyDb : dataAccess.companyDb,userDb : dataAccess.userDb, sendForgotPasswordMail,jwt,CustomError});
const changePasswordUseCase = makeChangePasswordUseCase({ userDb : dataAccess.userDb, jwt,bcrypt,CustomError});
const setPasswordForNewUserUseCase = makeSetPasswordForNewUserUseCase({ userDb : dataAccess.userDb, bcrypt,jwt,CustomError});
 
module.exports = Object.freeze({
    registerUseCase,
    getCompanyListUseCase,
    loginUseCase,
    sendForgotPasswordMailUseCase,
    changePasswordUseCase,
    setPasswordForNewUserUseCase
})