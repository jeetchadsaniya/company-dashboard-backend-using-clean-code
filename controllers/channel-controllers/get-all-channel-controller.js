module.exports = function makeGetAllChannelController({getAllChannelUseCase, sendResponseObj}) {
    return async function getAllChannelController(req, res) {
      try {
        const data = await getAllChannelUseCase({ companyId : req.userCompanyId, queryStringObj : req.query})
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "get all channel successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  