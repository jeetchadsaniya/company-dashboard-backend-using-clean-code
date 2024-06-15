module.exports = function makeRegisterController({registerUseCase, sendResponseObj}) {
      return async function registerController(req, res) {
        try {
          const { companyName, email, userName, password } = req.body;
          const data = await registerUseCase({ companyName, email, userName, password })
          sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 201,message : "user and company successfully created"});
        } catch (error) {
          sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
        }
      };
    };
    