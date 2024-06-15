module.exports = function makeGetCompanyListController({getCompanyListUseCase, sendResponseObj}) {
    return async function getCompanyListController(req, res) {
      try {
        const { email } = req.body;
        const data = await getCompanyListUseCase({ email })
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200, message : "Get All Companies successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  