module.exports = function makeGetUserController({getUserUseCase, sendResponseObj}) {
    return async function getUserController(req, res) {
      try {
        const data = await getUserUseCase({ userId : req.params.id ,companyId : req.userCompanyId});
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "get user successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  