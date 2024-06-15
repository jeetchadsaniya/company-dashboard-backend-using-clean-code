module.exports = function makeDeleteProductController({deleteProductUseCase, sendResponseObj}) {
    return async function deleteProductController(req, res) {
      try {
        const data = await deleteProductUseCase({ companyId : req.userCompanyId, productId : req.params.id})
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "delete product successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  