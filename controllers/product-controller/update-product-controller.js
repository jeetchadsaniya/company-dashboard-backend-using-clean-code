module.exports = function makeUpdateProductController({updateProductUseCase, sendResponseObj}) {
    return async function updateProductController(req, res) {
      try {
        const data = await updateProductUseCase({ fields : req.body.fields, files : req.body.files,companyId : req.userCompanyId, productId : req.params.id})
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "product update successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  