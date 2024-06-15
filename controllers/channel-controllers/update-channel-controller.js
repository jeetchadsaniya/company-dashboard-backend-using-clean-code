module.exports = function makeUpdateChannelController({updateChannelUseCase, sendResponseObj}) {
    return async function updateChannelController(req, res) {
      try {
        const { channelName,channelCode }= req.body;
        const data = await updateChannelUseCase({ channelId : req.params.id,channelName,channelCode,companyId : req.userCompanyId})
        sendResponseObj.sendSuccessResponseFunction({res,data,statusCode : 200,message : "channel updated successfully"});
      } catch (error) {
        sendResponseObj.hanleErrorAndSendResponseFunction({res,error});
      }
    };
  };
  