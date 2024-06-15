module.exports = function makeCreateUserController({createUserUseCase, sendResponseObj}) {
    return async function createUserController(req, res) {
      try {
        const { userName,email,roll }= req.body;
        const data = await createUserUseCase({ userName,email,roll, userId : req.userId, companyId : req.userCompanyId});
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 201,message : "user created successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  