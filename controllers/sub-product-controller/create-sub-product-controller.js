module.exports = function makeCreateSubProductController({createSubProductUseCase, sendResponseObj}) {
    return async function createSubProductController(req, res) {
      try {
        const { productName, description, channelId, productId } = req.body;
        const data = await createSubProductUseCase({ productName, description, channelId, productId,companyId : req.userCompanyId})
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 201,message : "sub product created successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  