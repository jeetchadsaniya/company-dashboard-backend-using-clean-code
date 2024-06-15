module.exports = function makeGetAllProductController({getAllProductUseCase, sendResponseObj}) {
    return async function getAllProductController(req, res) {
      try {
        const data = await getAllProductUseCase({ companyId : req.userCompanyId, queryStringObj : req.query})
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "get all product successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  