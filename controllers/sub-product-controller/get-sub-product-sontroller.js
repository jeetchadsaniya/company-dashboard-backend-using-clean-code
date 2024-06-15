module.exports = function makeGetSubProductController({getSubProductUseCase, sendResponseObj}) {
    return async function getSubProductController(req, res) {
      try {
        const data = await getSubProductUseCase({ subProductId : req.params.id ,companyId : req.userCompanyId})
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "sub product get successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  