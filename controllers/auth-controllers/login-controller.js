module.exports = function makeLoginController({loginUseCase, sendResponseObj}) {
    return async function loginController(req, res) {
      try {
        const { companyId, email, password } = req.body;
        const data = await loginUseCase({ companyId, email, password })
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "login in successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  