module.exports = function makeChangePasswordController({changePasswordUseCase, sendResponseObj}) {
    return async function changePasswordController(req, res) {
      try {
        const { accessToken,newPassword }= req.body;
        const data = await changePasswordUseCase({ accessToken,newPassword })
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "change password successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  