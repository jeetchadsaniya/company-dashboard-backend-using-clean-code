module.exports = function makeGetChannelController({getChannelUseCase, sendResponseObj}) {
    return async function getChannelController(req, res) {
      try {
        const data = await getChannelUseCase({ channelId : req.params.id,companyId : req.userCompanyId})
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "get channel successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  