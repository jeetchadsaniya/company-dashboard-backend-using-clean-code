module.exports = function makeDeleteUserController({deleteUserUseCase, sendResponseObj}) {
    return async function deleteUserController(req, res) {
      try {
        const data = await deleteUserUseCase({ userId : req.params.id ,companyId : req.userCompanyId});
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "delete user successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  