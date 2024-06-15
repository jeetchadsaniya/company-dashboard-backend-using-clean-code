module.exports = function makeDeleteSubProductController({deleteSubProductUseCase, sendResponseObj}) {
    return async function deleteSubProductController(req, res) {
      try {
        const data = await deleteSubProductUseCase({ subProductId : req.params.id ,companyId : req.userCompanyId})
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "sub product delete successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  