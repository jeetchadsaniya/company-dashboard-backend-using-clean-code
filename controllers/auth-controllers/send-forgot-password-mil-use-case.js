module.exports = function makeSendForgetPasswordMailController({sendForgotPasswordMailUseCase, sendResponseObj}) {
    return async function sendForgotPasswordMailController(req, res) {
      try {
        const { companyId, email }= req.body;
        const data = await sendForgotPasswordMailUseCase({ companyId, email })
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "send forgot password mail successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  