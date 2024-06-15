module.exports = function makeGetProductController({getProductUseCase, sendResponseObj}) {
    return async function getProductController(req, res) {
      try {
        const data = await getProductUseCase({ companyId : req.userCompanyId, productId : req.params.id})
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "get product successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  