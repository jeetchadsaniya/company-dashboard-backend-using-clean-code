module.exports = function makeUpdateSubProductController({updateSubProductUseCase, sendResponseObj}) {
    return async function updateSubProductController(req, res) {
      try {
        const { productName, description } = req.body;
        const data = await updateSubProductUseCase({ productName, description, subProductId : req.params.id ,companyId : req.userCompanyId})
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "sub product updated successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  