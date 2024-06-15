module.exports = function makeSetPasswordForNewUserController({setPasswordForNewUserUseCase, sendResponseObj}) {
    return async function setPasswordForNewUserController(req, res) {
      try {
        const { accessToken,password }= req.body;
        const data = await setPasswordForNewUserUseCase({ accessToken,password })
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "set password for new user successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  