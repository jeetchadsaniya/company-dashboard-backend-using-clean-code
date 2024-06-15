module.exports = function makeCreateProductController({createProductUseCase, sendResponseObj}) {
    return async function createProductController(req, res) {
      try {
        const data = await createProductUseCase({ fields : req.body.fields, files : req.body.files,companyId : req.userCompanyId})
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 201,message : "product created successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  