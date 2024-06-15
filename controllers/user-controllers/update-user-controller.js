module.exports = function makeUpdateUserController({updateUserUseCase, sendResponseObj}) {
    return async function updateUserController(req, res) {
      try {
        const { userName,roll }= req.body;
        const data = await updateUserUseCase({ userName,roll, userId : req.params.id, companyId : req.userCompanyId});
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "user updated successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  