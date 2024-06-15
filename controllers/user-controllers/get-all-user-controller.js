module.exports = function makeGetAllUserController({getAllUserUseCase, sendResponseObj}) {
    return async function getAllUserController(req, res) {
      try {
        const data = await getAllUserUseCase({ queryStringObj : req.query ,companyId : req.userCompanyId});
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "get all user successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  